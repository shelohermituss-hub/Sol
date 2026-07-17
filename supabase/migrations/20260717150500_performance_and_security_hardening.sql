-- Corrections issues du Security/Performance Advisor Supabase après les
-- migrations précédentes :
--  1. is_admin/is_group_member/is_group_organizer/log_*_state_change
--     étaient exposées comme endpoints RPC publics (schéma `public` =
--     schéma exposé par défaut par PostgREST). Elles ne servent qu'en
--     interne (policies RLS, triggers) : déplacées dans un schéma
--     `private` non exposé. Les policies/triggers déjà créés continuent
--     de fonctionner (référence interne par OID, pas par nom).
--  2. Index manquants sur 4 clés étrangères (perf).
--  3. `auth.uid()` réévalué par ligne dans les policies avec occurrence
--     directe : remplacé par `(select auth.uid())` (cf. doc Supabase RLS
--     perf). Les fonctions utilitaires sont réécrites en `private.*`
--     dans ces policies recréées.

create schema if not exists private;

alter function public.is_admin() set schema private;
alter function public.is_group_member(uuid) set schema private;
alter function public.is_group_organizer(uuid) set schema private;
alter function public.log_contribution_state_change() set schema private;
alter function public.log_payout_state_change() set schema private;

create index if not exists audit_log_actor_id_idx on public.audit_log (actor_id);
create index if not exists groups_organizer_id_idx on public.groups (organizer_id);
create index if not exists memberships_user_id_idx on public.memberships (user_id);
create index if not exists payouts_beneficiary_membership_id_idx on public.payouts (beneficiary_membership_id);

drop policy users_select_self_shared_group_or_admin on public.users;
create policy users_select_self_shared_group_or_admin on public.users
  for select
  using (
    id = (select auth.uid())
    or private.is_admin()
    or exists (
      select 1 from public.memberships m1
      join public.memberships m2 on m1.group_id = m2.group_id
      where m1.user_id = (select auth.uid()) and m2.user_id = public.users.id
    )
  );

drop policy users_insert_self on public.users;
create policy users_insert_self on public.users
  for insert
  with check (id = (select auth.uid()));

drop policy users_update_self_or_admin on public.users;
create policy users_update_self_or_admin on public.users
  for update
  using (id = (select auth.uid()) or private.is_admin())
  with check (id = (select auth.uid()) or private.is_admin());

drop policy groups_select_member_organizer_or_admin on public.groups;
create policy groups_select_member_organizer_or_admin on public.groups
  for select
  using (
    organizer_id = (select auth.uid())
    or private.is_admin()
    or private.is_group_member(id)
  );

drop policy groups_insert_as_organizer on public.groups;
create policy groups_insert_as_organizer on public.groups
  for insert
  with check (organizer_id = (select auth.uid()));

drop policy groups_update_organizer_or_admin on public.groups;
create policy groups_update_organizer_or_admin on public.groups
  for update
  using (organizer_id = (select auth.uid()) or private.is_admin())
  with check (organizer_id = (select auth.uid()) or private.is_admin());

drop policy memberships_select_group_member_organizer_or_admin on public.memberships;
create policy memberships_select_group_member_organizer_or_admin on public.memberships
  for select
  using (
    user_id = (select auth.uid())
    or private.is_admin()
    or private.is_group_organizer(group_id)
    or private.is_group_member(group_id)
  );

drop policy memberships_insert_self_or_organizer_while_forming on public.memberships;
create policy memberships_insert_self_or_organizer_while_forming on public.memberships
  for insert
  with check (
    (user_id = (select auth.uid()) or private.is_group_organizer(group_id) or private.is_admin())
    and exists (select 1 from public.groups g where g.id = group_id and g.state = 'forming')
  );

drop policy memberships_update_organizer_or_admin on public.memberships;
create policy memberships_update_organizer_or_admin on public.memberships
  for update
  using (private.is_group_organizer(group_id) or private.is_admin())
  with check (private.is_group_organizer(group_id) or private.is_admin());

drop policy contributions_select_owner_organizer_or_admin on public.contributions;
create policy contributions_select_owner_organizer_or_admin on public.contributions
  for select
  using (
    private.is_admin()
    or private.is_group_organizer(group_id)
    or exists (select 1 from public.memberships m where m.id = membership_id and m.user_id = (select auth.uid()))
  );

drop policy contributions_insert_admin_only on public.contributions;
create policy contributions_insert_admin_only on public.contributions
  for insert
  with check (private.is_admin());

drop policy contributions_update_admin_only on public.contributions;
create policy contributions_update_admin_only on public.contributions
  for update
  using (private.is_admin())
  with check (private.is_admin());

drop policy payouts_select_beneficiary_organizer_or_admin on public.payouts;
create policy payouts_select_beneficiary_organizer_or_admin on public.payouts
  for select
  using (
    private.is_admin()
    or private.is_group_organizer(group_id)
    or exists (select 1 from public.memberships m where m.id = beneficiary_membership_id and m.user_id = (select auth.uid()))
  );

drop policy payouts_insert_admin_only on public.payouts;
create policy payouts_insert_admin_only on public.payouts
  for insert
  with check (private.is_admin());

drop policy payouts_update_admin_only on public.payouts;
create policy payouts_update_admin_only on public.payouts
  for update
  using (private.is_admin())
  with check (private.is_admin());

drop policy webhook_events_admin_only_select on public.webhook_events;
create policy webhook_events_admin_only_select on public.webhook_events
  for select
  using (private.is_admin());

drop policy webhook_events_admin_only_insert on public.webhook_events;
create policy webhook_events_admin_only_insert on public.webhook_events
  for insert
  with check (private.is_admin());

drop policy audit_log_select_actor_or_admin on public.audit_log;
create policy audit_log_select_actor_or_admin on public.audit_log
  for select
  using (actor_id = (select auth.uid()) or private.is_admin());
