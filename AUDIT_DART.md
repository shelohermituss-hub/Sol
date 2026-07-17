# AUDIT_DART.md — Audit du repo Sol, focus reskin Dart

Audit en lecture seule, réalisé le 17/07. Aucun fichier autre que celui-ci
n'a été modifié.

---

## 1. Stack réelle et usage effectif de shadcn/ui

### Stack confirmée (`package.json`)
- **Next.js 16.2.10** (App Router, `src/app/`), **React 19.2.4**, **TypeScript strict**.
- **Tailwind CSS v4** (`@tailwindcss/postcss`), tokens personnalisés dans
  `src/app/globals.css` / documentés dans `src/styles/design-tokens.md` —
  pas de fichier `tailwind.config` classique (config CSS-first v4).
- **`@base-ui/react` (^1.6.0)** : c'est la véritable fondation headless du
  projet (primitives Button, Checkbox, RadioGroup, Switch, Accordion,
  Dialog, Tabs, Slider, Input). **Aucun `@radix-ui/*` n'est présent dans
  `package.json`** — ce n'est donc pas le shadcn/ui "classique" basé sur
  Radix.
- **`@phosphor-icons/react` (^2.1.10)** : unique pack d'icônes, aucun
  autre (pas de lucide-react, pas de heroicons malgré ce qu'un README
  générique pourrait laisser penser).
- `class-variance-authority`, `clsx`, `tailwind-merge` : utilitaires de
  variantes/classes, standards avec ce type de stack.
- `shadcn` (^4.13.0) est présent en dépendance — c'est la **CLI**, pas un
  paquet de composants prêts à l'emploi.

### Ce que révèle `components.json`
```json
{
  "style": "base-nova",
  "iconLibrary": "phosphor",
  "registries": {}
}
```
Le style choisi est **"base-nova"**, une variante du registre shadcn qui
génère des composants sur `@base-ui/react` (et non Radix). `registries`
est vide : aucun registre tiers custom n'est branché, uniquement le
registre shadcn par défaut en mode base-ui.

### Composants dans `src/components/ui/` (19 fichiers) — origine réelle
**Scaffoldés par la CLI shadcn puis personnalisés** (wrappent directement
une primitive `@base-ui/react/*`) :
`accordion.tsx`, `badge.tsx`, `button.tsx`, `checkbox.tsx`, `input.tsx`,
`radio-group.tsx`, `segmented-control.tsx` (sur `Tabs`), `sheet.tsx` (sur
`Dialog`), `slider.tsx`, `switch.tsx`.
→ Personnalisation constatée : variantes CVA propres au projet (ex.
`buttonVariants` avec `disabled:`/`aria-disabled:` dupliqués pour gérer le
rendu `<Link>`), tokens de couleur maison, pas de logique métier.

**Recréés entièrement à la main, sans lien avec un registre shadcn**
(pas de primitive `@base-ui/react` importée, ou composant assemblé
sur-mesure à partir de plusieurs primitives) :
`card.tsx`, `date-wheel-picker.tsx`, `label.tsx`, `list-row.tsx`,
`numeric-keypad.tsx`, `otp-input.tsx`, `step-progress.tsx`,
`success-banner.tsx`, `text-field.tsx`.
→ Ce sont des composites propres à l'app (ex. `ListRow` = icône + titre +
sous-titre + trailing + chevron + statut, utilisé partout ; `OtpInput`,
`NumericKeypad`, `DateWheelPicker`, `StepProgress` n'existent dans aucun
registre shadcn public — ils ont été construits pour reproduire des
patterns vus dans les captures Figma/screenshots).

**Conclusion section 1** : shadcn/ui n'est utilisé que comme **outil de
scaffolding initial** pour ~10 primitives de base (bouton, case à cocher,
switch, etc.), toutes réécrites avec les tokens du projet. La moitié du
dossier `ui/` est **du code custom sans rapport avec un registre**, conçu
spécifiquement pour les écrans de cette app. Aucun composant n'est utilisé
"tel quel" depuis un registre externe.

