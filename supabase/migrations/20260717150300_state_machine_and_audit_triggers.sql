-- Fonctions utilitaires de rôle, réutilisées par les triggers ci-dessous
-- et par les policies RLS de la migration suivante.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_group_organizer(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.groups where id = p_group_id and organizer_id = auth.uid()
  );
$$;

create or replace function public.is_group_member(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships where group_id = p_group_id and user_id = auth.uid()
  );
$$;

-- ============================================================
-- GROUPS — Règle 2 : forming -> active -> collecting -> pot_ready
-- -> pot_sent -> next_month | completed. Aucune transition sautée.
-- ============================================================

create or replace function public.enforce_group_state_transition()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_unpaid_count integer;
  v_total_contributions integer;
begin
  if new.state = old.state then
    return new;
  end if;

  if not (
    (old.state = 'forming'    and new.state = 'active') or
    (old.state = 'active'     and new.state = 'collecting') or
    (old.state = 'collecting' and new.state = 'pot_ready') or
    (old.state = 'pot_ready'  and new.state = 'pot_sent') or
    (old.state = 'pot_sent'   and new.state in ('next_month', 'completed')) or
    (old.state = 'next_month' and new.state = 'collecting')
  ) then
    raise exception 'Transition de groupe interdite : % -> % (Règle 2, aucune transition sautée)', old.state, new.state;
  end if;

  -- Règle 2 : le pot ne peut être marqué prêt que si toutes les
  -- cotisations du cycle en cours sont confirmées payées.
  if new.state = 'pot_ready' then
    select count(*) filter (where state = 'paid'), count(*)
      into v_unpaid_count, v_total_contributions
      from public.contributions
      where group_id = new.id and cycle_number = new.current_cycle;

    if v_total_contributions < new.total_members then
      raise exception 'Groupe % : impossible de passer en pot_ready, seulement %/% cotisations créées pour le cycle %', new.id, v_total_contributions, new.total_members, new.current_cycle;
    end if;

    if v_unpaid_count < new.total_members then
      raise exception 'Groupe % : impossible de passer en pot_ready, %/% cotisations payées pour le cycle % (Règle 2)', new.id, v_unpaid_count, new.total_members, new.current_cycle;
    end if;
  end if;

  return new;
end;
$$;

create trigger enforce_group_state_transition
  before update of state on public.groups
  for each row execute function public.enforce_group_state_transition();

-- next_month est transitoire : la machine avance seule vers collecting
-- en incrémentant current_cycle, sans intervention manuelle.
create or replace function public.advance_group_next_cycle()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  update public.groups
    set state = 'collecting', current_cycle = current_cycle + 1
    where id = new.id;
  return null;
end;
$$;

create trigger advance_group_next_cycle
  after update of state on public.groups
  for each row
  when (new.state = 'next_month')
  execute function public.advance_group_next_cycle();

-- Règle 4 : l'organisatrice a un accès lecture + invitation + relance
-- uniquement, jamais aux écritures financières du groupe.
create or replace function public.protect_group_financial_columns()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if not public.is_admin() then
    if new.state is distinct from old.state
       or new.amount is distinct from old.amount
       or new.monthly_amount is distinct from old.monthly_amount
       or new.organizer_id is distinct from old.organizer_id
       or new.current_cycle is distinct from old.current_cycle then
      raise exception 'Modification interdite : accès lecture + invitation + relance uniquement pour l''organisatrice, jamais aux écritures financières (Règle 4)';
    end if;
  end if;
  return new;
end;
$$;

create trigger protect_group_financial_columns
  before update on public.groups
  for each row execute function public.protect_group_financial_columns();

-- ============================================================
-- MEMBERSHIPS — Règle 2 : position immuable après forming -> active.
-- ============================================================

create or replace function public.enforce_membership_immutability()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_group_state public.group_state;
begin
  select state into v_group_state from public.groups where id = old.group_id;

  if v_group_state <> 'forming' and (
    new."position" is distinct from old."position"
    or new.user_id is distinct from old.user_id
    or new.group_id is distinct from old.group_id
  ) then
    raise exception 'Modification interdite : position/membre du groupe % immuable après forming -> active (Règle 2), aucune exception de rôle', old.group_id;
  end if;

  return new;
end;
$$;

create trigger enforce_membership_immutability
  before update on public.memberships
  for each row execute function public.enforce_membership_immutability();

-- ============================================================
-- CONTRIBUTIONS — Règle 2 (due -> pending -> paid | late | defaulted)
-- + Règle 6 (collection_fee toujours recalculé, jamais côté client).
-- ============================================================

create or replace function public.enforce_contribution_state_and_fee()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_tier public.merchant_tier;
begin
  if tg_op = 'UPDATE' and old.state is distinct from new.state then
    if old.state in ('paid', 'defaulted') then
      raise exception 'Cotisation % : état terminal % ne peut plus changer (Règle 2)', old.id, old.state;
    elsif not (
      (old.state = 'due'     and new.state in ('pending', 'late')) or
      (old.state = 'pending' and new.state in ('paid', 'late')) or
      (old.state = 'late'    and new.state in ('paid', 'defaulted'))
    ) then
      raise exception 'Transition de cotisation interdite : % -> % (Règle 2)', old.state, new.state;
    end if;
  end if;

  select u.merchant_tier into v_tier
    from public.groups g
    join public.users u on u.id = g.organizer_id
    where g.id = new.group_id;

  new.collection_fee := public.calculate_collection_fee(new.amount, coalesce(v_tier, 'bronze'));

  if new.state = 'paid' and (tg_op = 'INSERT' or old.state <> 'paid') then
    new.paid_at := now();
  end if;

  return new;
