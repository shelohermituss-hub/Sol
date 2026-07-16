# Inventaire — Cash App (reproduction)

Légende statut : ⬜ à faire · 🟡 en cours · ✅ validé

Sources : `design-refs/01-onboarding` (22 écrans, zip "Cash App iOS Onboarding"),
`design-refs/02-onboarding-kyc-variant` (10 écrans, variante/KYC), `design-refs/03-home`
à `07-profile-settings` (17 écrans, zips "Cash", "Cash App UI Clone… Community",
"Cash App UI (2023) Community"), Figma `iOPJoJTAYINs7qy4xcn1fs` node `4-6`.

## 1. Module Onboarding (inscription)

| # | Écran | Fichier | États | Statut |
|---|---|---|---|---|
| 1.1 | Splash | `00-splash.png` | unique | ⬜ |
| 1.2 | Saisie téléphone / email | `01-enter-phone.png` | vide | ⬜ |
| 1.3 | Saisie email (alt.) | `02-enter-email-empty.png`, `03-enter-email-filled.png` | vide, rempli+CTA actif | ⬜ |
| 1.4 | Code de confirmation (OTP) | `04-otp-code-empty.png`, `05-otp-code-filled.png` | vide, rempli | ⬜ |
| 1.5 | Lier une carte de débit | `06-link-bank-empty.png`, `07-link-bank-filled.png` | vide, rempli | ⬜ |
| 1.6 | Écran de chargement "Linking…" | `08-linking-loading.png` | unique | ⬜ |
| 1.7 | Nom légal | `09-legal-name-empty.png`, `10-legal-name-filled.png` | vide, rempli | ⬜ |
| 1.8 | Date de naissance | `11-dob-empty.png`, `12-dob-filled.png` | vide, rempli | ⬜ |
| 1.9 | Choix du $Cashtag | `13-cashtag-empty.png` | vide | ⬜ |
| 1.10 | Création du PIN | `14-pin-create.png` | 0/4 | ⬜ |
| 1.11 | Confirmation du PIN | `15-pin-confirm.png` | 3/4 | ⬜ |
| 1.12 | Intro Cash App Card | `16-card-intro-top.png`, `17-card-intro-scrolled.png` | haut, scrollé | ⬜ |
| 1.13 | Sync contacts (prompt) | `18-sync-contacts-prompt.png` | unique | ⬜ |
| 1.14 | Invite Friends ($5) | `19-invite-friends.png` | unique | ⬜ |
| 1.15 | Welcome / succès | `20-welcome-success.png` | unique | ⬜ |
| 1.16 | Money home (post-onboarding) | `21-money-home-post-onboarding.png` | $1.00, carte "Shipped" | ⬜ |

**Composants transverses à extraire en premier** : Header (bouton retour / `?` aide /
`×` fermer), Pill Button (primaire/secondaire/désactivé), Text Input, PIN Dots,
Progress bar (barre fine en bas d'écran, visible sur tous les écrans onboarding).

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

| # | Écran | Fichier | États | Statut |
|---|---|---|---|---|
| 3.1 | Money home | `money-home-empty-state.png` (solde $0) / `money-home-populated-state.png` (solde $88.44, avatar) | vide, peuplé | ⬜ |

**Composants** : Balance card (Cash Balance, Add Cash / Cash Out), grille de
raccourcis 2×2 (Savings, Buy bitcoin, Invest in stocks, Free tax filing), bottom
tab bar (Home, Card, Pay `$`, Search, Activity).

## 4. Module Pay / Envoi d'argent

| # | Écran | Fichier | Statut |
|---|---|---|---|
| 4.1 | Clavier montant (plein écran vert) | `pay-amount-keypad.png` | ⬜ |
| 4.2 | Détails paiement (destinataire, note, Cash/Gift Card/Stock) | `payment-details-recipient.png` | ⬜ |

## 5. Module Add Cash

| # | Écran | Fichier | Statut |
|---|---|---|---|
| 5.1 | Add Cash (bottom sheet, montants rapides) | `add-cash-bottomsheet.png` | ⬜ |
| 5.2 | Add Cash (clavier plein écran) | `add-cash-fullscreen-keypad.png` | ⬜ |
| 5.3 | Confirmer le PIN | `confirm-pin.png` | ⬜ |
| 5.4 | Succès + upsell Direct Deposit | `success-confirmation.png` | ⬜ |

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
- ⬜ Button (pill : primaire, secondaire, désactivé, tailles)
- ⬜ TextInput (avec/sans label, bordure, focus state)
- ⬜ NumericKeypad (thème clair / thème vert plein écran)
- ⬜ PinDots
- ⬜ Card (balance card, shortcut card, list card)
- ⬜ BottomSheet (grabber + overlay)
- ⬜ BottomTabBar (5 icônes)
- ⬜ Header (back / close / help)
- ⬜ SuccessState (icône check + titre + CTA)
- ⬜ ListRow (icône + label + chevron/switch, pour Account & Settings)
- ⬜ AvatarCircle

## Questions ouvertes (à valider avant Phase 3)
1. **Module 2 (KYC/variante)** : intégrer ces écrans comme continuation du flow
   d'onboarding principal (ex. vérification d'identité déclenchée avant Bitcoin),
   ou les traiter comme des écrans standalone à part ? Le CTA vert de ce lot
   diffère du CTA noir du module 1 — lequel doit être la référence par défaut ?
2. **Bitcoin** : présent comme raccourci sur Money home et dans le module KYC,
   mais aucun écran dédié (achat, portefeuille) n'a été fourni — à ajouter au
   périmètre ou explicitement exclu ?
3. **Card (onglet "Card" de la bottom tab bar)** : aucune capture fournie — à
   inclure ?
4. **Search / Activity** (2 derniers onglets de la bottom tab bar) : aucune
   capture fournie — à inclure ?
5. Le fichier Figma lié contient aussi une section **"Landing Page"** (Frame 13,
   node `4:219`) au sens Figma du terme — à ne pas confondre avec le module Home
   ci-dessus. Vu le quota Figma épuisé, son contenu réel n'a pas pu être vérifié.
   Si elle diffère de Home/Money, prévoir un aller Figma dédié en Phase 1.