---

## 2. Liste des 28 écrans Dart — classification COQUILLE / CONTENU TONTINE

| # | Chemin | Classification | Note |
|---|---|---|---|
| 1 | `/dart` | **COQUILLE** | Splash auto-redirect, aucun contenu métier |
| 2 | `/dart/welcome` | **COQUILLE*** | Structure héro pure ; *texte de marque à neutraliser (§4) |
| 3 | `/dart/signup` | **COQUILLE*** | Formulaire générique email/tel ; *texte de marque (§4) |
| 4 | `/dart/signup/verify-otp` | **COQUILLE** | OTP générique, zéro contenu tontine |
| 5 | `/dart/home` | **CONTENU TONTINE** | Cercles recommandés, bannière offres, catégories |
| 6 | `/dart/circles` | **CONTENU TONTINE** | Données de cercles (montants, mensualités) |
| 7 | `/dart/join` | **CONTENU TONTINE** | Termes "Game'ya"/"Saving Program", montants max |
| 8 | `/dart/join/game-ya` (Payout Amount) | **CONTENU TONTINE** | Slider 3 000–120 000 MAD |
| 9 | `/dart/join/game-ya/monthly-pay-in` | **CONTENU TONTINE** | 3 paliers de mensualité en MAD |
| 10 | `/dart/join/game-ya/slot` | **CONTENU TONTINE** | Créneaux, mois, frais/remises |
| 11 | `/dart/join/game-ya/review` | **CONTENU TONTINE (léger)** | Labels génériques, montants/devise |
| 12 | `/dart/join/saving-program` | **CONTENU TONTINE** | 6 paliers d'épargne, durées, cashback |
| 13 | `/dart/join/saving-program/review` | **CONTENU TONTINE (léger)** | Labels génériques, montants/devise |
| 14 | `/dart/payout-method` | **CONTENU TONTINE** | Fawry (Égypte), limite carte en MAD |
| 15 | `/dart/payment` (hub) | **COQUILLE*** | Layout état vide + grille ; *"Circle" terminologie |
| 16 | `/dart/payment/eligibility` | **CONTENU TONTINE** | Checklist réglementaire spécifique Maroc |
| 17 | `/dart/payment/history` | **CONTENU TONTINE (données démo)** | Transactions démo en MAD |
| 18 | `/dart/payment/settings` | **COQUILLE** | Terminologie pay-in/payout générique |
| 19 | `/dart/payment/settings/saved-cards` | **COQUILLE (données démo)** | Cartes démo, pas de logo de marque |
| 20 | `/dart/payment/settings/saved-cards/add` | **COQUILLE** | Formulaire générique |
| 21 | `/dart/profile` | **CONTENU TONTINE** | Identité factice, limite en MAD, langue AR |
| 22 | `/dart/profile/personal-info` | **CONTENU TONTINE** | Identité factice marocaine |
| 23 | `/dart/profile/documents` | **CONTENU TONTINE** | Types de documents spécifiques Maroc |
| 24 | `/dart/profile/documents/scan-id` | **CONTENU TONTINE** | Mention "Central Bank" + "Game'ya" |
| 25 | `/dart/profile/documents/proof-of-income` | **COQUILLE** | HR Letter / Bank Statement, générique |
| 26 | `/dart/profile/documents/.../monthly-income` | **COQUILLE*** | Clavier + montant ; *suffixe "MAD" en dur |
| 27 | `/dart/profile/documents/.../upload-hr-letter` | **COQUILLE** | Instructions génériques |
| 28 | `/dart/profile/invite-friends` | **CONTENU TONTINE** | Montant 150 MAD, terme "Game'ya" |

**Bilan** : 9 écrans COQUILLE (dont 3 avec astérisque = presque pures mais
avec un point de texte à neutraliser), 3 écrans COQUILLE à données de
démo neutres (cartes/paiements factices, remplaçables sans risque), **16
écrans classés CONTENU TONTINE** nécessitant une réécriture de fond.

