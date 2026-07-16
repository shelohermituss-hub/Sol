# Audit — État du code (après modules 1 à 7)

## ✅ Corrections appliquées (16/07)
Décisions validées avec l'utilisateur : icônes → **Phosphor Icons** (règle
`CLAUDE.md` mise à jour en conséquence), 768/1440px → vraie mise en page
desktop (pas de référence existante, traitement standard appliqué : sidebar de
nav pour les écrans racine Home/Pay/Stocks, carte centrée pour les flows
Onboarding/Add Cash/Pay details/Profile). Tous les points 🔴 et 🟠 corrigés :

1. **Couleurs hex en dur** → 4 nouveaux tokens (`--color-error`,
   `--color-badge-bg`, `--color-category-banking`, `--color-category-business`),
   voir `design-tokens.md`. Exception documentée : `src/app/icon.tsx` (favicon
   généré via Satori, ne peut pas lire les variables CSS).
2. **Bug 375px (Home)** → `Button` et les headers de `BalanceCard`/`ShortcutCard`
   passent en tailles/paddings responsives (`text-base sm:text-lg`,
   `whitespace-nowrap`) ; `/pay/details` (pills "Send as") passe en
   `flex-wrap`. Revérifié à 375/768/1440px, plus de wrap cassé.
3. **Cash Out** → câblé (no-op documenté en commentaire, même statut que
   "Request"/"Buy stocks" — pas de capture de référence pour un vrai flow).
4. **Labels de formulaire** → `id` ajoutés sur tous les `TextInput` labellisés
   (`link-bank`, styleguide — depuis supprimé).
5. **BottomSheet** → `role="dialog"`, `aria-modal`, fermeture `Échap`, focus au
   montant.
6. **Validation de montant** → `useAmountBuffer` expose désormais `isValid`
   (montant > 0, point final orphelin nettoyé) ; `/pay` et `/add-cash`
   l'utilisent au lieu de dupliquer une validation locale.
7. **Toutes les icônes SVG faites main → Phosphor Icons** (`@phosphor-icons/react/ssr`) :
   Header, BottomTabBar, ListRow, NumericKeypad, Checkbox, SuccessState,
   sections/profile/icons.tsx, sections/stocks, add-cash/success,
   onboarding/card-intro, onboarding/sync-contacts, onboarding/link-bank,
   pay/page, pay/details, sections/stocks/buy-stock-sheet, Home
   (Target/FolderSimple), balance-card/shortcut-card (chevrons).
8. **Responsive desktop** : nouveaux composants `AppShell`
   (`components/layout/app-shell.tsx`, sidebar de nav à partir de md pour
   Home/Pay/Stocks) et `CenteredPage` (`components/layout/centered-page.tsx`,
   carte centrée à partir de md pour Profile/Add Cash/Pay details).
   `OnboardingShell` a reçu le même traitement carte-centrée. `BottomTabBar`
   supporte un mode sidebar verticale (`md:flex-col`).
9. **Boilerplate nettoyé** : 5 SVG morts supprimés, `README.md` réécrit,
   favicon par défaut remplacé par une icône générée (`src/app/icon.tsx`,
   reprend le mark du splash), `/styleguide` supprimé (superseded par les
   écrans réels des 7 modules).

Non corrigé (accepté comme limite, pas une régression) : point 9 de l'audit
original (`<title>` unique par app) — nécessiterait un `layout.tsx` par route
pour ~24 pages client, jugé disproportionné pour un gain cosmétique mineur.

Vérifié après corrections : `npm run build` + `eslint` propres, **0 erreur
console sur 24 routes × 3 breakpoints (72 chargements)**, captures visuelles à
375/768/1440px pour Home/Pay/Stocks/Profile/Onboarding/Add Cash.

---


Audit réalisé par : lecture systématique de tous les fichiers `src/`, tests
Playwright (console/erreurs sur 25 routes, breakpoints 375/768/1440px, cas
limites), `grep` ciblé sur les règles `CLAUDE.md`. Aucune modification de code
n'a été faite pendant cet audit — tout est en lecture seule, à valider avant
correction.

Légende sévérité : 🔴 bloquant/règle violée · 🟠 fonctionnel important · 🟡 mineur/polish

---

## 🔴 Bloquants — violent une règle explicite de CLAUDE.md

### 1. Couleurs en hex dur dans les composants
Règle : *"Couleurs : uniquement celles définies dans les tokens Tailwind
(jamais de hex en dur dans les composants)."* Or :

