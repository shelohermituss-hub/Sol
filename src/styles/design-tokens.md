# Design Tokens (extraits des screenshots de l'app source, `design-refs/`)

> Extraction visuelle (pas de fichier Figma disponible pour ce projet — voir
> `INVENTAIRE.md`). Les couleurs ci-dessous sont mesurées au pixel exact par
> échantillonnage programmatique sur les captures (script Python/Pillow), pas
> estimées à l'œil. La police est un diagnostic visuel (voir section
> Typographie) : à confirmer si jamais un export Figma/brand book devient
> disponible.
>
> Toutes les captures embarquent un bandeau "curated by Mobbin" (fond
> `#2f2f2f`) : c'est un habillage de l'outil de capture, exclu de ces tokens.

## Couleurs

### Neutres
| Token | Valeur | Usage observé |
|---|---|---|
| `--color-ink` | `#333333` | Titres, texte principal, boutons primaires, icônes actives, tab bar actif. Mesuré par échantillonnage sur ~8 captures Cash App réelles (convergence forte, `#333333`/`#343434` selon les frames) — cf. CLAUDE.md, exception #4. Cash App n'utilise jamais de noir pur (`#000000`), valeur d'origine de ce projet. |
| `--color-paper` | `#ffffff` | Fond des cartes (`Card`, `CircleCard`, ListRow sur fond sombre, etc.) et texte blanc sur fond ink |
| `--color-canvas` | `#f5f5f5` | Fond de `<body>`/de toutes les pages — cf. CLAUDE.md, exceptions #2 et #4. Mesuré `#f5f5f5` de façon très constante sur toutes les captures Cash App (valeur d'estimation précédente : `#f2f2f2`, écart mineur). `--color-paper` n'est plus le fond de page. |
| `--color-neutral-200` | `#e5e5e5` | Bordures d'input, séparateurs de liste, contour des icônes circulaires, fond des boutons désactivés |
| `--color-neutral-500` | `#666666` | Texte secondaire, placeholder, sous-titres gris. Mesuré `#666666` (convergence forte, ~14k+ pixels sur une seule capture) — cf. CLAUDE.md, exception #4. Valeur précédente : `#6b6b6b`, écart mineur. |

### Marque
| Token | Valeur | Usage observé |
|---|---|---|
| `--color-brand-green` | `#00d651` | Liens ("Cancel", "Change", "Resend", mentions légales), case à cocher cochée, icône succès transfert, boutons primaires positifs. Valeur exacte mesurée par échantillonnage programmatique sur 8 captures Cash App indépendantes (remarquablement constante, `#01d651` ±2 sur tous les canaux) — cf. CLAUDE.md, exception #4, qui remplace la teinte volontairement atténuée de l'exception #3 (`#0FA968`). Valeur d'origine de ce projet (mesurée sur les captures source Oportun) : `#0b9b3c`. |
| `--color-brand-blue` | `#009adc` | Badge "NEW", icône "i" du bandeau d'information abonnement |
| `--color-brand-blue-tint` | `#e6f5fb` | Fond du bandeau info ("Your monthly plan will start…"), fond de la carte upsell annuelle |
| `--color-accent-peach` | `#ffc6ac` | Fond de l'icône de marque Set & Save (fleur-pièce) |
| `--color-accent-mint` | `#e7f9ec` | Fond des badges d'icônes de fonctionnalités (paywall Set & Save) |

### Accents secondaires Cash App (mesurés, exception #4 — disponibles, pas de remplacement de token existant)
Mesurés par échantillonnage sur les écrans "Verify identity"/onboarding
(boutons secondaires, badges) et sur les graphiques Bitcoin/Stocks de
Home. Usage décoratif/ponctuel (badges, graphiques, éléments non-marque),
jamais pour remplacer `--color-brand-green` sur une action primaire.
| Token | Valeur | Usage observé sur Cash App |
|---|---|---|
| `--color-accent-blue-vivid` | `#3478f5` | Boutons secondaires, liens ponctuels (mesuré sur 4 captures, très constant) |
| `--color-accent-cyan` | `#00d4ff` | Graphique Bitcoin/crypto (courbe) |
| `--color-accent-purple` | `#8420f4` | Graphique Stocks (courbe) |
| `--color-accent-orange-vivid` | `#ee9d44` | Fond plein écran promo/reward (1 capture, moins constant que les autres) |

