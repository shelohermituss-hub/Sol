-- La migration précédente a déplacé is_admin()/is_group_member()/
-- is_group_organizer() vers le schéma `private`. Les policies RLS déjà
-- recréées référencent l'objet par OID (donc insensibles au déplacement),
-- mais le corps texte des fonctions trigger ci-dessous appelait encore
-- `public.is_admin()` par son ancien nom qualifié — resolu paresseusement
-- à la première exécution, donc cassé après le déplacement. Détecté en
-- testant le scénario de démo (transition forming -> active en échec).

create or replace function public.protect_group_financial_columns()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if not private.is_admin() then
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

create or replace function public.protect_user_privileged_columns()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if not private.is_admin() then
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