| Fichier | Valeur | Usage |
|---|---|---|
| `src/app/profile/page.tsx:83` | `#E0463C` | Texte "Sign Out" |
| `src/app/profile/page.tsx:103` | `#DFF7E6` | Fond badge "New" (Favorites) |
| `src/app/stocks/page.tsx:13-14` | `#C1622D`, `#C79A5B` | Fond cartes catégories |

**Fix** : ajouter ces 3 couleurs à `globals.css` (`@theme`) et
`design-tokens.md`, puis les référencer par variable CSS comme partout
ailleurs.

### 2. Pas de vérification responsive 375 / 768 / 1440px
Règle : *"Responsive : mobile-first ; vérifier 375px / 768px / 1440px."*
Cette vérification n'avait jamais été faite avant cet audit. Résultat des
tests :

- **375px (Home) — cassé** : "Cash Balance" wrap en 2 lignes, "Add Cash" /
  "Cash Out" wrap en 2 lignes dans leurs pills (hauteur incohérente entre les
  deux boutons), "Free tax filing" wrap et déborde du header de carte. Cause :
  texte `text-lg font-bold`/`font-semibold` trop grand pour la largeur
  disponible dans la grille 2×2 à 375px.
- **375px (autres écrans testés)** : Onboarding et Pay/Add Cash s'en sortent
  correctement (juste plus serré). `/pay/details` : le pill "Gift Card" wrap
  en 2 lignes alors que "Cash" et "Stock" restent sur 1 ligne (hauteurs de
  pills incohérentes).
- **768px et 1440px** : aucun écran ne s'adapte — c'est la carte mobile
  (`max-w-md`) centrée avec du vide gris autour. Ça fonctionne visuellement
  (rien de cassé), mais ce n'est pas "responsive" au sens de la règle, juste
  un verrouillage mobile. Comme **aucune référence Figma/screenshot desktop
  ou tablette n'a jamais été fournie** (toutes les captures sont des écrans
  iPhone), je n'ai rien à reproduire à ces largeurs — impossible de
  "réparer" sans inventer une mise en page. **Décision à prendre avec toi** :
  soit c'est voulu (clone d'app mobile, le desktop montre juste le mobile
  centré — beaucoup de clones font ce choix), soit il faut des maquettes
  desktop/tablette pour aller plus loin.

**Fix proposé (sans nouvelle référence)** : corriger le bug 375px du Home
(passer à une taille de texte responsive ou réduire le padding des pills) ;
laisser 768/1440 en mobile verrouillé sauf si tu veux des maquettes desktop.

---

## 🟠 Fonctionnel — gaps significatifs non documentés

### 3. Bouton "Cash Out" jamais câblé
`src/app/page.tsx` ne passe pas `onCashOut` à `<BalanceCard>` — le bouton
existe visuellement (le prop est prévu dans le composant) mais ne fait
strictement rien au clic. Contrairement à "Add Cash", "Request" (Pay) et
"Buy stocks" (Stocks), ce gap n'était pas documenté dans `INVENTAIRE.md`.

### 4. Labels de formulaire non associés à leurs champs (accessibilité)
`TextInput` supporte `label` + `htmlFor={id}`, mais **aucun appel dans le
code ne passe de prop `id`** (`link-bank`, `cashtag`, `styleguide`). Le
`<label>` existe visuellement mais `htmlFor` vaut `undefined` : un lecteur
d'écran ne relie pas le label au champ, et cliquer le label ne focus pas
l'input. Concerne 5 champs sur `/onboarding/link-bank` et le style guide.

### 5. BottomSheet sans accessibilité modale
`src/components/ui/bottom-sheet.tsx` n'a pas `role="dialog"` /
`aria-modal="true"`, ne piège pas le focus, et ne se ferme pas sur `Échap`.
Utilisé par `AddCashSheet` et `BuyStockSheet`.

### 6. Icônes/boutons décoratifs sans cible (non documentés comme tels)
En plus des gaps déjà notés dans `INVENTAIRE.md` (bouton "Buy stocks", bouton
"Pay" de `/pay/details`) :
- Bouton "?" (aide) présent sur 5 écrans d'onboarding + `/add-cash/pin` :
  toujours un no-op (`onHelp={() => {}}`), jamais documenté comme tel.
- Icône scan (coin haut-gauche de `/pay`) : rendue en SVG simple, pas dans un
  `<button>`, aucune interaction — cohérent avec l'absence de référence, mais
  pas noté.

### 7. Validation de montant incomplète (Pay / Add Cash)
`useAmountBuffer` + les écrans qui l'utilisent acceptent :
- un montant de **"$0"** (juste "0" tapé) comme valide → mène à "You added $0
  to your Cash App",
