# Design Tokens — Oportun (extraits des screenshots `design-refs/`)

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
| `--color-ink` | `#000000` | Titres, texte principal, boutons primaires, icônes actives, tab bar actif |
| `--color-paper` | `#ffffff` | Fond de toutes les pages |
| `--color-neutral-200` | `#e5e5e5` | Bordures d'input, séparateurs de liste, contour des icônes circulaires, fond des boutons désactivés |
| `--color-neutral-500` | `#6b6b6b` | Texte secondaire, placeholder, sous-titres gris (mesuré ~#555-#5a5a5a en cœur de glyphe, arrondi à une valeur standard) |

### Marque
| Token | Valeur | Usage observé |
|---|---|---|
| `--color-brand-green` | `#0b9b3c` | Liens ("Cancel", "Change", "Resend", mentions légales), case à cocher cochée, icône succès transfert |
| `--color-brand-blue` | `#009adc` | Badge "NEW", icône "i" du bandeau d'information abonnement |
| `--color-brand-blue-tint` | `#e6f5fb` | Fond du bandeau info ("Your monthly plan will start…"), fond de la carte upsell annuelle |
| `--color-accent-peach` | `#ffc6ac` | Fond de l'icône de marque Set & Save (fleur-pièce) |
| `--color-accent-mint` | `#e7f9ec` | Fond des badges d'icônes de fonctionnalités (paywall Set & Save) |

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

**Diagnostic visuel** (aucun fichier de police fourni) :
- **Titres (bold/semibold)** : sans-serif géométrique à empattements arrondis,
  "o" parfaitement circulaires, "g" bas-de-casse à boucle ouverte simple
  (visible sur "goals"), très proche de **Poppins**. Le wordmark du logo
  splash ("Oportun") est composé dans cette même famille.
- **Corps de texte / labels** : sans-serif plus neutre/humaniste, proportions
  moins géométriques que les titres — proche de **Inter**.
- Chargées via `next/font/google` (Poppins pour les titres, Inter pour le
  corps), voir `src/app/layout.tsx`.
- ⚠️ Si un brand book Oportun officiel est fourni par la suite, comparer et
  remplacer si la police exacte diffère.

### Échelle
| Usage | Taille | Graisse |
|---|---|---|
| Titre de page (H1) | 28–32px | Bold (700) |
| Montant héros (écran saisie de montant) | 48–56px | Bold (700) |
| Corps / body | 16–17px | Regular (400) |
| Labels / eyebrow ("Step 1 of 2", labels de champ) | 13–14px | Regular (400) |
| Boutons | 17px | Semibold/Bold (600–700) |

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

## Composants récurrents

Voir `INVENTAIRE.md` section 2 pour la liste complète (bouton primaire/
secondaire, input, OTP, checkbox, toggle, list row, card, bottom sheet,
badge "NEW", bandeau succès, tab bar, etc.) — base pour les composants
`src/components/ui/`.

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
- Icônes "More from Oportun" (jauge de crédit, tirelire, lettre "ñ")
- Icône succès transfert (feuille/sparkle vert)
- Confetti / party-popper (upsell plan annuel)

## Breakpoints & mise en page responsive

Le design source est une app iOS (largeur logique ~390–430px). Décision
prise en l'absence d'indication contraire dans les captures : sur viewport
≥768px, centrer le contenu dans un cadre de largeur mobile (`max-w-[430px]`)
avec un fond neutre autour, plutôt que d'étirer les mises en page en pleine
largeur desktop. Vérifier ce choix aux breakpoints 375 / 768 / 1440px lors de
la construction des pages ; à valider avec l'utilisateur si le rendu déplaît.
