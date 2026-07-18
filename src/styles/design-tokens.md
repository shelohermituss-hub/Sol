# Design Tokens — reskin Cash App (`design-refs/`)

> Étape 2 du reskin (voir `INVENTAIRE.md`). Les captures sources sont des
> écrans réels Cash App (Block, Inc.) — voir l'avertissement en tête de
> `INVENTAIRE.md`. On reprend le **langage visuel** (structure, échelle,
> types de composants) mais PAS la palette de marque exacte : le vert
> Cash App (`#00D632` env.) est la couleur d'identité d'un produit fintech
> concurrent réel et actif ; le reproduire à l'identique comme couleur de
> marque principale de Sòlid créerait une confusion de marque évitable.
>
> **Décision de palette** : accent inspiré du drapeau haïtien (bleu/rouge)
> plutôt que du vert Cash App — cohérent avec un produit pensé pour Haïti,
> visuellement distinct d'un concurrent réel.

## Couleurs

### Neutres (structure — reprise du langage Cash App)
| Token | Valeur | Usage observé |
|---|---|---|
| `--color-ink` | `#0a0a0a` | Titres, texte principal, icônes actives |
| `--color-paper` | `#ffffff` | Fond des cards, bottom sheets |
| `--color-canvas` | `#f2f2f2` | Fond de page (le Home Cash App n'est pas blanc pur mais gris très clair) |
| `--color-neutral-200` | `#e5e5e5` | Bordures, séparateurs de liste |
| `--color-neutral-500` | `#6b6b6b` | Texte secondaire, placeholder |

### Marque (palette Sòlid, distincte de Cash App)
| Token | Valeur | Usage |
|---|---|---|
| `--color-brand-primary` | `#00209f` | CTA principal, tab actif, liens, montant héros sur fond coloré |
| `--color-brand-primary-tint` | `#e6ecfb` | Fond des bandeaux d'info (ex. invitation) |
| `--color-brand-accent` | `#d21034` | Accent secondaire (promo, badges, alertes non destructives) |
| `--color-success` | `#1f9d55` | Confirmation, coché, écran succès (vert volontairement différent du vert Cash App) |

Ces deux couleurs reprennent les teintes du drapeau haïtien — signal
d'identité locale pertinent pour Sòlid, sans copier la marque d'un
concurrent.

### Constat
Aucun rouge destructif observé dans les captures sources ; `--color-brand-accent`
sert aux accents non destructifs (promo, highlight). Pas de token
`--destructive` distinct tant qu'aucun écran d'erreur réel n'en montre un
(reprend `--color-ink`, comme avant le reskin).

## Typographie

Inchangé par rapport à l'implémentation précédente (pas de rapport avec
la marque Cash App — Cash App utilise une police propriétaire "Cash Sans"
non reproduite) :
- **Titres** : Poppins (500/600/700)
- **Corps/labels** : Inter
- Chargées via `next/font/google`, voir `src/app/layout.tsx`.

### Échelle
| Usage | Taille | Graisse |
|---|---|---|
| Titre de page (H1) | 28–32px | Bold (700) |
| Montant héros (clavier plein écran) | 48–56px | Bold (700) |
| Corps / body | 16–17px | Regular (400) |
| Labels / eyebrow | 13–14px | Regular (400) |
| Boutons | 17px | Semibold/Bold (600–700) |

## Espacements & rayons

Échelle 4/8px standard, cohérente avec les captures (marge de page ≈ 16–24px).

| Token | Valeur | Usage |
|---|---|---|
| `--radius-input` | `14px` | Champs de saisie |
| `--radius-card` | `20px` | Cards (plus arrondi que la version Oportun — pattern Cash App) |
| `--radius-sheet` | `24px` | Coins hauts des bottom sheets |
| `--radius-full` | `9999px` | Boutons pill, badges |

Hauteur de bouton pill : ~56px.

## Composants récurrents

Voir `INVENTAIRE.md` pour la liste complète et le mapping vers les pages
existantes. Composants `src/components/ui/` à reconstruire dans ce style :
`button` (pill), `card`, `list-row`, `numeric-keypad` (variante plein écran
fond `--color-brand-primary` + variante fond blanc), `sheet` (bottom sheet,
poignée grise, pas de bouton "X" sauf écrans plein écran), `segmented-control`
(filter chips), `step-progress`, `slider`, `switch`, `checkbox`,
`radio-group`, `badge`, `text-field`, `otp-input`.

## Icônes

Stratégie inchangée : `@phosphor-icons/react` en priorité, recréation SVG
à la main si aucune correspondance fidèle. Ne jamais utiliser une icône
générée par IA (résultat flou/incohérent, voir consigne du prompt reskin).

## Breakpoints & mise en page responsive

Inchangé : cadre mobile `max-w-[430px]` centré sur desktop, fond neutre
autour. À vérifier à 375 / 768 / 1440px lors de la construction des pages.