- un montant se terminant par un point non résolu, ex. **"$5."**, qui
  s'affiche tel quel dans le message de succès.

Pas un crash, mais une validation métier manquante (montant doit être > 0,
pas de point final orphelin).

---

## 🟡 Mineur / Polish

### 8. Boilerplate `create-next-app` non nettoyé
- `public/next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg` :
  plus jamais référencés dans le code → fichiers morts.
- `README.md` : toujours le texte générique de `create-next-app`, ne décrit
  pas le projet (Cash App reproduction, workflow `INVENTAIRE.md`/`design-refs`).
- `src/app/favicon.ico` : toujours l'icône Next.js par défaut.

### 9. `<title>` unique pour toute l'app
`layout.tsx` définit un seul `<title>` global ("Cash App (reproduction)").
Aucune page n'exporte de métadonnées spécifiques (`export const metadata` par
route) — l'onglet du navigateur ne change jamais selon l'écran affiché.

### 10. Page `/styleguide` toujours présente
Page de vérification temporaire (`src/app/styleguide/page.tsx`), prévue pour
suppression une fois les composants validés (cf. son propre commentaire). Les
7 modules étant maintenant construits et vérifiés dans leur contexte réel,
elle est candidate à la suppression — à confirmer avec toi.

---

## Icônes — état actuel et option d'amélioration

**Tout l'inventaire d'icônes de l'app (chevrons, back/close, tab bar, cloche,
dossier, bouclier, étoile, personnes, document, aide, backspace clavier...)
est en SVG inline dessiné à la main**, faute d'accès aux vraies icônes Figma
(quota MCP épuisé depuis le début du projet). C'est documenté module par
module dans `INVENTAIRE.md`, mais voici la liste consolidée : `Header`
(chevron/close), `BottomTabBar` (5 icônes), `ListRow` (chevron), `NumericKeypad`
(backspace), `sections/profile/icons.tsx` (9 icônes), `sections/stocks`
(cloche, mallette), `add-cash/success` (icône billet).

Tu as raison qu'il existe des ressources pro pour ça. Le skill **ui-ux-pro-max**
installé dans ce repo (`.claude/skills/ui-ux-pro-max/data/icons.csv`) contient
une base de 104 icônes cataloguées, recommandant la librairie **Phosphor
Icons** (`@phosphor-icons/react`) — un jeu complet, cohérent visuellement, qui
couvrirait la quasi-totalité des icônes de l'app (house, x, arrow-left, bell,
shield, star, users, file-text, question, backspace, etc.).

⚠️ Point d'attention : `CLAUDE.md` autorise explicitement **lucide-react**
comme seule librairie d'icônes externe ("UNIQUEMENT si les icônes du design
correspondent ; sinon exporter les vraies icônes SVG depuis Figma"). Phosphor
n'est pas la librairie nommée dans tes règles. Avant de l'introduire (nouvelle
dépendance, changement dans une vingtaine de fichiers), je préfère te
demander : lucide-react (conforme à la règle actuelle), Phosphor (recommandé
par le skill pro, mais nouvelle dépendance hors règle), ou on retente
l'export Figma réel (si le quota MCP est revenu) ?

---

## Ce qui a été vérifié et ne pose PAS de problème
- **0 erreur/warning console** sur les 25 routes testées (Playwright).
- **0 usage de `any`**, **0 `console.log`** oublié, **0 commentaire
  TODO/FIXME** dans le code.
- **0 assertion non-null (`!`) risquée**.
- Cas limites testés sans crash : `/stocks/tesla` (symbole inconnu → 404 propre
  via `notFound()`), `/onboarding/otp` sans `?contact=`, `/add-cash/pin` et
  `/pay/details` sans `?amount=` (fallbacks corrects).
- `npm run build` et `eslint` passent toujours sans erreur.

---

## Priorisation proposée
1. 🔴 Couleurs hex en dur (rapide, 4 valeurs)
2. 🔴 Bug 375px du Home (rapide, ajustement de tailles/paddings)
3. 🟠 Cash Out non câblé + `id`/`htmlFor` sur les inputs labellisés (rapide)
4. 🟠 Accessibilité BottomSheet (role/aria/Échap)
5. 🟡 Nettoyage boilerplate (assets morts, README, favicon)
6. Décision : stratégie icônes (lucide-react / Phosphor / réessayer Figma)
7. Décision : 768/1440px verrouillé-mobile assumé, ou besoin de maquettes desktop
