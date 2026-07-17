-- Règle 6 : barème de frais MonCash réel. Traduction directe des fonctions
-- TypeScript de référence du skill moncash-flow — ne jamais dupliquer ce
-- calcul ailleurs (client, valeur statique, estimation).

create or replace function public.calculate_collection_fee(p_amount integer, p_tier public.merchant_tier)
returns integer
language plpgsql
immutable
set search_path = public
as $$
begin
  if p_amount <= 0 then
    raise exception 'calculate_collection_fee: le montant doit être positif (reçu %)', p_amount;
  end if;

  return round(
    p_amount * case p_tier
      when 'bronze' then 0.005
      when 'silver' then 0.02
      when 'gold'   then 0.02
    end
  )::integer;
end;
$$;
comment on function public.calculate_collection_fee is 'Règle 6.1 — frais de collecte MonCash par catégorie de compte marchand (bronze 0,5% / silver 2% / gold 2%).';

create or replace function public.calculate_transfer_fee(p_amount integer)
returns integer
language plpgsql
immutable
set search_path = public
as $$
declare
  v_fee integer;
begin
  if p_amount < 20 then
    raise exception 'calculate_transfer_fee: montant % HTG hors barème connu (< 20 HTG).', p_amount;
  end if;

  select t.fee into v_fee
  from (values
    (20,    249,    0),
    (250,   499,    5),
    (500,   999,    10),
    (1000,  1999,   25),
    (2000,  3999,   35),
    (4000,  7999,   50),
    (8000,  11999,  60),
    (12000, 19999,  70),
    (20000, 39999,  75),
    (40000, 59999,  100),
    (60000, 75000,  120),
    (75000, 100000, 130)
  ) as t (min_amount, max_amount, fee)
  where p_amount between t.min_amount and t.max_amount
  order by t.min_amount desc
  limit 1;

  if v_fee is null then
    raise exception '[TARIF A CONFIRMER AUPRES DE MONCASH] Montant % HTG hors barème connu (> 100 000 HTG). Tarif à confirmer auprès de MonCash avant tout versement automatique.', p_amount;
  end if;

  return v_fee;
end;
$$;
comment on function public.calculate_transfer_fee is 'Règle 6.2 — frais de transfert MonCash à paliers fixes. À 75 000 HTG pile (chevauchement dans le barème source), le palier supérieur (130 HTG) est retenu. Lève une exception au-delà de 100 000 HTG plutôt que d''extrapoler.';