### Palette d'illustration (usage décoratif uniquement, jamais en UI/texte)
Mesurée sur l'illustration héro "Reach for your goals effortlessly" :
`#ff8f75` (corail), `#c7baee` (lavande), `#b3dfbc` (vert menthe clair),
`#a6d2e5` / `#7fc1e1` (bleu ciel), `#8c81ff` (violet), `#c28a76` / `#9c704b`
(tons de peau). À utiliser uniquement pour les illustrations générées, jamais
comme token de composant UI.

### Constat important
Le flow "Removing an account" (suppression de compte) n'utilise **aucun
rouge** : la modale de confirmation et le bouton "Remove" reprennent le noir
standard (`--color-ink`). Ne pas introduire de token destructif rouge tant
qu'aucun écran ne le montre.

## Typographie

**⚠️ Écart assumé au diagnostic visuel d'origine** (cf. CLAUDE.md,
exception #2, décision produit) : `--font-heading` est réaligné sur
**Inter** (au lieu de Poppins ci-dessous), pour un rendu plus proche de
Cash Sans (police propriétaire Cash App, non disponible publiquement) et
moins "gros" en graisse bold. Poppins est retiré du projet
(`src/app/layout.tsx` ne charge plus que Inter). Le diagnostic original
reste documenté ci-dessous pour traçabilité, mais n'est plus la valeur
appliquée.

**Diagnostic visuel d'origine** (aucun fichier de police fourni) :
- **Titres (bold/semibold)** : sans-serif géométrique à empattements arrondis,
  "o" parfaitement circulaires, "g" bas-de-casse à boucle ouverte simple
  (visible sur "goals"), très proche de **Poppins**. Le wordmark du logo
  splash de l'app source est composé dans cette même famille.
- **Corps de texte / labels** : sans-serif plus neutre/humaniste, proportions
  moins géométriques que les titres — proche de **Inter**.
- ⚠️ Si un brand book officiel est fourni par la suite, comparer et
  remplacer si la police exacte diffère.

### Échelle
| Usage | Taille | Graisse |
|---|---|---|
| Titre de page (H1) | 28–32px | Bold (700) |
| Montant héros (écran saisie de montant) | 48–56px | Bold (700) |
| Corps / body | 16–17px | Regular (400) |
| Labels / eyebrow ("Step 1 of 2", labels de champ) | 13–14px | Regular (400) |
| Boutons | 17px | Semibold/Bold (600–700) |

## Ombres et élévation

**Audit qualitatif (Lot D1)** — comparaison visuelle sur les captures Cash
App réelles (`Home.png`, `Frame 27.png`/liste "Account & Settings",
`Pay amount.png`, `Frame 41.png`/clavier ZIP code) : aucune ombre portée
n'est perceptible nulle part dans l'app, y compris sur les cartes qui
flottent sur le fond gris, les boutons pill pleins, et les inputs. La
profondeur vient uniquement du contraste de couleur (blanc sur
`--color-canvas` gris), jamais d'un flou/dégradé d'ombre — écran plat.
Ombres jamais mesurables au pixel près comme les couleurs (trop diffuses/
faible opacité) : audit qualitatif, pas d'échantillonnage programmatique.

