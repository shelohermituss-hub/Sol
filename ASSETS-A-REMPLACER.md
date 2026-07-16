# ASSETS-A-REMPLACER.md

Suivi des visuels qui ne sont **pas** des originaux Oportun et qui devront
être remplacés par les fichiers sources réels avant toute mise en production.

## Logo

| Asset | Origine | Statut |
|---|---|---|
| `public/logos/oportun-wordmark.png` | Recadré depuis `design-refs/Oportun_iOS_Onboarding/Oportun iOS Onboarding 0.png` (écran splash, plus net) | ⚠️ Recadrage écran — remplacer par le fichier vectoriel officiel (SVG/EPS) dès qu'il est disponible |
| `public/logos/oportun-icon-mark.png` | Recadré depuis la même capture (glyphe "O" isolé) | ⚠️ Idem — utile en attendant comme favicon/icône d'app |

## Marques tierces (à ne pas recréer, uniquement des placeholders génériques prévus)

| Élément vu dans les captures | Décision |
|---|---|
| Logo Bank of America (icône rouge/bleu sur les lignes de compte connecté) | Remplacé par une icône générique "banque" (Phosphor `Bank`), neutre en couleur. Ne pas reproduire la marque déposée d'un tiers sans autorisation. |
| Badge "BBB A+ Rating" (écran Subscription) | Non recréé — laissé en placeholder texte/icône générique. Le vrai badge officiel BBB devra être fourni par Oportun. |
| Badge ruban "#1 savings app · As rated by Bankrate" | Idem — placeholder générique, à remplacer par l'asset officiel. |

## Illustrations générées par IA (Higgsfield / Recraft V4.1, vector)

Validation groupée effectuée avec l'utilisateur avant génération (4 visuels,
~2,5 crédits chacun). Palette de chaque prompt restreinte aux couleurs
exactes de `design-tokens.md`.

| Écran source (capture) | Visuel généré | Statut |
|---|---|---|
| `Oportun_iOS_Onboarding/Oportun iOS Onboarding 1.png` (héro "Reach for your goals effortlessly") | `public/images/illustrations/hero-reach-your-goals.svg` | ✅ généré, à valider visuellement en contexte page |
| `Oportun_iOS_Completing_account_setup/Oportun iOS Completing account setup 5.png` (écran de transition pédagogique) | `public/images/illustrations/educational-transition.svg` | ✅ généré, à valider en contexte |
| `Oportun_iOS_Home/Oportun iOS Home 3.png` (carte parrainage "Share Oportun & score a $5 bonus") | `public/images/illustrations/referral-bonus.svg` | ✅ généré, à valider en contexte |
| `Oportun_iOS_Invite_friends/Oportun iOS Invite friends 1.png` (héro parrainage, groupe de personnes) | `public/images/illustrations/invite-friends-hero.svg` | ✅ généré, à valider en contexte |

Icônes de petite taille (fleur-pièce Set & Save, icônes de but, badges de
fonctionnalités, icône Face ID, icônes Subscription/More from Oportun) : non
générées par IA, seront recréées à la main en SVG lors de la construction
des composants (Étape 4), cf. `design-tokens.md` section Icônes.
