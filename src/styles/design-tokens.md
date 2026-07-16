# Design Tokens — Cash App (reproduction)

Source : screenshots de référence dans `design-refs/` (pixel-picking programmatique,
Python/Pillow) + Figma (`iOPJoJTAYINs7qy4xcn1fs`, node `4-6`, page "Transactions").

> ⚠️ **Statut** : le MCP Figma a atteint son quota (plan Starter) pendant l'audit.
> Les valeurs ci-dessous viennent donc du **sondage pixel exact des screenshots**
> (source de vérité valide selon `CLAUDE.md` : "info manquante dans le Figma →
> vérifier les screenshots"). À re-valider contre les variables Figma dès que le
> quota MCP est disponible (`get_variable_defs` sur les frames citées) — voir
> Phase 1 du plan.

## Couleurs

### Neutres
| Token | Valeur | Usage |
|---|---|---|
| `--color-bg-page` | `#F4F4F4` | Fond des écrans Home/Money, Pay (mode clair) |
| `--color-bg-card` | `#FCFCFC` | Fond des cards blanches, champs de saisie |
| `--color-bg-page-alt` | `#F0F0F0` | Fond alterné (nav bar, séparateurs) |
| `--color-border-input` | `#949494` | Bordure des champs de formulaire |
| `--color-text-primary` | `#000000` / `#181818` | Titres, texte principal |
| `--color-text-secondary` | `#686868` | Texte secondaire, aide, placeholders |
| `--color-disabled-bg` | `#B0B0B0` | Bouton pill désactivé |
| `--color-pill-secondary-bg` | `#E8E8E8` | Bouton pill secondaire (ex. "Use Email", "Skip") |

### Marque / accents
| Token | Valeur | Usage |
|---|---|---|
| `--color-brand-green` | `#00E010` (splash) / `#00D450` (CTA pill) / `#00B440` (fond plein écran Pay) | Couleur signature Cash App — 3 nuances selon contexte (splash vs bouton vs fond) |
| `--color-cta-black` | `#000000` | **CTA par défaut retenu** pour tout le flow Onboarding (module 1 + écrans additionnels du module 2). Le CTA vert du module 2 (`02-onboarding-kyc-variant/`) est un thème alternatif, non retenu — conservé en référence uniquement. |
| `--color-accent-card-lime` | `#BCE828` / `#CCFC2C` | Carte Cash App Card (illustration + bannière promo) |
| `--color-accent-blue` | `#2C64D8` (bouton) / `#60D0F8`–`#4CA4F8` (illustration Bitcoin) | Actions liées à Bitcoin / vérification d'identité |
| `--color-accent-purple` | `#8420F4` | Actions liées aux Stocks ("Buy stocks", graphe Invest) |
| `--color-accent-orange` | à revalider (Figma / screenshot `02-onboarding-kyc-variant/buy-stock-scheduled-order.png`) | Ordre d'achat programmé (Schedule) |
| `--color-savings-green` | `#7CCC60` | Icône Savings (accent plus doux que le vert de marque) |

> Note : Cash App n'utilise **pas** une seule couleur de marque partout — le vert
> est la couleur "cash" par défaut, mais chaque module financier (Bitcoin, Stocks,
> ordres programmés) a son propre accent. Respecter cette convention plutôt que
> de tout forcer en vert.

## Typographie
- Police système par défaut observée sur les screenshots (rendu SF Pro / système
  iOS). À confirmer via Figma (`get_variable_defs` / inspection des `text` nodes)
  avant de charger une police custom via `next/font`.
- Titres d'écran ("Enter your phone or email", "What's your legal name?") :
  **bold, grande taille** (~28–34px équivalent), noir.
- Corps de texte / labels : regular, gris (`--color-text-secondary`).
- Montants (`$0.00`, `$1.00`) : **bold**, très grande taille, chasse serrée.
- Liens ("Need help logging in?", "Sync contacts") : soulignés, même poids que le
  texte environnant.

## Espacements & rayons
- Boutons pill : **rayon total** (`border-radius: 999px` / `rounded-full`).
- Cards (Money home, Account) : rayon large (~20–24px), pas de bordure, ombre quasi
  nulle (séparation par contraste de fond `#F4F4F4` vs `#FCFCFC`).
- Marge horizontale de page constante sur tous les écrans d'onboarding (~24px en
  équivalent desktop 1284px de large → à convertir en rem une fois le viewport
  mobile de référence fixé).
- Boutons CTA en bas d'écran : ancrés au bas du safe-area, pleine largeur ou en
  paire (2 boutons côte à côte avec gap régulier).

## Composants récurrents identifiés
- **Pill button** (2 variantes) : primaire (fond plein, texte blanc) / secondaire
  (fond gris clair `#E8E8E8`, texte noir) / désactivé (fond `#B0B0B0`, texte blanc
  pâle).
- **Text input** : bordure fine grise, fond blanc, pas de label flottant — le
  placeholder disparaît à la saisie (sauf formulaires avec label au-dessus, ex.
  "Debit Card Number").
- **PIN dots** : 4 cercles, vide = contour gris, rempli = disque noir.
- **Bottom sheet** (Add Cash, Buy stock) : coins arrondis en haut, poignée
  ("grabber") centrée, fond blanc sur overlay assombri.
- **Numeric keypad** plein écran : 3 colonnes × 4 rangées, fond différent selon
  contexte (blanc pour Add Cash, vert plein `#00B440` pour Pay).
- **Success screen** : icône check dans un cercle (vert), titre bold centré,
  variante avec carte d'upsell en dessous (ex. Direct Deposit).
- **List row** (Account & Settings) : icône à gauche, label, chevron/switch à
  droite, séparateur fin `#F0F0F0`.

## Icônes
Depuis l'audit du 16/07 : **`@phosphor-icons/react`** (import depuis
`@phosphor-icons/react/ssr`), qui remplace les SVG faits main utilisés
initialement. Exception documentée : `src/app/icon.tsx` (favicon généré via
`ImageResponse`/Satori) garde des hex en dur (`#000000`, `#00E010`) — ce
runtime ne peut pas lire les variables CSS de `globals.css`.

## Tokens ajoutés lors de l'audit (16/07)
| Token | Valeur | Usage |
|---|---|---|
| `--color-error` | `#E0463C` | Texte "Sign Out" |
| `--color-badge-bg` | `#DFF7E6` | Fond badge "New" (Favorites) |
| `--color-category-banking` | `#C1622D` | Carte catégorie "Banking & Finance" |
| `--color-category-business` | `#C79A5B` | Carte catégorie "Business Services" |

## À faire en Phase 1 (exécution)
1. Reprendre `get_variable_defs` / `get_design_context` sur les frames Figma dès
   que le quota MCP est rétabli, pour confirmer/affiner les hex et récupérer les
   valeurs exactes de typographie (familles, tailles, line-heights) et
   d'espacement (grille en px Figma).
2. Convertir ces tokens en variables Tailwind (`tailwind.config`) — aucune valeur
   hex en dur dans les composants, conformément à `CLAUDE.md`.
3. Confirmer la police exacte (SF Pro n'est pas licenciable pour le web — prévoir
   un remplacement proche via `next/font`, ex. Inter/SF-like, sauf indication
   contraire de l'utilisateur).
