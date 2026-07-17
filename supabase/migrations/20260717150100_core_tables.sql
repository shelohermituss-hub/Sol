-- Schéma minimal attendu (SKILL.md, "Schéma minimal attendu (Supabase)").
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text not null,
  moncash_number text not null unique,
  kyc_status public.kyc_status not null default 'pending',
  trust_score integer not null default 0 check (trust_score between 0 and 100),
  merchant_tier public.merchant_tier not null default 'bronze',
  role public.user_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.users is 'Identité KYC + réputation. Règle 4 : 1 compte MonCash = 1 identité KYC = 1 membre (unique sur moncash_number).';
comment on column public.users.merchant_tier is 'Catégorie du compte marchand MonCash qui collecte pour les groupes que cet utilisateur organise (Règle 6.1). Sans effet si l''utilisateur n''organise aucun groupe.';
comment on column public.users.role is 'Rôle plateforme : member (défaut) ou admin. Le rôle "organisatrice" est contextuel par groupe (groups.organizer_id), pas un attribut global.';

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organizer_id uuid not null references public.users (id),
  amount integer not null check (amount > 0),
  monthly_amount integer not null check (monthly_amount > 0),
  pot_day smallint not null check (pot_day between 1 and 28),
  total_members integer not null check (total_members > 0),
  state public.group_state not null default 'forming',
  current_cycle integer not null default 1 check (current_cycle >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.groups is 'Un Sòl (tontine). Règle 2 : transitions de state validées par trigger (enforce_group_state_transition), jamais par du code ad hoc.';

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references public.users (id),
  "position" integer not null check ("position" > 0),
  joined_at timestamptz not null default now(),
  unique (group_id, user_id),
  unique (group_id, "position")
);
comment on table public.memberships is 'Règle 2 : position immuable après forming -> active (trigger enforce_membership_immutability, aucune exception de rôle).';

create table public.contributions (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  membership_id uuid not null references public.memberships (id),
  cycle_number integer not null check (cycle_number >= 1),
  month date not null,
  amount integer not null check (amount > 0),
  collection_fee integer not null default 0 check (collection_fee >= 0),
  state public.contribution_state not null default 'due',
  moncash_ref text unique,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (membership_id, cycle_number)
);
comment on column public.contributions.collection_fee is 'Toujours recalculé par public.calculate_collection_fee() via trigger (enforce_contribution_state_and_fee) — jamais accepté du client (Règle 6).';

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  cycle_number integer not null check (cycle_number >= 1),
  month date not null,
  beneficiary_membership_id uuid not null references public.memberships (id),
  beneficiary_moncash_number text not null,
  amount integer not null check (amount > 0),
  transfer_fee integer not null default 0 check (transfer_fee >= 0),
  state public.payout_state not null default 'pending',
  moncash_ref text unique,
  verified_by_api boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, cycle_number)
);
comment on column public.payouts.transfer_fee is 'Toujours recalculé par public.calculate_transfer_fee() via trigger (enforce_payout_rules_and_fee) — bloque au-delà de 100 000 HTG (Règle 6.2) au lieu d''extrapoler.';

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  raw_payload jsonb not null,
  processed boolean not null default false,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);
comment on table public.webhook_events is 'Règle 0 + Règle 1 : événement brut conservé tel quel. Le webhook n''est jamais la source de vérité seule ; idempotence garantie par idempotency_key UNIQUE.';

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.users (id),
  action text not null,
  entity_table text not null,
  entity_id uuid not null,
  state_before jsonb,
  state_after jsonb,
  reference text,
  created_at timestamptz not null default now()
);
comment on table public.audit_log is 'Règle 3 + Règle 5 : append-only, alimenté uniquement par triggers SECURITY DEFINER (log_contribution_state_change, log_payout_state_change). Aucune policy update/delete.';

create index contributions_group_cycle_idx on public.contributions (group_id, cycle_number);
create index payouts_group_cycle_idx on public.payouts (group_id, cycle_number);
create index memberships_group_idx on public.memberships (group_id);
create index audit_log_entity_idx on public.audit_log (entity_table, entity_id);

create trigger set_updated_at before update on public.users
  for each row execute function extensions.moddatetime(updated_at);
create trigger set_updated_at before update on public.groups
  for each row execute function extensions.moddatetime(updated_at);
create trigger set_updated_at before update on public.contributions
  for each row execute function extensions.moddatetime(updated_at);
create trigger set_updated_at before update on public.payouts
  for each row execute function extensions.moddatetime(updated_at);