**Composants transverses COQUILLE** (jamais à toucher niveau structure) :
`DartHeader`, `DartTabBar`, `NavHeader`/`NavBackButton`, `Sheet`,
`StepProgress`, `Slider`, `SegmentedControl`, `ListRow`, `Card`, `Button`,
`TextField`, `RadioGroup`, `Switch`, `Badge`, `CircleCard` (la mise en
page — pas les données qu'elle reçoit), `CategoryCard`, `PromoCarousel`.

---

## 3. Détail des éléments à changer par écran CONTENU TONTINE

Format : élément actuel → nature du changement attendu. **La mise en page
qui les contient reste strictement inchangée** (mêmes composants, mêmes
classes Tailwind, même hiérarchie visuelle).

### 5. `/dart/home` — `src/app/dart/home/page.tsx` + `src/lib/dart-data.ts` (`RECOMMENDED_CIRCLES`)
- `RECOMMENDED_CIRCLES[0]` : `amount: 24000`, `monthly: 2000`,
  `totalMonths: 12`, `adminFees: 2880`, `startLabel: "Nov, 2024"`,
  `endLabel: "Oct, 2025"` → montants/devise/dates à adapter au marché
  haïtien (HTG).
- Bannière "Check Out Our LATEST OFFERS" (texte statique en dur dans le
  JSX) → contenu promo à redéfinir.
- Bannière parrainage "150 USD discount" → montant/devise.
- `CategoryCard` "Savings — 20% Cashback" et **"Ramadan — Upto 25%
  Discount"** → la référence au Ramadan est culturellement spécifique au
  Maroc/marché musulman, à remplacer par des catégories pertinentes pour
  Haïti.

### 6. `/dart/circles` — mêmes données que #5 (`RECOMMENDED_CIRCLES`, `INITIAL_JOINED_CIRCLES` dans `dart-data.ts`)
- `INITIAL_JOINED_CIRCLES[0]` : mêmes champs que ci-dessus (14 000 MAD,
  1 400/mois, etc.) → à adapter.

### 7. `/dart/join` — `src/app/dart/join/page.tsx`
- Titre "Join a Game'ya" / description "Select your preferred slot and
  choose any payout amount to **120,000 MAD**" → **"Game'ya" est un terme
  darija marocain pour tontine** ; à remplacer par la terminologie du
  produit local (ex. "Sòl" est le terme créole haïtien courant pour ce
  type de tontine — à valider avec le métier). Montant max à convertir.
- "Join Saving Program" / "Save in installments up to **1,000,000 MAD**,
  receive it at the end of the chosen duration with up **20% cashback**"
  → montant max et taux de cashback à revalider pour le marché cible.

### 8. `/dart/join/game-ya` (Payout Amount) — `src/app/dart/join/game-ya/page.tsx`
- `MIN_AMOUNT = 3000`, `MAX_AMOUNT = 120000`, `step = 1000` (constantes
  en tête de fichier) → bornes et pas du slider à redéfinir en HTG.
- Suffixe `" MAD"` affiché à 3 endroits (valeur courante + bornes
  min/max) → devise à changer.
- Texte de la carte info "Payout Amount... automatically deducted from
  your circle amount" → générique, à revoir seulement si la mécanique de
  déduction change.

### 9. `/dart/join/game-ya/monthly-pay-in` — `src/lib/dart-data.ts` (`MONTHLY_PAYIN_OPTIONS`)
- `[{monthly: 5000, months: 6}, {monthly: 3000, months: 10}, {monthly: 2500, months: 12}]`
  → 3 paliers de mensualité à redéfinir en HTG et selon la durée réelle
  du produit visé.
- Suffixe `" MAD"` à 2 endroits dans le fichier page.

### 10. `/dart/join/game-ya/slot` — `src/lib/dart-data.ts` (`SLOT_OPTIONS`, `SLOT_DATES`)
- `SLOT_OPTIONS` : labels "Fastest Payout"/"Lowest Fees"/"Highest Return"
  avec plages de mois en dur ("First slots (from November to
  December)", "Middle slots (from January to February)", "Last slots
  (from March to April)") → cycle de tontine à redéfinir (durée du
  cercle, nombre de créneaux, mois réels).
