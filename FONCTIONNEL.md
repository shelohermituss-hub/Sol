# FONCTIONNEL.md — Reskin app 2 (Dart) dans le design de l'app 1 (Oportun)

> **Source fonctionnelle** : `./app-cible/` (36 captures, app "Dart" — ROSCA
> fintech / tontine digitale). On y prend uniquement la structure des
> écrans, les fonctionnalités, les parcours et les textes — **jamais**
> l'apparence.
>
> **Source visuelle** : `./design-refs/` + `src/components/ui/` +
> `src/app/globals.css` (app 1, Oportun). Le look ne bouge pas.
>
> Statuts (remplis à l'Étape 3) : ⬜ à faire / 🟡 en cours / ✅ validé

---

## Parcours utilisateur principal

```
Splash → Welcome (onboarding) → Sign up (email/téléphone) → Verify OTP
  → Home (hub, 4 onglets : Home / Circles / Payment / Profile + FAB central "+")

Depuis le FAB "+" (Home ou Circles) → Choose a Service
  ├─ Join a Game'ya → Payout Amount → Monthly Pay-in → Slot (Choose turn)
  │    → [écran de révision non capturé] → Payout Method
  └─ Join Saving Program → Choose a Saving Circle → Choose Duration (sheet)
       → [écran de révision non capturé] → Payout Method

Payment (onglet) → Payout Eligibility / Payment History (Payments|Payouts)
  / Payment Settings → Saved Cards → Add Card

Profile (onglet) → Personal Info
                 → My Documents → Scan National ID
                                → Proof of Income → Your Monthly Income
                                                   → Upload HR Letter
                 → Invite Friends → Track Invitations
                 → Change Language (sheet)
```

---

## 1. Onboarding & Authentification

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Splash | Écran de démarrage, logo seul | Aucune, auto-avance | Wordmark centré | ✅ |
| Welcome (Onboarding) | Value prop, 1er contact | CTA unique | Illustration héro, titre, texte, bouton primaire pleine largeur | ✅ |
| Sign up | Saisie identifiant | Champ email/téléphone unique (pas de séparation comme app 1), CTA, liens légaux | Champ texte, bouton primaire, texte légal avec 2 liens inline | ✅ |
| Verify OTP | Vérification du compte | Code 4 chiffres (app 1 : 6), minuteur de renvoi (02:39), lien "Resend", checkbox "Remember Me", clavier numérique custom | OTP input (4 cases), lien, checkbox, clavier numérique | ✅ |

**Écart notable vs app 1** : un seul champ "Email/Phone" au lieu du flux séparé téléphone → infos perso → mot de passe de l'Onboarding Oportun. OTP à 4 chiffres (pas 6). Pas d'étape mot de passe ni Face ID/notifications dans les captures.

---

## 2. Home (onglet 1/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Home | Hub principal | Carrousel promo ("Latest Offers", dots), bannière parrainage (teaser + chevron), section "Recommended for you" (cartes cercle horizontales scrollables), section "Popular Goals" (cartes catégorie colorées horizontales), icônes notif/streak en en-tête | Carrousel/carte promo, bannière inline cliquable, carte "cercle" (montant, mensualité, bouton "Join now", frise de progression avec marqueur "Your Turn", plage de dates, frais admin), carte catégorie colorée, tab bar 4 onglets + FAB central | ✅ |

---

## 3. Circles (onglet 2/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Circles (vide) | Liste des cercles actifs | Toggle segmenté Active/Finished, état vide illustré ("Your active circles will appear here!"), section "Recommended for you" (mêmes cartes que Home) | Toggle 2 options (style pill, cf. app 1 "Savings goal/Smart bill"), illustration + texte état vide, carte cercle | ✅ |
| Circles (rempli) | Idem, avec cercle rejoint | Carte cercle avec badge "Joined" (remplace le bouton "Join now") | Carte cercle, variante "Joined" | ✅ |

---

## 4. Rejoindre un cercle — Game'ya

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Choose a Service | Choix du type de circle à rejoindre | 2 cartes navigables (Join a Game'ya / Join Saving Program), icône+titre+description+chevron par carte | Carte navigable avec icône emoji/illustration, titre, description, chevron | ✅ |
| Payout Amount (étape 1/4) | Choix du montant du circle | Barre de progression 4 étapes, slider (3,000–120,000 MAD) avec bornes affichées, carte info avec mini-carrousel (dots), CTA "Next" | Indicateur de progression multi-étapes, slider à poignée unique, carte info avec dots, bouton | ✅ |
| Monthly Pay-in (étape 2/4) | Choix de la mensualité | Résumé de l'étape précédente (montant + lien "Edit"), liste de 3 options radio (mensualité/durée), bandeau info, CTA | Ligne résumé éditable, liste d'options sélectionnables (radio + chevron), bandeau info | ✅ |
| Slot / Choose turn (étape 3/4, vide) | Choix du tour de paiement | Résumés des 2 étapes précédentes (avec "Edit"), 3 onglets/cartes (Fastest Payout / Lowest Fees / Highest Return) chacune avec icône+description+tag (fees apply / pay-ins discount), bandeau info | Tabs ou cartes sélectionnables à 3 options, tag coloré, bandeau info | ✅ |
| Slot / Choose turn (étape 3/4, rempli) | Idem, tab "Highest Return" sélectionné | Cartes de créneaux datées (ex. "March 2025" / "April 2025") sélectionnables, badges ("Zero Fees", remise), bandeau "Admin Fees" + lien "Learn More", CTA dynamique ("Continue with April") | Cartes de sélection de date (2 colonnes), badge, lien avec flèche, bouton avec libellé dynamique | ✅ |
| Review (étape 4/4) | Révision avant confirmation | Non capturée dans app-cible/ — construite par analogie avec la sheet de révision "Creating a goal" de l'app 1 (résumé + CTA de confirmation) ; "Confirm" ajoute le circle à "Your Circles" | Résumé en carte, bouton primaire pleine largeur | ✅ |

---

## 5. Rejoindre un cercle — Saving Program

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Choose a Saving Circle | Choix d'un palier d'épargne prédéfini | Liste de 6 paliers (Lite/Bronze/Silver/Gold/Silver/Silver Saver — montants croissants), montant + cashback max + icône par ligne | Liste de cartes navigables (montant + sous-texte + icône) | ✅ |
| Choose Duration | Choix de la durée (bottom sheet) | 3 cartes sélectionnables (6/12/24 mois) avec mensualité, résumé (Starts on / Payout date / Total payout), CTA | Bottom sheet (réutilise `Sheet` app 1), 3 cartes sélectionnables en ligne, ligne de résumé à 3 colonnes, bouton | ✅ |

---

## 6. Payout Method

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Payout Method | Choix du mode de réception du gain | Liste radio (Digital Wallets / Prepaid Card ["No Charge"] / Bank Transfer ["No Charge"] / Fawry [désactivé, "Not available" + icône info]), CTA | Liste d'options radio avec icône, badge "No Charge", état désactivé, bouton | ✅ |

---

## 7. Payment (onglet 3/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Payment (vide) | Hub paiements | État vide illustré + CTA "Join New Circle", grille "Others" (5 raccourcis : Payout Eligibility, Payment Settings, Payment History, Payment Policy*, Help*) | Illustration + texte + bouton, grille 2 colonnes de cartes-raccourcis (icône+label) | ✅ |
| Payment Eligibility | Checklist des prérequis avant paiement | 4 lignes à statut (✓ vert validé / ⚠ rouge à corriger) + description, séparateur, ligne "Due Payments" (statut seul, pas de chevron) | Liste de lignes à statut coloré (icône check/warning) + chevron conditionnel | ✅ |
| Payment History — Payments | Historique des versements | Toggle Payments/Payouts, liste de transactions (icône, montant, date/heure, description avec mois en lien) | Toggle segmenté, liste de lignes transaction avec icône colorée | ✅ |
| Payment History — Payouts | Idem, onglet Payouts | Même liste, icône différente (reçu vs payé) | Idem, variante icône | ✅ |
| Payment History (vide) | État vide | Illustration + texte + lien "Explore Circles" | Illustration état vide + lien avec flèche | ✅ |
| Payment Settings | Réglages de paiement | Toggle (Deduct pay-in from payout), 2 lignes navigables (Change Payout Method, Saved Cards) | Toggle switch (réutilise `Switch` app 1), lignes navigables avec icône | ✅ |

*Payment Policy et Help référencés dans la grille "Others" mais pas capturés — pas d'écran construit pour eux, à signaler comme lien inerte (cohérent avec le pattern déjà établi sur l'app 1).

---

## 8. Saved Cards

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Saved Cards (rempli) | Gestion des cartes enregistrées | Liste de cartes (logo marque, numéro masqué, radio "carte par défaut", icônes éditer/supprimer), ligne "Add Card" avec logos de marques acceptées | Liste de lignes carte (logo + texte + radio + 2 icônes action), ligne d'ajout | ✅ |
| Saved Cards (vide) | État vide | Illustration + texte | Illustration état vide | ✅ |
| Add Card | Formulaire d'ajout de carte | Champs Card Number, Name on Card, Expiration (Month/Year sur 2 colonnes), Security Code (CVC), CTA "Save" | 4 champs texte (dont 2 champs sur une ligne), bouton | ✅ |

---

## 9. Profile (onglet 4/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Profile | Hub profil | En-tête avatar+nom+téléphone, carte résumé navigable ("Monthly Pay-in Limit"), 4 sections de réglages (Account : Personal Information/My Documents/Invite Friends ; Security : Change Passcode/Enable Biometrics toggle ; Settings : Language ; Support : Get Help), bouton "Log out" | Ligne avatar+identité, carte promo navigable (fond marque), sections de lignes de réglages avec icône, toggle, bouton secondaire pleine largeur | ✅ |

---

## 10. Personal Info

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Personal Info | Édition des infos personnelles | Champs First Name ×2 (probable coquille app 2 : doublon "First Name", à traiter comme First/Last Name), téléphone (sélecteur pays + numéro), email | Champs texte, champ téléphone avec sélecteur pays (drapeau) | ✅ |

---

## 11. My Documents

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| My Documents | Liste des documents à fournir | 6 lignes (National ID, Proof of Income, Utility Bill [badge "New"], Car License, Club ID, Syndicate ID), icône+titre+description+note colorée ("Required to...")+chevron | Liste de lignes navigables avec icône, badge "New", texte d'aide coloré | ✅ |
| Scan National ID | Instructions de scan | Icône, 2 exemples "Don't" (illustrations à éviter), bandeau info, CTA "Scan National ID" (avec icône caméra) | Icône grand format, 2 vignettes d'exemple avec badge "Don't", bandeau info, bouton avec icône | ✅ |
| Proof of Income | Choix du type de justificatif | 2 options radio (HR Letter / Bank Statement) avec icône+titre+description, bandeau info, CTA "Next" | Liste d'options radio avec icône, bandeau info, bouton | ✅ |
| Your Monthly Income | Saisie du revenu mensuel | Affichage montant large ("0 MAD"), CTA désactivé tant que 0 (implique clavier numérique, non visible sur cette capture) | Affichage montant hero, clavier numérique (réutilise `NumericKeypad` app 1), bouton désactivé/activé | ✅ |
| Upload HR Letter | Instructions de scan (document) | Icône, liste à puces (2 conseils), bandeau info, CTA "Scan Document" | Icône, liste à puces, bandeau info, bouton avec icône | ✅ |

---

## 12. Invite Friends

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Invite Friends (Refer a friend) | Parrainage | Titre accrocheur, lien "Track your invitations", 3 étapes numérotées avec icône+titre+description, code de parrainage copiable, CTA "Share your invite" | Liste d'étapes numérotées avec icône, ligne code + icône copier, bouton primaire pleine largeur | ✅ |
| Track Invitations | Suivi du parrainage (sheet) | 3 stats en ligne (Earned/Redeemed/Balance), bandeau info, état vide illustré pour la liste des invités | Bottom sheet (réutilise `Sheet`), ligne de 3 stats, bandeau info, illustration état vide | ✅ |

---

## 13. Change Language

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Change Language | Changement de langue (sheet) | 2 options radio (English/Arabic), CTA "Save" (désactivé si aucun changement) | Bottom sheet, liste radio, bouton | ✅ |

---

## Écarts / éléments non capturés à clarifier avant de coder

- **Étape 4/4 du flux "Join a Game'ya"** (écran de révision/confirmation après "Slot") : absente des captures. À construire par analogie avec la révision "Creating a goal" de l'app 1, ou à sauter directement vers Payout Method ? → **à valider avec toi**.
- **Écran de révision du flux "Saving Program"** après "Choose Duration" : idem, non capturé.
- **"Payment Policy" et "Help"** (grille "Others" de Payment) : référencés mais aucun écran fourni — resteront des liens inertes, comme le pattern déjà établi sur l'app 1 pour les écrans non documentés.
- **"Personal Info"** affiche deux fois le label "First Name" (probable erreur dans la maquette source) : à interpréter comme First Name / Last Name.
- **Contrat, Insurance Note** (mentionnés dans "Payment Eligibility") : pas d'écran de détail capturé pour ces 2 items — resteront des liens inertes.
- **FAB central "+"** (Home/Circles) : mène à "Choose a Service" — à confirmer que c'est le seul point d'entrée du flux Join (pas de bouton "Join now" direct sur une carte de circle recommandé qui sauterait une étape ?).

**Décisions prises pour ne pas bloquer la construction** (exécution
autonome demandée — pas d'invention visuelle, mais choix fonctionnels
raisonnables documentés ici) :
- Étapes 4/4 manquantes (révision Game'ya et Saving Program) : construites
  par analogie avec la sheet de révision "Creating a goal" de l'app 1
  (résumé + bouton de confirmation), puis redirection vers Payout Method.
- Bouton "Join now" sur une carte de circle recommandée (Home/Circles) :
  saute directement dans le flux Game'ya à l'étape "Payout Amount",
  préremplie avec le montant de la carte (le FAB "+" reste le seul point
  d'entrée du choix générique "Choose a Service").
- Personal Info : 2 champs "First Name" traités comme First Name / Last
  Name.
- Payment Policy, Help, Insurance Note, Contract (détail) : aucun écran
  fourni → liens/lignes inertes, pattern déjà établi sur l'app 1.

---

## Étape 2 — Mapping design (app 2 → composants existants de l'app 1)

### Composants existants réutilisés tels quels

| Élément app 2 | Composant app 1 (`src/components/ui/`) |
|---|---|
| Champs de saisie (Sign up, Personal Info, Add Card, montants) | `TextField` (label flottant — remplace les labels statiques de l'app 2, cohérence avec le reste de l'app 1) |
| Code OTP (4 chiffres) | `OtpInput` (prop `length={4}`) |
| Clavier numérique (Verify OTP, Your Monthly Income) | `NumericKeypad` |
| Checkbox "Remember Me" | `Checkbox` |
| Bottom sheets (Choose Duration, Change Language, Track Invitations) | `Sheet` / `SheetContent` / `SheetTitle` / `SheetDescription` |
| Toggle switch (Deduct pay-in from payout, Enable Biometrics) | `Switch` |
| Listes radio (Payout Method, Proof of Income, Change Language, Goal frequency-like) | `RadioGroup` / `RadioGroupItem` |
| Lignes icône+titre+sous-titre+trailing/chevron (My Documents, Profile, Payment Settings, Payment History, Saved Cards) | `ListRow` (déjà extensible via `iconVariant`) |
| Cartes/bandeaux info (Payout Amount info, Monthly pay-in info, upsell referral) | `Card` / `CardTitle` / `CardDescription` |
| Badge "New" (Utility Bill) | `Badge` variant `new` (déjà bleu marque) |
| Bouton primaire/secondaire pleine largeur | `Button` |
| Boutons désactivés en tant que lien (`render={<Link/>}`) | `Button` avec le fix `aria-disabled` déjà en place |

### Composants manquants à créer (dans le style app 1, jamais celui de l'app 2)

| Composant à créer | Usage | Style |
|---|---|---|
| `SegmentedControl` | Toggle Active/Finished (Circles), Payments/Payouts (Payment History) | 2 (ou N) options pill, actif = fond `--color-ink` + texte `--color-paper`, inactif = fond transparent + texte `--color-neutral-500`, même hauteur/rayon que `Button` |
| `Slider` | Payout Amount (montant du circle) | Basé sur `@base-ui/react/slider` (déjà une dépendance) — piste `--color-neutral-200`, portion remplie + poignée `--color-ink`, mêmes tokens que le reste |
| `StepProgress` | Barre d'étapes du flux Join (1/4, 2/4, 3/4...) | Segments rectangulaires arrondis, actif `--color-ink`, inactif `--color-neutral-200` — même esprit que "Step 1 of 2" de l'Onboarding mais visuel (l'app 1 n'a que le texte, ici on ajoute la barre car l'app 2 le montre et c'est une vraie fonctionnalité de repère de progression) |
| `CircleCard` | Carte "cercle" (Home, Circles) | Carte `rounded-card` bordée comme les autres cards app 1 ; montant en `font-heading` bold, frise de progression en segments neutral-200/ink, badge marqueur "Your Turn" en pill `--color-ink`, bouton "Join now" (`Button` size default) ou badge "Joined" (texte vert `--color-brand-green`, cohérent avec les liens de statut positif déjà utilisés) |
| `CategoryCard` | Cartes "Popular Goals" (Home) | Vignette `rounded-card`, fond uni tiré de la palette illustration déjà définie dans `design-tokens.md` (jamais de nouvelle couleur), titre blanc bold en overlay |
| `PromoCarousel` | Bannière "Latest Offers" (Home) | Scroll-snap horizontal natif (pas de librairie tierce, même pattern que `DateWheelPicker`), dots calculés par position de scroll |

### Extension de composant existant (variante, pas de nouveau composant)

- `Badge` : ajout des variants `neutral` (fond `--color-neutral-200`, texte `--color-ink` — pour "No Charge") et `success` (fond `--color-accent-mint`, texte `--color-brand-green` — pour "Zero Fees"/pay-ins discount), en plus du variant `new` existant. Cohérent avec les couleurs déjà en place, aucune nouvelle teinte.
- `ListRow` : ajout d'un prop `status?: "success" | "warning"` pour les lignes à statut de "Payment Eligibility" (icône ✓ verte / ⚠ — en noir/gris comme le reste, pas de rouge, cohérent avec la règle "pas de rouge destructif" déjà actée sur l'app 1 ; le orange/rouge d'alerte de l'app 2 est remplacé par un style neutre + icône `WarningCircle` en `--color-ink`).

### Icônes (Phosphor uniquement, jamais un autre pack)

| Icône app 2 | Composant Phosphor |
|---|---|
| Flamme (streak, header) | `Fire` |
| Cloche notifications | `Bell` (déjà utilisé) |
| Carte scan / ID | `IdentificationCard` |
| Appareil photo (scan) | `Camera` |
| Document / lettre | `FileText` |
| Coche statut ok | `CheckCircle` |
| Avertissement statut à corriger | `WarningCircle` |
| Ciseaux (deduct pay-in) | `Scissors` |
| Cadenas (change passcode) | `LockKey` |
| Empreinte biométrie | `Fingerprint` |
| Globe (Fawry, langue) | `Globe` |
| Enveloppe (email, invite) | `Envelope` |
| Copier (code parrainage) | `Copy` |
| Portefeuille numérique | `Wallet` |
| Carte prépayée | `CreditCard` |
| Banque (déjà utilisé) | `Bank` |
| Éclair (fastest payout) | `Lightning` |
| Horloge/bouclier (lowest fees) | `ClockCountdown` ou `ShieldCheck` (déjà utilisé) |
| Flèche montante (highest return) | `TrendUp` |
| Déconnexion | `SignOut` |

*(à vérifier une par une lors de la construction — remplacer par l'équivalent Phosphor le plus proche si l'un de ces noms n'existe pas)*

### Visuels à générer (Higgsfield, même style que l'app 1)

À lister dans `ASSETS-A-REMPLACER.md` et soumettre en validation groupée
avant génération :
1. Illustration état vide "Circles" (équivalent du personnage qui lève une
   tirelire avec un "?" — déjà présent en fond gris dans les captures,
   sera régénérée dans la palette pastel déjà définie)
2. Illustration état vide "Payment History"
3. Illustration état vide "Saved Cards"
4. Illustration état vide "Invite friends / Invitees"
5. Illustration hero "Welcome to Dart" (mains + pièces) → remplacée par un
   hero dans le style déjà validé (cf. `hero-reach-your-goals.svg`)
6. Illustration "Payment" vide (personnage poches vides)

### Écrans de l'app 1 servant de modèle de mise en page

| Écran app 2 | Modèle app 1 |
|---|---|
| Home (Dart) | `/home` — header icônes + sections titrées + cards |
| Circles | `/set-and-save` — toggle + liste + section "Recommended" |
| Choose a Service | `/set-and-save/create` — 2 cartes de choix de type |
| Payout Amount / Monthly Pay-in / Slot | `/set-and-save/create/details` — formulaire multi-champs + sheets, barre d'étapes façon "Step X of Y" de l'Onboarding |
| Choose a Saving Circle / Choose Duration | `/set-and-save/create/category` (liste) + sheet fréquence de `/set-and-save/create/details` |
| Étapes de révision manquantes | Sheet de révision "Creating a goal" (`/set-and-save/create/details`, section Review) |
| Payout Method | Nouveau, inspiré des listes radio déjà utilisées (agreements, frequency) |
| Payment (hub) | `/set-and-save` (état vide) + `/profile` (sections de raccourcis) |
| Payment Eligibility | `/profile/contact-info` (lignes label/valeur) + statut façon `ListRow` étendu |
| Payment History | `/connected-account/activity` — quasi identique (icône+date+montant) |
| Payment Settings | `/set-and-save` "Low balance protection" (toggle inline) + `/connected-account` (lignes navigables) |
| Saved Cards | `/connected-account` (lignes avec actions) |
| Add Card | `/profile/contact-info/change-email` (formulaire simple + CTA) |
| Profile (Dart) | `/profile` — quasi 1:1, mêmes sections de lignes |
| Personal Info | `/onboarding/personal-info` |
| My Documents | `/profile` (lignes de section, badge "New" comme "More from Oportun") |
| Scan National ID / Upload HR Letter | `/onboarding/face-id` / `/onboarding/notifications` (icône + texte + CTA pleine largeur) |
| Your Monthly Income | `/transfer/amount` — quasi identique (montant hero + clavier) |
| Invite Friends | Étapes numérotées inspirées de `/onboarding/setup/first-goal` + carte referral de `/home` |
| Track Invitations | Sheet de révision `/set-and-save/create/details` |
| Change Language | Sheet fréquence de `/set-and-save/create/details` — quasi identique |

---

## Étape 3 — Construction

Ordre : composants manquants d'abord, puis écrans un par un dans l'ordre
des sections 1 à 13 ci-dessus, `npm run build` + comparaison visuelle
Playwright après chaque écran, commit après chaque écran validé.

### Statut : ✅ les 13 sections construites

Toutes les routes vivent sous `/dart` (préfixe nécessaire pour cohabiter
avec les routes Oportun existantes du même projet — `/home`, `/profile`,
etc. sont déjà pris). Parcours complet testé bout en bout avec Playwright
(build clean, lint clean, zéro erreur console), y compris les mutations
d'état réelles : rejoindre un circle l'ajoute à "Your Circles" (visible
sur Home et Circles), ajouter une carte/la supprimer met à jour "Saved
Cards", changer la langue persiste dans la sheet.

**Restant à faire** (hors scope de cette passe, à traiter séparément) :
- Génération des illustrations Higgsfield (liste ci-dessus, section
  "Visuels à générer") — actuellement remplacées par des icônes Phosphor
  en badge circulaire, mêmes tokens que l'app 1. Validation des prompts à
  soumettre avant génération.
- Vérification fine de chaque icône Phosphor listée à l'Étape 2 (certaines
  ont pu être remplacées par un équivalent proche en cours de construction
  si le nom exact n'existait pas — ex. `WalletX` → `Wallet`).
- Revue croisée écran par écran contre `app-cible/` pour repérer d'éventuels
  détails fonctionnels manqués (l'exercice a été fait à la volée, une passe
  dédiée reste utile).
