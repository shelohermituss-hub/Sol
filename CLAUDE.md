# CLAUDE.md — Règles du projet Sòlid

## Règle absolue
La coquille visuelle actuelle est celle en cours de reskin depuis les
références Cash App (`design-refs/`, décision explicite prise le
2026-07-18 en connaissance de l'historique du projet — une première
reproduction Cash App avait été construite puis entièrement supprimée
avant de repartir sur une base Oportun/Dart ; ce choix est réaffirmé).
Une fois ce reskin en place, la même règle qu'avant s'applique à nouveau :
la coquille visuelle (composants `ui/`, layout, structure et mise en page)
ne change plus JAMAIS sans décision explicite équivalente. Seul le contenu
fonctionnel tontine est modifiable au quotidien.

Contraintes non négociables pendant ce reskin (voir INVENTAIRE.md) :
- Aucun texte, logo ou élément de marque Cash App n'est reproduit
  verbatim (ni « $Cashtag », ni « Cash App », ni mentions légales
  FINRA/SIPC, ni logos tiers Nike/Meta/Coca-Cola/etc.). Seuls le langage
  visuel et les patterns d'interaction (cartes arrondies, clavier
  numérique, bottom sheet, tab bar) sont réutilisés.
- Le logo est un placeholder générique, jamais le logo Cash App recadré.
- Les fonctionnalités Stocks/Bitcoin/Investing des captures sont hors
  périmètre (Sòlid n'est pas un courtier) — patterns visuels seulement.
- Tout le contenu reste HTG/Kreyòl/MonCash/groupes fermés/score de
  fiabilité, voir règles ci-dessous — ce reskin ne change QUE la coquille,
  jamais le fond fonctionnel déjà construit (Eligibility, Payout Method,
  KYC Haïti, etc.).

## Devise
HTG uniquement, via `formatCurrency()` (Lot 0). Jamais de devise en dur.

## Langue
Kreyòl par défaut, Français en option. Retirer toute référence
anglais/arabe.

## Modèle de confiance
Groupes fermés sur invitation, jamais un marketplace ouvert. Home/Circles
n'affichent que les groupes où l'utilisateur est invité ou qu'il organise.

## Score de fiabilité
Remplace la logique de "slot" à choix libre (Fastest/Lowest/Highest) par
un système où la position dans le cycle dépend du score de fiabilité du
membre (nouveaux membres = positions tardives, score élevé = positions
précoces).

## Paiement
MonCash uniquement pour le pilote. Jamais de cartes bancaires, jamais de
Fawry ou équivalent non pertinent pour Haïti.

## Réglementaire
Toute référence légale/bancaire (Insurance Note, banque centrale) est
marquée [A VALIDER - BRH], jamais supprimée ni inventée.