- `SLOT_DATES` : dates/frais/remises par créneau (ex. `march`: 2400 MAD
  fees, `april`: zeroFees + 1200 MAD discount) → **rappel : seules les
  dates "highest-return" sont sourcées d'une vraie capture, "fastest" et
  "lowest-fees" sont déjà des valeurs extrapolées côté Dart lui-même** —
  toute la table est à reconstruire pour le nouveau produit, pas juste
  traduite.
- Suffixes `" MAD Fees"` / `" MAD Discount"` (2 occurrences dans
  `slot/page.tsx`).
- Texte "Admin Fees are split equally over your pay-in until your payout
  month" → générique, à revalider selon le vrai mécanisme de frais.

### 11. `/dart/join/game-ya/review` — `src/app/dart/join/game-ya/review/page.tsx`
- Labels "Circle amount" / "Monthly pay-in" / "Slot" → terminologie
  "Circle" à harmoniser avec le nom retenu pour le produit.
- 2 suffixes `" MAD"`.
- Calcul `adminFees: Math.round(amount * 0.096)` (9,6 % codé en dur) →
  taux à revalider.
- Texte légal "By tapping Confirm, I authorize the recurring monthly
  pay-in for this circle" → à faire valider juridiquement pour Haïti.
- **Rappel** : cet écran n'existe dans aucune capture source, il a été
  construit par analogie — sa réécriture de contenu peut se faire librement,
  aucune fidélité à préserver.

### 12. `/dart/join/saving-program` — `src/lib/dart-data.ts` (`SAVING_TIERS`, `SAVING_DURATIONS`) + `src/app/dart/join/saving-program/page.tsx`
- `SAVING_TIERS` : 6 paliers "LITE SAVER" (3 000/600), "BRONZE SAVER"
  (6 000/1 200), "SILVER SAVER" ×3 (12 000/2 400, 60 000/12 000,
  100 000/20 000), "GOLD SAVER" (30 000/6 000) → montants, libellés et
  taux de cashback (20 % constant) à redéfinir.
- `SAVING_DURATIONS` : 6/12/24 mois avec mensualité associée (500/250/125
  MAD) → à recalculer pour les nouveaux montants.
- `START_MONTH = 10` / `START_YEAR = 2024` (constantes en tête de
  fichier, base du calcul de date de payout) → date de référence à mettre
  à jour (le calcul devient faux avec le temps de toute façon, à
  reconsidérer indépendamment de la tontine).
- Titre "Get cashback on monthly savings" → à revoir si le mécanisme de
  cashback change.
- 4 suffixes `" MAD"` dans `page.tsx`.

### 13. `/dart/join/saving-program/review` — `src/app/dart/join/saving-program/review/page.tsx`
- Labels "Saving amount" / "Cashback" + 3 suffixes `" MAD"`.
- **Rappel** : écran construit par analogie, pas de capture source, liberté totale sur le contenu.

