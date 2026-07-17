-- Scénario de démonstration du schéma financier Sòlid (cf. .claude/skills/
-- moncash-flow/SKILL.md). Ce fichier n'est PAS une migration — il n'est
-- jamais exécuté automatiquement en production. Il documente et rejoue le
-- scénario utilisé pour valider le schéma : 1 admin, 1 organisatrice
-- (compte marchand "silver"), 3 membres (positions 1/2/3), un cycle
-- complet forming -> ... -> next_month, avec les cas d'erreur attendus.
--
-- Usage local : `supabase db reset` (charge les migrations puis ce seed)
-- ou `psql ... -f supabase/seed.sql` sur un projet de développement.
-- Ne jamais exécuter sur un projet contenant de vraies données.

do $$
declare
  v_admin_id uuid;
  v_organizer_id uuid;
  v_member_a uuid;
  v_member_b uuid;
  v_member_c uuid;
  v_group_id uuid;
  v_membership_a uuid;
  v_membership_b uuid;
  v_membership_c uuid;
  v_contrib_a uuid;
  v_contrib_b uuid;
  v_contrib_c uuid;
  v_payout_id uuid;
begin
  -- Identités démo (auth.users minimal + public.users).
  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
  values
    ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'admin.demo@solid.test',     crypt('demo-pass', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}'),
    ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'organizer.demo@solid.test', crypt('demo-pass', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}'),
    ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'membera.demo@solid.test',   crypt('demo-pass', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}'),
    ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'memberb.demo@solid.test',   crypt('demo-pass', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}'),
    ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'memberc.demo@solid.test',   crypt('demo-pass', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}');

  select id into v_admin_id     from auth.users where email = 'admin.demo@solid.test';
  select id into v_organizer_id from auth.users where email = 'organizer.demo@solid.test';
  select id into v_member_a     from auth.users where email = 'membera.demo@solid.test';
  select id into v_member_b     from auth.users where email = 'memberb.demo@solid.test';
  select id into v_member_c     from auth.users where email = 'memberc.demo@solid.test';

  insert into public.users (id, full_name, phone, moncash_number, kyc_status, trust_score, merchant_tier, role) values
    (v_admin_id,     'Admin Démo',         '50900000001', '50900000001', 'verified', 100, 'gold',   'admin'),
    (v_organizer_id, 'Organisatrice Démo', '50900000002', '50900000002', 'verified', 80,  'silver', 'member'),
    (v_member_a,     'Membre A Démo',      '50900000003', '50900000003', 'verified', 75,  'bronze', 'member'),
    (v_member_b,     'Membre B Démo',      '50900000004', '50900000004', 'verified', 40,  'bronze', 'member'),
    (v_member_c,     'Membre C Démo',      '50900000005', '50900000005', 'verified', 10,  'bronze', 'member');

  -- Toute transition d'état passe par les triggers Règle 2/4 : il faut une
  -- session "admin" simulée (comme le ferait PostgREST avec un vrai JWT).
  perform set_config('request.jwt.claims', json_build_object('sub', v_admin_id, 'role', 'authenticated')::text, true);

  insert into public.groups (name, organizer_id, amount, monthly_amount, pot_day, total_members)
  values ('Sòl Démo Seed', v_organizer_id, 30000, 10000, 5, 3)
  returning id into v_group_id;

  insert into public.memberships (group_id, user_id, "position") values
    (v_group_id, v_member_a, 1),
    (v_group_id, v_member_b, 2),
    (v_group_id, v_member_c, 3);

  select id into v_membership_a from public.memberships where group_id = v_group_id and user_id = v_member_a;
  select id into v_membership_b from public.memberships where group_id = v_group_id and user_id = v_member_b;
  select id into v_membership_c from public.memberships where group_id = v_group_id and user_id = v_member_c;

  -- forming -> active -> collecting.
  update public.groups set state = 'active' where id = v_group_id;
  update public.groups set state = 'collecting' where id = v_group_id;

  -- Cycle 1 : une cotisation par membre. collection_fee est toujours
  -- recalculé par trigger (Règle 6) — la valeur fournie ici est
  -- volontairement absurde pour prouver qu'elle est ignorée.
  insert into public.contributions (group_id, membership_id, cycle_number, month, amount, collection_fee) values
    (v_group_id, v_membership_a, 1, date_trunc('month', now())::date, 10000, 999999),
    (v_group_id, v_membership_b, 1, date_trunc('month', now())::date, 10000, 999999),
    (v_group_id, v_membership_c, 1, date_trunc('month', now())::date, 10000, 999999)
  returning id into v_contrib_a; -- (ne capture que la 1re ligne, suffisant pour ce seed)

  select id into v_contrib_a from public.contributions where group_id = v_group_id and membership_id = v_membership_a;
  select id into v_contrib_b from public.contributions where group_id = v_group_id and membership_id = v_membership_b;
  select id into v_contrib_c from public.contributions where group_id = v_group_id and membership_id = v_membership_c;

  update public.contributions set state = 'pending' where id in (v_contrib_a, v_contrib_b, v_contrib_c);
  update public.contributions set state = 'paid', moncash_ref = 'MC-SEED-C1' where id = v_contrib_a;
  update public.contributions set state = 'paid', moncash_ref = 'MC-SEED-C2' where id = v_contrib_b;
  update public.contributions set state = 'paid', moncash_ref = 'MC-SEED-C3' where id = v_contrib_c;

  -- collecting -> pot_ready (bloqué tant que les 3 ne sont pas "paid") -> pot_sent.
  update public.groups set state = 'pot_ready' where id = v_group_id;
  update public.groups set state = 'pot_sent' where id = v_group_id;

  -- Versement du cycle 1 : le bénéficiaire DOIT être le membre en
  -- position 1 (Règle 3). transfer_fee est recalculé par trigger.
  insert into public.payouts (group_id, cycle_number, month, beneficiary_membership_id, amount, transfer_fee)
  values (v_group_id, 1, date_trunc('month', now())::date, v_membership_a, 30000, 1)
  returning id into v_payout_id;

  update public.payouts set state = 'verified' where id = v_payout_id;
  update public.payouts set state = 'sent' where id = v_payout_id;
  -- verified_by_api = true est requis pour passer à confirmed (Règle 0).
  update public.payouts set state = 'confirmed', verified_by_api = true, moncash_ref = 'MC-SEED-PAYOUT-1' where id = v_payout_id;

  -- pot_sent -> next_month : la machine avance seule vers collecting,
  -- current_cycle passe à 2 (trigger advance_group_next_cycle).
  update public.groups set state = 'next_month' where id = v_group_id;

  -- Idempotence webhook (Règle 1) : rejouer la même clé doit échouer.
  insert into public.webhook_events (idempotency_key, raw_payload)
  values ('MC-SEED-C1', jsonb_build_object('demo', 'first delivery', 'contribution_id', v_contrib_a));

  raise notice 'Seed Sòlid : groupe % créé, cycle 1 complet (3 cotisations payées, 1 versement confirmé), cycle 2 démarré.', v_group_id;
end $$;
