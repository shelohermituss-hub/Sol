-- Schéma financier Sòlid. Cf. .claude/skills/moncash-flow/SKILL.md.
-- Extensions requises (uuid-ossp/pgcrypto sont déjà présentes sur ce
-- projet ; moddatetime pilote les colonnes updated_at).
create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists pgcrypto with schema extensions;
create extension if not exists moddatetime with schema extensions;

-- Règle 2 : machine à états stricte pour les groupes (Sòl) et les
-- cotisations. Règle 6 : catégories de compte marchand MonCash.
create type public.kyc_status as enum ('pending', 'verified', 'rejected');
create type public.merchant_tier as enum ('bronze', 'silver', 'gold');
create type public.user_role as enum ('member', 'admin');
create type public.group_state as enum (
  'forming', 'active', 'collecting', 'pot_ready', 'pot_sent', 'next_month', 'completed'
);
create type public.contribution_state as enum ('due', 'pending', 'paid', 'late', 'defaulted');
create type public.payout_state as enum ('pending', 'verified', 'sent', 'confirmed', 'failed');
