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

**Exception explicite #3 (décision produit — couleur de marque façon
Cash App) :** `--color-brand-green` est réaligné sur la famille du vert
signature de Cash App (vif, saturé), dans une teinte volontairement
atténuée par rapport à leur `#00D632` exact — décision explicite pour
rester dans le même esprit sans reprendre littéralement leur nuance de
marque. Nouvelle valeur : `#0FA968` (au lieu de `#0b9b3c`). Aucun autre
token de couleur ne change ; usages inchangés (liens, coche cochée,
badges succès, pills "Joined"/actions positives).

**Exception explicite #4 (décision produit — audit complet du système de
couleurs Cash App, remplace la teinte atténuée de l'exception #3) :**
sur demande explicite ("reprends celle de Cash App"), les couleurs
mesurées directement par échantillonnage programmatique (Python/Pillow,
même méthode que le reste de `design-tokens.md`) sur ~15 captures
Cash App réelles remplacent les tokens suivants — valeurs exactes, plus
d'atténuation :
- `--color-ink` : `#333333` (au lieu de `#000000` — Cash App n'utilise
  jamais un noir pur, cf. mesure convergente sur 8+ captures).
- `--color-canvas` : `#f5f5f5` (au lieu de `#f2f2f2` — écart mineur).
- `--color-neutral-500` : `#666666` (au lieu de `#6b6b6b` — écart mineur).
- `--color-brand-green` : `#00d651` (au lieu de `#0fa968` de
  l'exception #3 — valeur exacte mesurée, remarquablement constante sur
  8 captures indépendantes).
- Nouveaux tokens ajoutés (accents secondaires mesurés, pas de
  remplacement, disponibles pour badges/graphiques/éléments décoratifs) :
  `--color-accent-blue-vivid: #3478f5`, `--color-accent-cyan: #00d4ff`,
  `--color-accent-purple: #8420f4`, `--color-accent-orange-vivid: #ee9d44`.
- Rouge : quasi absent des captures (une seule occurrence mineure,
  petit badge, jamais structurel) — confirme et ne contredit pas la
  règle déjà en place (aucune couleur destructive rouge).
- Rayon de carte : mesuré ~12-14px sur les captures, déjà proche de
  `--radius-card: 16px` existant — aucun changement nécessaire.
`--color-paper` (blanc) et `--color-accent-peach`/`--color-accent-mint`
(tokens décoratifs existants, non mesurés sur Cash App) restent
inchangés — seuls les tokens listés ci-dessus sont concernés. Travail
effectué sur la branche dédiée `redesign/cashapp-total`.

**Exception explicite #5 (décision produit — habillage colorimétrique
des composants de formulaire/badge façon Cash App, Lot D4, validée
explicitement par l'utilisateur : "tu as tous les permissions pour
recrée les composants tous") :** sur la base de captures Cash App
réelles, l'habillage colorimétrique (jamais la structure/le DOM) des
composants `ui/` suivants est ajusté :
- `Badge` (`src/components/ui/badge.tsx`) — variant `new` : recoloré de
  `bg-brand-blue text-paper uppercase` (bleu plein, texte blanc
  majuscule) vers `bg-accent-mint text-brand-green` (pastille vert
  clair, texte vert), et casse normale (retrait de `uppercase`) —
  reproduit exactement le badge "New" observé sur Cash App
  (`Frame 30.png`, menu compte), qui est vert et non bleu. `--color-
  brand-blue` reste inchangé et disponible (icônes de statut).
- `Button` variant `secondary`, uniquement dans le contexte de la carte
  Cash Balance de Home (`src/app/dart/home/page.tsx`, boutons "Add
  Cash"/"Cash Out") — remplacement ponctuel via `className` (pas de
  changement du variant global, qui reste bordé blanc pour ses autres
  usages sur fond canvas où un remplissage gris canvas serait invisible)
  par un remplissage `bg-canvas` sans bordure, reproduisant exactement
  la couleur mesurée au pixel (`#f5f5f5`, identique au canvas) des
  boutons secondaires de la carte Cash Balance sur `Home.png`.
- `RadioGroupItem`/`Switch` : déjà alignés (`--color-brand-green` pour
  l'état coché) depuis les exceptions précédentes — vérifiés cohérents
  avec Cash App, aucun changement nécessaire.
- `TextField`/`SegmentedControl` : aucune référence Cash App fiable et
  directement comparable trouvée dans les captures disponibles (les
  champs de saisie Cash App observés appartiennent à un contexte plein
  écran différent de notre pattern de formulaire à label flottant) —
  non modifiés.

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