### 14. `/dart/payout-method` — `src/lib/dart-data.ts` (`PAYOUT_METHODS`)
- `PAYOUT_METHODS` : "Digital Wallets" (générique, OK), "Prepaid Card"
  ("Card limit is **100,000 MAD**", badge "No Charge"), "Bank Transfer"
  (badge "No Charge"), **"Fawry"** ("Receive your payout from any of
  Fawry Plus stores without bank account", `available: false`) → **Fawry
  est un réseau de paiement cash égyptien, sans aucune pertinence pour
  Haïti** : à remplacer par un moyen local réel (ex. point Sogebank,
  Unibank, MonCash, NatCash, ou à retirer si non pertinent). Limite de
  carte à convertir.
- Icône `Globe` associée à Fawry (dans `payout-method/page.tsx`,
  `METHOD_ICONS`) → à réassigner selon la nouvelle méthode.

### 16. `/dart/payment/eligibility` — `src/lib/dart-data.ts` (`ELIGIBILITY_ITEMS`)
- "National ID" (OK, concept universel — devient CIN/NIF haïtien).
- **"Insurance Note"** ("You will need to sign the Insurance Note
  first...") → exigence à vérifier : peut être spécifique à la
  réglementation marocaine du produit source, à valider si applicable en
  Haïti ou à retirer.
- "Payout Method Selected", "Contract" → génériques, transférables.
- Toute la checklist doit être revalidée avec le service juridique/conformité
  pour le cadre réglementaire haïtien réel (BRH).

### 17. `/dart/payment/history` — `src/lib/dart-data.ts` (`PAYMENT_TRANSACTIONS`)
- 6 transactions démo (4 paiements 3 000–4 500 MAD sur août-novembre, 2
  payouts 30 000/4 000 MAD) → données factices, à régénérer en HTG avec
  des dates/montants représentatifs (risque faible, ce sont des données
  de démonstration déconnectées de toute logique).

### 19. `/dart/payment/settings/saved-cards` — `src/lib/dart-data.ts` (`INITIAL_SAVED_CARDS`)
- 2 cartes démo Visa/Mastercard → aucun logo de marque n'est reproduit
  (texte + icône générique déjà en place, conforme aux règles de
  propriété intellectuelle), simple changement des 4 derniers chiffres si
  souhaité. Risque quasi nul.
- Texte trailing "Visa, Mastercard, Amex" (`saved-cards/page.tsx`) → à
  aligner sur les réseaux réellement supportés en Haïti.

### 21. `/dart/profile` — `src/app/dart/profile/page.tsx`
- **"Hafiz Hanif" / "01080740132"** (nom et téléphone factices, en dur
  aux lignes ~39-40, format de numéro marocain) → identité de démo à
  remplacer par un nom et un format de téléphone haïtiens (+509).
- "Monthly Pay-in Limit: **3,000 MAD**" → montant/devise à adapter.
- Sheet "Change Language" : options **"English"/"Arabic"** → l'arabe n'a
  aucune pertinence pour Haïti, à remplacer par Français/Créole haïtien.

### 22. `/dart/profile/personal-info` — `src/app/dart/profile/personal-info/page.tsx`
- Valeurs par défaut hardcodées : `firstName: "Hafiz"`, `lastName:
  "Hanif"`, `phone: "01080740123"`, `email: "hafiz.hanif@gmail.com"` →
  identité factice marocaine à remplacer. **Ces valeurs ne sont déjà pas
  synchronisées avec celles de `/dart/profile`** (bug de cohérence déjà
  documenté dans `FONCTIONNEL.md`, indépendant de la localisation) — à
  corriger en même temps.

### 23. `/dart/profile/documents` — `src/lib/dart-data.ts` (`DOCUMENT_ITEMS`)
- "National ID" (universel), "Proof of Income" (universel), "Utility
  Bill" (universel), **"Car License"**, **"Club ID"**, **"Syndicate
  ID"** → ces 3 derniers types de documents sont spécifiques au contexte
  source (capturés tels quels depuis l'app 2) et n'ont probablement pas
  de pertinence évidente pour un produit financier haïtien — à
  revalider avec le métier (garder, remplacer, ou retirer).

### 24. `/dart/profile/documents/scan-id` — `src/app/dart/profile/documents/scan-id/page.tsx`
- Texte : "As required by **Central Bank**, users must upload their
  (valid) National ID before joining a **Game'ya** to guarantee
  everyone's rights." → référence implicite à Bank Al-Maghrib (banque
  centrale marocaine) et au terme "Game'ya" → à remplacer par la BRH
  (Banque de la République d'Haïti) et la terminologie retenue pour le
  produit.

### 28. `/dart/profile/invite-friends` — `src/app/dart/profile/invite-friends/page.tsx`
- **"150 MAD OFF"** répété 4 fois (titre, 2 descriptions d'étapes, sheet)
  → montant/devise à adapter.
- Description de l'étape 2 : "join their first **Game'ya** through the
  invitation link" → terminologie à harmoniser.
- Code de parrainage "pogvhsuh" (`copied` state) → format de code démo,
  à adapter au format réel choisi si un vrai système de codes existe.

### Note transverse — devise "MAD" non centralisée
Le suffixe littéral `" MAD"` est écrit en dur dans **15 fichiers**
différents (11 pages + `dart-data.ts` + `circle-card.tsx`), sans
formatteur ou constante partagée. **Recommandation technique** (hors
scope de cet audit mais à signaler) : avant de basculer vers HTG,
introduire une fonction `formatCurrency()` unique plutôt que de
chercher/remplacer 15 occurrences séparées — réduit le risque d'oubli et
facilite un futur changement de devise.

---

## 4. Traces de "Dart" / "Oportun" en dur — code, fichiers, métadonnées

### Texte "Dart" rendu à l'écran (visible utilisateur)
| Fichier | Ligne | Contexte |
|---|---|---|
| `src/components/layout/dart-header.tsx` | 9 | `<span>Dart</span>` — wordmark affiché sur les 4 onglets (Home/Circles/Payment/Profile) |
| `src/app/dart/page.tsx` | 20 | `<span>Dart</span>` — écran splash |
| `src/app/dart/welcome/page.tsx` | 14 | `<span>Dart</span>` — logo écran de bienvenue |
| `src/app/dart/welcome/page.tsx` | 25 | `<h1>Welcome to Dart</h1>` |
| `src/app/dart/signup/page.tsx` | 20 | `<span>Dart</span>` — logo écran signup |
| `src/app/dart/signup/page.tsx` | 45 | "By clicking Continue, you agree to **Dart** Terms of Use and Privacy Policy." |

→ **6 occurrences de texte utilisateur** à neutraliser/renommer, toutes
concentrées dans `DartHeader` (composant unique, un seul endroit à
changer pour les 4 onglets) + 3 écrans d'onboarding.

### "Dart" dans le code (noms de composants/fonctions/routes — invisible à l'écran mais présent dans le code source livré)
- **Segment de route `/dart/*`** : les 28 écrans vivent sous ce préfixe
  d'URL (`src/app/dart/`). C'est structurel (nécessaire pour cohabiter
  avec les routes Oportun `/home`, `/profile`, etc.) — renommer le
  dossier changerait toutes les URLs.
- Composants/fonctions nommés avec "Dart" : `DartHeader`, `DartTabBar`,
  `DartTab`, `DartProvider`, `useDart`, `DartContext`,
  `DartContextValue`, et le préfixe `Dart` sur quasiment tous les noms de
  fonction de page (`DartHomePage`, `DartCirclesPage`,
  `DartWelcomePage`, `DartJoinPage`, `DartSignupPage`,
  `DartVerifyOtpPage`, `DartPersonalInfoPage`, `DartDocumentsPage`,
  `DartProfilePage`, `DartPaymentPage`, `DartSplashPage`...) — présents
  dans `src/lib/dart-context.tsx`, `src/components/layout/dart-header.tsx`,
  `src/components/layout/dart-tab-bar.tsx`, et la quasi-totalité des 28
  fichiers `page.tsx` sous `/dart`.
- Fichiers nommés avec "dart" : `src/lib/dart-context.tsx`,
  `src/lib/dart-data.ts`, `src/components/layout/dart-header.tsx`,
  `src/components/layout/dart-tab-bar.tsx`.
- Assets nommés avec "dart" : `public/images/illustrations/dart-welcome-hero.svg`,
  `dart-circles-empty.svg`, `dart-payment-empty.svg`,
  `dart-payment-history-empty.svg`, `dart-saved-cards-empty.svg`.
- Commentaires de code en français mentionnant "Dart" (le reskin, l'app
  2) : très nombreux, dans quasiment tous les fichiers sous `/dart` — pas
  un risque de fuite utilisateur (jamais rendu), mais à nettoyer par
  cohérence documentaire si le projet est renommé durablement.

### Texte "Oportun" en dur — vérification côté Dart
**Aucune occurrence de "Oportun" rendue à l'écran dans les 28 pages
`/dart`.** Les 2 seules mentions dans le sous-arbre `/dart` sont des
commentaires de code, non visibles utilisateur :
- `src/app/dart/page.tsx:9` — commentaire expliquant le pattern d'auto-redirect "même pattern que le splash Oportun (/onboarding)".
- `src/app/dart/payment/settings/saved-cards/page.tsx:14` — commentaire "même règle que le logo Bank of America côté Oportun".

**"Oportun" reste массivement présent ailleurs dans le repo** (hors
périmètre Dart mais à connaître si l'objectif est de neutraliser toute
trace de marque dans le projet global) :
- Texte utilisateur rendu : `src/app/home/page.tsx` ("Share Oportun &
  score a $5 bonus", "More from Oportun", disclaimer légal), `src/app/set-and-save/page.tsx`
  ("Enjoying Oportun? Get $5"), `src/app/onboarding/welcome/page.tsx`,
  `src/app/onboarding/notifications/page.tsx`, `src/app/onboarding/setup/connect-bank/page.tsx`,
  `src/app/onboarding/setup/agreements/page.tsx`, `src/app/connected-account/page.tsx`.
- Fichiers image : `public/logos/oportun-wordmark.png`,
  `public/logos/oportun-icon-mark.png` (référencés uniquement par
  `src/app/onboarding/page.tsx`, jamais par une page Dart).
- Dossier entier `design-refs/Oportun_iOS_*/` (captures sources
  originales, 14 sous-dossiers, ~80 fichiers) — hors code applicatif.
- Commentaires de code : présents dans la quasi-totalité des pages
  Oportun (`Cf. design-refs/Oportun_iOS_...`), non rendus.

### Métadonnées / configuration
- **`package.json`** : `"name": "sol"` — **aucune trace de "Dart" ni
  "Oportun"**. Propre.
- **`src/app/layout.tsx`** (metadata Next.js) : `title: "Sol"`,
  `description: "Reproduction pixel-perfect à partir du design Figma /
  des screenshots de référence."` — **générique, aucune trace de marque**.
- **`src/app/globals.css`** : 1 occurrence, commentaire "Thème shadcn/ui
  remappé sur les tokens **Oportun**" — commentaire uniquement, non
  rendu.
- Aucun `manifest.json` / `site.webmanifest` présent dans le projet (rien
  à vérifier de ce côté).
- Aucun favicon dédié trouvé référençant explicitement une marque (le
  dossier `public/` ne contient que `images/` et `logos/`).

### Synthèse — ce qui nécessite une action si "Dart" doit disparaître du produit livré
1. **6 occurrences de texte utilisateur** ("Dart" affiché) — action
   minimale et suffisante pour qu'aucun visiteur ne voie jamais le mot
   "Dart" : renommer `DartHeader` (span ligne 9) + les 3 écrans
   d'onboarding listés ci-dessus.
2. Le **préfixe de route `/dart/*`** est visible dans l'URL du navigateur
   — à évaluer séparément (renommer le dossier de route si l'URL doit
   elle aussi être neutre).
3. Les noms de composants/fonctions/fichiers/assets contenant "dart" ne
   sont **jamais exposés à l'utilisateur final** (ni dans le DOM rendu, ni
   dans les URLs sauf le préfixe de route déjà cité) — purement une
   question de propreté de code interne, aucun risque de fuite de marque.
4. **"Oportun" n'apparaît nulle part dans le produit Dart livré** —
   aucune action nécessaire de ce côté pour la partie Dart spécifiquement.
