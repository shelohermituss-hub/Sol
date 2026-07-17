# CLAUDE.md — Règles du projet Sòlid

## Règle absolue
La coquille visuelle (composants `ui/`, layout, `StepProgress`, `Slider`,
`SegmentedControl`, `ListRow`, `Card`, `CircleCard` — structure et mise en
page) ne change JAMAIS. Seul le contenu fonctionnel tontine est
modifiable.

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
