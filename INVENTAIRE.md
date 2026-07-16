# Inventaire — Cash App (reproduction)

Légende statut : ⬜ à faire · 🟡 en cours · ✅ validé

Sources : `design-refs/01-onboarding` (22 écrans, zip "Cash App iOS Onboarding"),
`design-refs/02-onboarding-kyc-variant` (10 écrans, variante/KYC), `design-refs/03-home`
à `07-profile-settings` (17 écrans, zips "Cash", "Cash App UI Clone… Community",
"Cash App UI (2023) Community"), Figma `iOPJoJTAYINs7qy4xcn1fs` node `4-6`.

## 1. Module Onboarding (inscription)

| # | Écran | Fichier | États | Route | Statut |
|---|---|---|---|---|---|
| 1.1 | Splash | `00-splash.png` | unique | `/onboarding` | 🟡 |
| 1.2 | Saisie téléphone / email | `01-enter-phone.png` | vide | `/onboarding/phone-email` | 🟡 |
| 1.3 | Saisie email (alt.) | `02-enter-email-empty.png`, `03-enter-email-filled.png` | vide, rempli+CTA actif | `/onboarding/phone-email` (bascule "Use Email") | 🟡 |
| 1.4 | Code de confirmation (OTP) | `04-otp-code-empty.png`, `05-otp-code-filled.png` | vide, rempli | `/onboarding/otp` | 🟡 |
| 1.5 | Lier une carte de débit | `06-link-bank-empty.png`, `07-link-bank-filled.png` | vide, rempli | `/onboarding/link-bank` | 🟡 |
| 1.6 | Écran de chargement "Linking…" | `08-linking-loading.png` | unique | état interne de `/onboarding/link-bank` | 🟡 |
| 1.7 | Nom légal | `09-legal-name-empty.png`, `10-legal-name-filled.png` | vide, rempli | `/onboarding/legal-name` | 🟡 |
| 1.8 | Date de naissance | `11-dob-empty.png`, `12-dob-filled.png` | vide, rempli | `/onboarding/dob` | 🟡 |
| 1.9 | Choix du $Cashtag | `13-cashtag-empty.png` | vide | `/onboarding/cashtag` | 🟡 |
| 1.10 | Création du PIN | `14-pin-create.png` | 0/4 | `/onboarding/pin` | 🟡 |
| 1.11 | Confirmation du PIN | `15-pin-confirm.png` | 3/4 | `/onboarding/pin` (état interne) | 🟡 |
| 1.12 | Intro Cash App Card | `16-card-intro-top.png`, `17-card-intro-scrolled.png` | haut, scrollé | `/onboarding/card-intro` | 🟡 |
| 1.13 | Sync contacts (prompt) | `18-sync-contacts-prompt.png` | unique | `/onboarding/sync-contacts` | 🟡 |
| 1.14 | Invite Friends ($5) | `19-invite-friends.png` | unique | `/onboarding/invite-friends` | 🟡 |
| 1.15 | Welcome / succès | `20-welcome-success.png` | unique | `/onboarding/welcome` | 🟡 |
| 1.16 | Money home (post-onboarding) | `21-money-home-post-onboarding.png` | $1.00, carte "Shipped" | `/` (module 3, pas encore construit) | ⬜ |

🟡 = codé + comparé visuellement (capture Playwright) contre `design-refs/`, visuellement
proche. Pas encore ✅ (pixel-perfect final) : polices/espacements/couleurs à
raffiner une fois le quota Figma rétabli (valeurs actuelles = sondage pixel des
screenshots), illustration de la Cash App Card en placeholder, icônes maison/
contacts en approximations SVG/emoji.

**Écarts connus à corriger plus tard** :
- Date de naissance (1.8) : simplifié en un seul champ texte, pas de 3 segments
  MM/DD/YYYY distincts comme dans la référence.