end;
$$;

create trigger enforce_contribution_state_and_fee
  before insert or update on public.contributions
  for each row execute function public.enforce_contribution_state_and_fee();

create or replace function public.log_contribution_state_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and old.state is distinct from new.state then
    insert into public.audit_log (actor_id, action, entity_table, entity_id, state_before, state_after, reference)
    values (
      auth.uid(),
      'contribution_state_change',
      'contributions',
      new.id,
      jsonb_build_object('state', old.state, 'collection_fee', old.collection_fee),
      jsonb_build_object('state', new.state, 'collection_fee', new.collection_fee),
      new.moncash_ref
    );
  end if;
  return null;
end;
$$;

create trigger log_contribution_state_change
  after update on public.contributions
  for each row execute function public.log_contribution_state_change();

-- ============================================================
-- PAYOUTS — Règle 0 (verified_by_api requis avant confirmed) +
-- Règle 2 (aucun versement sans cotisations du cycle confirmées) +
-- Règle 3 (bénéficiaire = ordre défini au lancement) +
-- Règle 6 (transfer_fee toujours recalculé, bloqué au-delà de 100k).
-- ============================================================

create or replace function public.enforce_payout_rules_and_fee()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_actual_position integer;
  v_moncash_number text;
begin
  if tg_op = 'UPDATE' and old.state is distinct from new.state then
    if old.state in ('confirmed', 'failed') then
      raise exception 'Versement % : état terminal % ne peut plus changer (Règle 2)', old.id, old.state;
    elsif not (
      (old.state = 'pending'  and new.state in ('verified', 'failed')) or
      (old.state = 'verified' and new.state in ('sent', 'failed')) or
      (old.state = 'sent'     and new.state in ('confirmed', 'failed'))
    ) then
      raise exception 'Transition de versement interdite : % -> % (Règle 2)', old.state, new.state;
    end if;
  end if;

  if new.state = 'confirmed' and new.verified_by_api is distinct from true then
    raise exception 'Versement % : passage à confirmed impossible sans vérification directe API MonCash (Règle 0, verified_by_api)', new.id;
  end if;

  -- Règle 3 : le bénéficiaire du cycle N doit être le membre en position N.
  select m."position", u.moncash_number into v_actual_position, v_moncash_number
    from public.memberships m
    join public.users u on u.id = m.user_id
    where m.id = new.beneficiary_membership_id;

  if v_actual_position is null then
    raise exception 'Versement : membership bénéficiaire % introuvable', new.beneficiary_membership_id;
  end if;

  if v_actual_position <> new.cycle_number then
    raise exception 'Versement refusé : position du bénéficiaire (%) différente du cycle % (Règle 3, ordre immuable)', v_actual_position, new.cycle_number;
  end if;

  if tg_op = 'INSERT' then
    new.beneficiary_moncash_number := v_moncash_number;

    if (
      select count(*) filter (where state = 'paid')
      from public.contributions
      where group_id = new.group_id and cycle_number = new.cycle_number
    ) < (select total_members from public.groups where id = new.group_id) then
      raise exception 'Versement refusé pour le groupe % cycle % : cotisations du cycle non toutes confirmées payées (Règle 2)', new.group_id, new.cycle_number;
    end if;
  end if;

  new.transfer_fee := public.calculate_transfer_fee(new.amount);

  return new;
end;
$$;

create trigger enforce_payout_rules_and_fee
  before insert or update on public.payouts
  for each row execute function public.enforce_payout_rules_and_fee();

create or replace function public.log_payout_state_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' or (tg_op = 'UPDATE' and old.state is distinct from new.state) then
    insert into public.audit_log (actor_id, action, entity_table, entity_id, state_before, state_after, reference)
    values (
      auth.uid(),
      'payout_state_change',
      'payouts',
      new.id,
      case when tg_op = 'UPDATE' then jsonb_build_object('state', old.state, 'transfer_fee', old.transfer_fee) else null end,
      jsonb_build_object('state', new.state, 'transfer_fee', new.transfer_fee, 'verified_by_api', new.verified_by_api),
      new.moncash_ref
    );
  end if;
  return null;
end;
$$;

create trigger log_payout_state_change
  after insert or update on public.payouts
  for each row execute function public.log_payout_state_change();

-- ============================================================
-- USERS — colonnes réservées à l'administration (KYC, réputation,
-- catégorie marchand, rôle, numéro MonCash).
-- ============================================================

create or replace function public.protect_user_privileged_columns()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if not public.is_admin() then
    if new.kyc_status is distinct from old.kyc_status
       or new.trust_score is distinct from old.trust_score
       or new.merchant_tier is distinct from old.merchant_tier
       or new.role is distinct from old.role
       or new.moncash_number is distinct from old.moncash_number then
      raise exception 'Modification interdite : kyc_status/trust_score/merchant_tier/role/moncash_number réservés à l''administration';
    end if;
  end if;
  return new;
end;
$$;

create trigger protect_user_privileged_columns
  before update on public.users
  for each row execute function public.protect_user_privileged_columns();
