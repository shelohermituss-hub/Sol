-- RLS activé sur TOUTES les tables (SKILL.md, "Schéma minimal attendu").
-- 3 rôles distingués (checklist du skill) : membre, organisatrice
-- (contextuelle par groupe via groups.organizer_id, pas un attribut
-- global sur users), admin (public.users.role = 'admin').

alter table public.users enable row level security;
alter table public.groups enable row level security;
alter table public.memberships enable row level security;
alter table public.contributions enable row level security;
alter table public.payouts enable row level security;
alter table public.webhook_events enable row level security;
alter table public.audit_log enable row level security;

-- USERS : soi-même, un membre d'un groupe commun, ou admin.
create policy users_select_self_shared_group_or_admin on public.users
  for select
  using (
    id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.memberships m1
      join public.memberships m2 on m1.group_id = m2.group_id
      where m1.user_id = auth.uid() and m2.user_id = public.users.id
    )
  );

create policy users_insert_self on public.users
  for insert
  with check (id = auth.uid());

create policy users_update_self_or_admin on public.users
  for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());
-- Colonnes privilégiées protégées en plus par le trigger
-- protect_user_privileged_columns (RLS ne fait pas de contrôle par
-- colonne).

-- GROUPS : membre, organisatrice, ou admin en lecture ; organisatrice
-- peut créer/tenir à jour le groupe qu'elle organise (colonnes
-- financières bloquées par protect_group_financial_columns).
create policy groups_select_member_organizer_or_admin on public.groups
  for select
  using (
    organizer_id = auth.uid()
    or public.is_admin()
    or public.is_group_member(id)
  );

create policy groups_insert_as_organizer on public.groups
  for insert
  with check (organizer_id = auth.uid());

create policy groups_update_organizer_or_admin on public.groups
  for update
  using (organizer_id = auth.uid() or public.is_admin())
  with check (organizer_id = auth.uid() or public.is_admin());

-- MEMBERSHIPS : visible par le membre lui-même, l'organisatrice du
-- groupe, les autres membres du même groupe, ou admin. Création
-- possible tant que le groupe est "forming" (invitation acceptée) ;
-- immutabilité réelle imposée par le trigger enforce_membership_immutability.
create policy memberships_select_group_member_organizer_or_admin on public.memberships
  for select
  using (
    user_id = auth.uid()
    or public.is_admin()
    or public.is_group_organizer(group_id)
    or public.is_group_member(group_id)
  );

create policy memberships_insert_self_or_organizer_while_forming on public.memberships
  for insert
  with check (
    (user_id = auth.uid() or public.is_group_organizer(group_id) or public.is_admin())
    and exists (select 1 from public.groups g where g.id = group_id and g.state = 'forming')
  );

create policy memberships_update_organizer_or_admin on public.memberships
  for update
  using (public.is_group_organizer(group_id) or public.is_admin())
  with check (public.is_group_organizer(group_id) or public.is_admin());

-- CONTRIBUTIONS : lecture par le membre propriétaire, l'organisatrice
-- du groupe (lecture seule, jamais un accès aux fonds), ou admin.
-- Écriture réservée à l'admin — en production, le vrai chemin
-- d'écriture est une fonction SECURITY DEFINER / service role après
-- vérification API MonCash (Règle 0), jamais un INSERT/UPDATE client
-- direct, même côté organisatrice.
create policy contributions_select_owner_organizer_or_admin on public.contributions
  for select
  using (
    public.is_admin()
    or public.is_group_organizer(group_id)
    or exists (select 1 from public.memberships m where m.id = membership_id and m.user_id = auth.uid())
  );

create policy contributions_insert_admin_only on public.contributions
  for insert
  with check (public.is_admin());

create policy contributions_update_admin_only on public.contributions
  for update
  using (public.is_admin())
  with check (public.is_admin());
-- Pas de policy delete : aucune suppression de cotisation, jamais.

-- PAYOUTS : lecture par le bénéficiaire, l'organisatrice (lecture
-- seule), ou admin. Écriture réservée à l'admin, même logique que
-- contributions (Règle 3 : double contrôle).
create policy payouts_select_beneficiary_organizer_or_admin on public.payouts
  for select
  using (
    public.is_admin()
    or public.is_group_organizer(group_id)
    or exists (select 1 from public.memberships m where m.id = beneficiary_membership_id and m.user_id = auth.uid())
  );

create policy payouts_insert_admin_only on public.payouts
  for insert
  with check (public.is_admin());

create policy payouts_update_admin_only on public.payouts
  for update
  using (public.is_admin())
  with check (public.is_admin());
-- Pas de policy delete : aucune suppression de versement, jamais.

-- WEBHOOK_EVENTS : admin uniquement. En production réelle, l'ingestion
-- passe par une route serveur avec la clé service_role (qui court-
-- circuite RLS) — cette policy est une défense en profondeur pour
-- tout rôle authentifié classique.
create policy webhook_events_admin_only_select on public.webhook_events
  for select
  using (public.is_admin());

create policy webhook_events_admin_only_insert on public.webhook_events
  for insert
  with check (public.is_admin());

-- AUDIT_LOG : append-only. Lecture par l'auteur de l'action ou admin.
-- Aucune policy insert/update/delete pour un rôle client : les seules
-- écritures viennent des triggers SECURITY DEFINER
-- (log_contribution_state_change, log_payout_state_change), qui
-- s'exécutent avec les droits du propriétaire de la table et
-- contournent donc RLS pour l'INSERT.
create policy audit_log_select_actor_or_admin on public.audit_log
  for select
  using (actor_id = auth.uid() or public.is_admin());
