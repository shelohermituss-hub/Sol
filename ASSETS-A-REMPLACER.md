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

## Reskin Dart (app 2) — illustrations en attente de génération

Écrans construits sous `/dart` avec des placeholders (icône Phosphor en
badge circulaire, mêmes tokens que l'app 1) en lieu et place de ces
illustrations, le temps de la validation groupée des prompts avant
génération Higgsfield — cf. `FONCTIONNEL.md`, Étape 2.

| Écran source (capture app-cible/) | Remplace | Statut |
|---|---|---|
| `Onboarding.png` (héro "Welcome to Dart", main + pièces) | `HandCoins` en badge pêche sur `/dart/welcome` | ⬜ en attente de validation des prompts |
| `Circles.png` (personnage tirelire, état vide "Your active circles") | Carte texte seule (pas d'illustration, pattern "No auto saves" déjà en place côté app 1) | ⬜ à confirmer si une illustration est vraiment souhaitée ici |
| `Payment.png` (personnage poches vides, état vide) | `Wallet` en badge neutre sur `/dart/payment` | ⬜ en attente |
| `Payment History(Empty).png` | `ClockCounterClockwise` en badge neutre | ⬜ en attente |
| `Payment/Payment Settings/Saved Cards(Empty).png` | `Wallet` en badge neutre | ⬜ en attente |
| `Profile/Invite Friends/Track Invitiations.png` (illustration invitees vide) | Carte texte seule | ⬜ à confirmer |

Prompts proposés (mêmes contraintes que les 4 visuels Oportun déjà validés :
style plat vectoriel, palette strictement limitée aux tokens de
`design-tokens.md` — ink/paper/neutral/brand-green/brand-blue/accent-peach/
accent-mint/palette d'illustration corail-lavande-menthe-bleu ciel-violet,
jamais le bleu marque de l'app 2) :

1. **Hero "Welcome to Dart"** : "Flat vector illustration, a hand gently
   offering three gold coins to another open hand, warm and optimistic
   mood, [palette tokens app 1], no outlines, soft geometric shapes,
   matching the style of hero-reach-your-goals.svg"
2. **État vide "Circles"** : "Flat vector illustration, a person looking
   curiously into an empty basket, friendly and simple, [palette tokens
   app 1]"
3. **État vide "Payment"** : "Flat vector illustration, a person with empty
   pockets shown turned out, lighthearted mood, [palette tokens app 1]"

**En attente de ta validation de ces 3 prompts avant génération** (les 3
autres lignes du tableau ci-dessus resteront en carte texte simple, pas
d'illustration nécessaire — cohérent avec le pattern déjà en place côté
app 1 pour les états vides sans visuel).
