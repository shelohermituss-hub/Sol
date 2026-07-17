# CLAUDE.md — Règles du projet Sòlid

## Règle absolue
La coquille visuelle (composants `ui/`, layout, `StepProgress`, `Slider`,
`SegmentedControl`, `ListRow`, `Card`, `CircleCard` — structure et mise en
page) ne change JAMAIS. Seul le contenu fonctionnel tontine est
modifiable.

**Exception explicite (décision produit) :** les icônes de la tab bar
(`DartTabBar`/`DartTab`, `src/components/layout/dart-tab-bar.tsx`) sont
exclues de cette règle et peuvent être remplacées pour adopter un style
d'icônes bold façon Cash App. Seules les icônes (glyphes) changent — le
nombre d'onglets, leur ordre, le FAB central "Join" et la structure/mise
en page de la barre restent inchangés. Toute autre partie de la coquille
reste couverte par la Règle absolue ci-dessus.

**Exception explicite #2 (décision produit — design global façon Cash
App) :** les tokens de fond de page, de police et l'ombre du composant
`Card` sont exclus de la Règle absolue et remplacés globalement :
- Fond de page : nouveau token `--color-canvas` (gris clair, `#f2f2f2`)
  remplace `--color-paper` comme fond de `<body>`. `--color-paper`
  (blanc) reste inchangé et sert désormais spécifiquement de fond aux
  cartes (`Card`, `CircleCard`, etc.) et aux contextes texte-blanc-sur-
  fond-sombre existants.
- Police : `--font-heading` (titres) est réaligné sur `--font-inter`
  (au lieu de Poppins) pour un rendu plus proche de Cash Sans, moins
  "gros" — Poppins retiré du projet (plus aucun usage).
- `Card` (`src/components/ui/card.tsx`) perd sa bordure
  (`border border-neutral-200`) au profit d'une ombre portée légère,
  pour flotter sur le nouveau fond gris comme dans Cash App.
Seuls ces 3 tokens/styles changent. La structure (DOM, layout, espacements,
rayons) de tous les composants listés dans la Règle absolue reste
inchangée — seule leur habillage colorimétrique/typographique change,
globalement, via les design tokens. Cf. `src/styles/design-tokens.md`
pour le détail.

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