- PIN (1.10/1.11) : clavier numérique ajouté pour permettre la saisie web (absent
  des captures d'origine, qui montraient le clavier système iOS).
- Intro Cash App Card (1.12) : illustration remplacée par un rectangle uni
  (lime) en attendant l'export de l'asset réel depuis Figma.
- Sync contacts (1.13) : icône emoji 👥 à remplacer par la vraie icône.

**Composants transverses utilisés** : Header, Button, TextInput, PinDots,
NumericKeypad, SuccessState, Card, `OnboardingShell` (nouveau —
`src/components/layout/onboarding-shell.tsx`, structure commune header/titre/
contenu/footer). Note : la fine barre noire en bas des captures est l'indicateur
système iOS (home indicator), pas un composant applicatif — non reproduite.

## 2. Module Onboarding — variante / vérification d'identité (KYC)

> Ces écrans viennent d'un second lot Figma avec CTA vert (au lieu de noir) et
> claviers iOS incrustés. À clarifier avec l'utilisateur : s'agit-il d'un thème
> alternatif à choisir, ou d'écrans supplémentaires du même flow (ex. vérification
> d'identité requise pour Bitcoin) ? Voir section "Questions ouvertes".

| # | Écran | Fichier | Statut |
|---|---|---|---|
| 2.1 | Vérifier identité (ID + selfie) | `verify-identity-id-face.png` | ⬜ |
| 2.2 | Vérification requise (Bitcoin) | `verify-identity-bitcoin-required.png` | ⬜ |
| 2.3 | Saisie email (clavier) | `enter-email-keyboard.png` | ⬜ |
| 2.4 | OTP (clavier, vide/rempli) | `otp-email-empty-keypad.png`, `otp-email-filled-keypad.png` | ⬜ |
| 2.5 | Code postal (ZIP) | `enter-zip-code.png` | ⬜ |
| 2.6 | Cashtag (clavier, vide/rempli) | `cashtag-empty-keyboard.png`, `cashtag-filled.png` | ⬜ |
| 2.7 | Nom légal (clavier) | `legal-name-keyboard.png` | ⬜ |
| 2.8 | Achat d'action programmé | `buy-stock-scheduled-order.png` | ⬜ |

## 3. Module Home (Money)

| # | Écran | Fichier | États | Route | Statut |
|---|---|---|---|---|---|
| 3.1 | Money home | `money-home-empty-state.png` (solde $0) / `money-home-populated-state.png` (solde $88.44, avatar) | peuplé construit ; vide = mêmes composants avec données à zéro | `/` | 🟡 |

**Composants** : `BalanceCard`, `ShortcutCard` (`src/components/sections/home/`),
`Sparkline` (`src/components/ui/sparkline.tsx`), `AvatarCircle`, `BottomTabBar`.
Vérifié visuellement (capture Playwright) contre `money-home-populated-state.png`
— match proche (montants, deltas Bitcoin/Stocks, sparklines, grille 2×2).

**Écarts connus** :
- État "solde $0" (`money-home-empty-state.png`) pas encore branché — nécessite de
  passer des données à zéro à `BalanceCard`/`ShortcutCard` (pas de nouveau
  composant à créer).
- Icônes Savings (cible) et Free tax filing (dossier) en SVG simplifiés, pas les
  illustrations réelles du design.
- `21-money-home-post-onboarding.png` (module 1) montre une variante différente
  (labels "Add money/Withdraw", sections "Paychecks"/"Pools") non reprise ici —
  seule la version `money-home-*-state.png` a été retenue comme référence
  canonique du module 3, à clarifier si besoin.
- Écran non branché sur de vraies données (montants en dur dans `page.tsx`).

## 4. Module Pay / Envoi d'argent

| # | Écran | Fichier | Route | Statut |
|---|---|---|---|---|
| 4.1 | Clavier montant (plein écran vert) | `pay-amount-keypad.png` | `/pay` | 🟡 |
| 4.2 | Détails paiement (destinataire, note, Cash/Gift Card/Stock) | `payment-details-recipient.png` | `/pay/details` | 🟡 |

**Écart connu** : aucune capture de référence pour l'écran "paiement envoyé" —
le bouton "Pay" en haut de `/pay/details` reste un no-op documenté dans le code.
Bouton "Request" sur `/pay` également non câblé (même raison).

## 5. Module Add Cash

| # | Écran | Fichier | Route | Statut |
|---|---|---|---|---|
| 5.1 | Add Cash (bottom sheet, montants rapides) | `add-cash-bottomsheet.png` | `/` (déclenché par "Add Cash") | 🟡 |
| 5.2 | Add Cash (clavier plein écran) | `add-cash-fullscreen-keypad.png` | `/add-cash` | 🟡 |
| 5.3 | Confirmer le PIN | `confirm-pin.png` | `/add-cash/pin` | 🟡 |
| 5.4 | Succès + upsell Direct Deposit | `success-confirmation.png` | `/add-cash/success` | 🟡 |

Flow complet câblé : Home → "Add Cash" ouvre le bottom sheet → montant rapide ou
"…" (montant personnalisé) → `/add-cash` (si custom) → `/add-cash/pin` → 4
chiffres → `/add-cash/success` → "Done" → Home. Tous vérifiés visuellement
(capture Playwright) contre `design-refs/05-add-cash/`.

**Composants ajoutés** : `AddCashSheet` (`components/sections/add-cash/`),
`useAmountBuffer` (`src/lib/use-amount-buffer.ts`, saisie de montant partagée
entre Pay et Add Cash), `BottomTabBar` étendu avec un thème `"green"` pour
l'écran Pay plein écran.

**Écart connu** : les montants rapides du bottom sheet (`$1`/`$10`/…) naviguent
directement vers la confirmation PIN (comme un raccourci "montant validé"), ce
qui correspond au comportement observé mais n'a pas de capture d'écran
intermédiaire à valider pixel par pixel.

## 6. Module Stocks / Investing

| # | Écran | Fichier | Statut |
|---|---|---|---|
| 6.1 | Buy stock (bottom sheet) | `buy-stock-bottomsheet.png` | ⬜ |
| 6.2 | Détail action (Meta, graphe, Buy/Follow/Gift) | `stock-details-meta.png` | ⬜ |
| 6.3 | Onglet Stocks (recherche, cards vedettes) | `stocks-tab-top.png` | ⬜ |
| 6.4 | Onglet Stocks (catégories, Most Traded) | `stocks-tab-scrolled.png` | ⬜ |

## 7. Module Profile / Account & Settings

| # | Écran | Fichier | Statut |
|---|---|---|---|
| 7.1 | Your Account (haut : avatar, Edit Profile, Invite friends) | `account-profile-top.png` | ⬜ |
| 7.2 | Your Account (scrollé : Favorites → Sign Out) | `account-profile-scrolled.png` | ⬜ |
| 7.3 | Security & Privacy | `security-privacy.png` | ⬜ |
| 7.4 | Notifications | `notifications.png` | ⬜ |
| 7.5 | Account & Settings (aide) | `account-settings-help.png` | ⬜ |

## Composants UI de base (transverses à tous les modules)
🟡 = première version codée + smoke-test visuel via `/styleguide`, pas encore
validée pixel-perfect contre un écran composé précis (viendra en construisant
les écrans du Module 1).

- 🟡 Button (pill : primaire, secondaire, désactivé) — `src/components/ui/button.tsx`
- 🟡 TextInput (avec/sans label) — `src/components/ui/text-input.tsx`
- 🟡 NumericKeypad (thème clair / thème vert plein écran) — `src/components/ui/numeric-keypad.tsx`
- 🟡 PinDots — `src/components/ui/pin-dots.tsx`
- 🟡 Card — `src/components/ui/card.tsx`
- 🟡 BottomSheet (grabber + overlay) — `src/components/ui/bottom-sheet.tsx`
- 🟡 BottomTabBar (5 icônes, placé dans `components/layout/` par cohérence avec
  la structure CLAUDE.md) — `src/components/layout/bottom-tab-bar.tsx`
- 🟡 Header (back / close / help) — `src/components/ui/header.tsx`
- 🟡 SuccessState (icône check + titre) — `src/components/ui/success-state.tsx`
- 🟡 ListRow (icône + label + chevron) — `src/components/ui/list-row.tsx`
- 🟡 AvatarCircle — `src/components/ui/avatar-circle.tsx`

⚠️ Icônes (chevron, close, backspace, tab bar) : dessinées en SVG inline
approximatif faute d'accès aux vrais assets Figma (quota épuisé) — à remplacer
par les icônes exportées de Figma (`download_assets`) dès que possible, par
`CLAUDE.md`.

Page de vérification temporaire : `src/app/styleguide/page.tsx` (à supprimer
une fois tous les écrans construits).

## Décisions (validées avec l'utilisateur)
1. **Module 2 (KYC/variante)** → **thème alternatif**, pas une continuation du
   flow principal. Le module 1 (CTA noir) reste la référence par défaut pour
   tous les écrans qu'il couvre déjà (email, OTP, cashtag, nom). Les écrans du
   module 2 qui n'ont pas d'équivalent dans le module 1 (vérification
   d'identité, code postal) seront ajoutés au flow principal **restylés en CTA
   noir**, pas en vert — le vert du module 2 n'est pas repris.
2. **Bitcoin** → raccourci visuel uniquement pour le moment (carte "Buy bitcoin"
   sur Money home). Pas d'écrans dédiés (achat, portefeuille) dans ce périmètre.
3. **Card** (onglet bottom tab bar) → **inclus**. ⚠️ Aucune capture fournie —
   bloqué tant que des assets ne sont pas fournis (screenshot et/ou accès Figma
   à ce node).
4. **Search** (onglet bottom tab bar) → **inclus**. ⚠️ Aucune capture fournie —
   même blocage que Card.
5. **Activity** (onglet bottom tab bar) → **inclus**. ⚠️ Aucune capture fournie —
   même blocage que Card.

## Points encore bloqués (assets manquants)
- Écrans **Card**, **Search**, **Activity** : aucun screenshot fourni. Le MCP
  Figma reste en quota épuisé (`Starter` plan) au moment de la reprise — impossible
  de les récupérer via `get_screenshot`/`get_design_context` pour l'instant.
  → Prochaine étape possible : fournir des screenshots (comme pour les modules
  précédents), ou attendre/relancer le quota Figma, ou passer à un plan Figma
  supérieur.
- Section Figma **"Landing Page"** (Frame 13, node `4:219`) : toujours pas
  vérifiée, même blocage de quota. À confirmer si elle recoupe le module Home
  actuel ou si elle est distincte (à traiter alors comme module 8).

Ces 4 points sont mis de côté ; ils ne bloquent pas le démarrage de l'Étape 1
(composants UI de base) ni du Module 1 (Onboarding), qui disposent de tous
leurs assets.