Conséquence : `Card`/`CategoryCard` (`shadow-[0_1px_3px_rgba(0,0,0,0.06),
0_1px_2px_rgba(0,0,0,0.04)]`, estimation initiale de l'exception #2) sont
allégées à une ombre unique quasi imperceptible
`shadow-[0_1px_2px_rgba(0,0,0,0.05)]`, plus fidèle à la platitude
observée. Le FAB de `DartTabBar` (bouton "Join", sans équivalent Cash
App — leur tab bar n'a pas de bouton central) garde une ombre plus
marquée que les cartes par nécessité fonctionnelle (affordance de bouton
flottant au-dessus du contenu et de la tab bar), mais allégée du
`shadow-lg` Tailwind par défaut à `shadow-[0_4px_10px_rgba(0,0,0,0.14)]`
pour rester dans le même esprit sobre. `Sheet` (bottom sheet) n'a jamais
eu d'ombre (seulement `border-t`) et n'a pas été modifié : cohérent avec
l'absence d'ombre observée sur les modales Cash App.

### Audit typographie fine (Lot D3)
Comparaison visuelle des graisses sur les captures ("Money"/"Account &
Settings" en titre, "$10" en montant héros, boutons "Add Cash"/"Next") :
les titres et montants héros Cash App sont visuellement très appuyés,
cohérent avec `font-bold` (700) déjà utilisé pour ces éléments ; les
boutons pill affichent une graisse intermédiaire, cohérente avec
`font-semibold` (600) déjà utilisé sur `Button`. Aucune dérive de
graisse identifiée par rapport à l'échelle déjà documentée plus haut
(section Typographie). L'interlignage/tracking des titres et montants
apparaît serré sur les captures, ce qui correspond déjà au comportement
par défaut du navigateur pour `text-[Npx]` (Tailwind ne fixe pas de
`line-height` séparé pour les tailles arbitraires) — aucun token de
`line-height`/`tracking` explicite n'est donc nécessaire. **Aucun
changement de code** pour ce Lot.

**Constat hors-périmètre (pas appliqué ce Lot)** : le variant `secondary`
de `Button` (`border border-ink bg-paper`, fond blanc + bordure) diffère
du remplissage gris plein (sans bordure visible) des boutons secondaires
observés sur Cash App (ex. "Add Cash"/"Cash Out"). C'est un changement
d'habillage colorimétrique d'un composant `ui/` protégé par la Règle
absolue : à traiter, si retenu, dans le même lot que D4 (nécessite une
exception CLAUDE.md explicite avant application), pas dans ce Lot
typographie.

## Espacements & rayons

Échelle 4/8px standard (Tailwind par défaut), confirmée par les marges
observées (marge de page ≈ 16px, espacement entre champs ≈ 24–32px, hauteur
de ligne de liste ≈ 40–56px).

| Token | Valeur | Usage |
|---|---|---|
| `--radius-input` | `14px` | Champs de saisie |
| `--radius-card` | `16px` | Cards (résumé, info, promo) |
| `--radius-sheet` | `24px` | Coins hauts des bottom sheets |
| `--radius-full` | `9999px` | Boutons pill (primaire/secondaire), badges |

Hauteur de bouton pill : ~56px (rayon = moitié de la hauteur → pill complet).

### Audit espacement/rythme (Lot D2)
Mesures programmatiques (transitions de couleur blanc/gris) sur
`Home.png` (393×852, 1:1 avec les px CSS) et `Frame 27.png` (1755×3795,
÷4.46 pour ramener en px logiques) :
- **Marge de page** : 20px mesuré (page margin gauche/droite du Cash
  Balance card, constant sur plusieurs lignes). Token actuel `px-6`
  (24px) — écart 20%, pile au seuil de tolérance retenu (>20%) : **non
  modifié**, considéré comme déjà correct.
- **Écart de grille 2 colonnes** (cartes catégorie Home) : ~15-16px
  mesuré (constant sur 6 lignes de mesure indépendantes). Token
  précédent `gap-3` (12px), écart 25-33% > seuil : **corrigé en
  `gap-4`** (16px) sur les 4 grilles `grid-cols-2` du même type visuel
  (tuiles cliquables) : Home (catégories), scan-id (recto/verso),
  slot (créneaux), payment (Others).
- **Rythme vertical inter-sections** (bas de carte → section suivante) :
  ~32px mesuré, identique au token `mt-8` (32px) déjà utilisé : **déjà
  correct**, aucun changement.
- **Hauteur de ligne de liste** (`Frame 27.png`, séparateurs) : ~65px
  mesuré, contre ~88px pour `ListRow` avec icône circulaire (`py-4` +
  icône `size-14`). Écart non attribuable au padding (`py-4` seul
  correspond à l'espacement déjà validé) mais à la taille d'icône
  circulaire (56px), un choix de contenu/structure de `ListRow`
  protégé par la Règle absolue de CLAUDE.md, hors du périmètre "token
  d'espacement" de ce Lot : **non modifié**.

## Composants récurrents

Voir `INVENTAIRE.md` section 2 pour la liste complète (bouton primaire/
secondaire, input, OTP, checkbox, toggle, list row, card, bottom sheet,
badge "NEW", bandeau succès, tab bar, etc.) — base pour les composants
`src/components/ui/`.

### Étape 4 — implémentation shadcn/ui

`shadcn/ui` initialisé (`components.json`, style `base-nova`, primitives
`@base-ui/react`, `iconLibrary: "phosphor"` — jamais `lucide-react`, retiré
des dépendances). Le thème par défaut shadcn (oklch gris) a été entièrement
remappé sur les tokens ci-dessus dans `globals.css` (`--primary`,
`--background`, `--border`, etc. pointent vers `--color-ink`,
`--color-paper`, `--color-neutral-200`...) ; `--destructive` reprend
`--color-ink` en l'absence de tout rouge observé. Mode sombre retiré
(reproduction fidèle à un seul thème clair).

Composants shadcn ajoutés puis réécrits pour correspondre exactement au
design (`src/components/ui/`) : `button` (pill primaire/secondaire/disabled),
`checkbox` (coché = vert marque), `switch` (iOS, coché = vert), `radio-group`
(anneau + point vert), `accordion` (bouton chevron circulaire), `badge`
(variante `new` bleue), `card`, `sheet` (toujours bottom sheet : coins hauts
arrondis, poignée grise, pas de bouton "X"), `input`, `label`.

Composants sur-mesure (pattern trop spécifique pour un simple habillage
shadcn) : `text-field` (label flottant), `otp-input` (6 cases), `list-row`
(icône + titre/sous-titre + trailing), `success-banner` (bandeau inline, pas
un toast flottant). Composants de layout : `nav-header` (+ `NavBackButton`,
`NavCloseButton`, `CancelLink`), `bottom-tab-bar`. Icône sur-mesure :
`icons/set-and-save-icon` (pousses + pièce dollar, pas d'équivalent
Phosphor).

## Icônes

Stratégie (voir `CLAUDE.md`) : `@phosphor-icons/react` en priorité ; icône
recréée en SVG à la main si aucune correspondance (pas de Figma disponible
pour cet export, donc recréation directe depuis les captures plutôt
qu'un export Figma).

### Icônes utilitaires → correspondance Phosphor directe
| Icône observée | Composant Phosphor |
|---|---|
| Flèche retour (‹) | `ArrowLeft` |
| Fermeture (X) | `X` |
| Chevron simple (›) | `CaretRight` |
| Chevron accordéon (haut/bas) | `CaretDown` / `CaretUp` |
| Œil (afficher/masquer mot de passe) | `Eye` / `EyeSlash` |
| Profil / compte | `UserCircle` |
| Réglages | `Gear` |
| Cloche notifications | `Bell` |
| "+" (créer un but) | `Plus` |
| Info "i" | `Info` |
| Bouclier "Low balance protection" | `ShieldCheck` |
| "?" aide (Invite friends) | `Question` |
| Flèche de transaction reçue | `ArrowDown` |
| Flèche de navigation carte (Set & Save →) | `ArrowRight` |
| Coche (checkbox, succès) | `Check` |
| Banque générique (remplace le logo tiers Bank of America) | `Bank` |

### Icônes/illustrations sans équivalent Phosphor fidèle → à recréer en SVG à la main
Ces éléments portent un style illustratif propre à la marque (formes plates,
2-3 couleurs) que les icônes en traits de Phosphor ne rendraient pas
fidèlement ; recréation SVG directe à partir des couleurs déjà échantillonnées :
- Icône de marque Set & Save (fleur-pièce, fond pêche `#ffc6ac`)
- Icônes de but (parapluie "Rainy Day", nuage-éclair "Emergency cushion",
  téléphone, maison, ampoule, voiture, crayon "créer un but personnalisé")
- Icône Face ID (scan, fond pêche) — pas d'équivalent Phosphor exact
- Icônes de fonctionnalités Subscription (tirelire, document $, banque
  illustrée, cadenas, plante+pièce, main+téléphone)
- Icônes de la section "Plus de fonctionnalités" (jauge de crédit, tirelire, lettre "ñ")
- Icône succès transfert (feuille/sparkle vert)
- Confetti / party-popper (upsell plan annuel)

## Breakpoints & mise en page responsive

Le design source est une app iOS (largeur logique ~390–430px). Décision
prise en l'absence d'indication contraire dans les captures : sur viewport
≥768px, centrer le contenu dans un cadre de largeur mobile (`max-w-[430px]`)
avec un fond neutre autour, plutôt que d'étirer les mises en page en pleine
largeur desktop. Vérifier ce choix aux breakpoints 375 / 768 / 1440px lors de
la construction des pages ; à valider avec l'utilisateur si le rendu déplaît.
