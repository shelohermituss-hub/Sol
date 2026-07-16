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
| Splash | Écran de démarrage, logo seul | Aucune, auto-avance | Wordmark centré | ⬜ |
| Welcome (Onboarding) | Value prop, 1er contact | CTA unique | Illustration héro, titre, texte, bouton primaire pleine largeur | ⬜ |
| Sign up | Saisie identifiant | Champ email/téléphone unique (pas de séparation comme app 1), CTA, liens légaux | Champ texte, bouton primaire, texte légal avec 2 liens inline | ⬜ |
| Verify OTP | Vérification du compte | Code 4 chiffres (app 1 : 6), minuteur de renvoi (02:39), lien "Resend", checkbox "Remember Me", clavier numérique custom | OTP input (4 cases), lien, checkbox, clavier numérique | ⬜ |

**Écart notable vs app 1** : un seul champ "Email/Phone" au lieu du flux séparé téléphone → infos perso → mot de passe de l'Onboarding Oportun. OTP à 4 chiffres (pas 6). Pas d'étape mot de passe ni Face ID/notifications dans les captures.

---

## 2. Home (onglet 1/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Home | Hub principal | Carrousel promo ("Latest Offers", dots), bannière parrainage (teaser + chevron), section "Recommended for you" (cartes cercle horizontales scrollables), section "Popular Goals" (cartes catégorie colorées horizontales), icônes notif/streak en en-tête | Carrousel/carte promo, bannière inline cliquable, carte "cercle" (montant, mensualité, bouton "Join now", frise de progression avec marqueur "Your Turn", plage de dates, frais admin), carte catégorie colorée, tab bar 4 onglets + FAB central | ⬜ |

---

## 3. Circles (onglet 2/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Circles (vide) | Liste des cercles actifs | Toggle segmenté Active/Finished, état vide illustré ("Your active circles will appear here!"), section "Recommended for you" (mêmes cartes que Home) | Toggle 2 options (style pill, cf. app 1 "Savings goal/Smart bill"), illustration + texte état vide, carte cercle | ⬜ |
| Circles (rempli) | Idem, avec cercle rejoint | Carte cercle avec badge "Joined" (remplace le bouton "Join now") | Carte cercle, variante "Joined" | ⬜ |

---

## 4. Rejoindre un cercle — Game'ya

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Choose a Service | Choix du type de circle à rejoindre | 2 cartes navigables (Join a Game'ya / Join Saving Program), icône+titre+description+chevron par carte | Carte navigable avec icône emoji/illustration, titre, description, chevron | ⬜ |
| Payout Amount (étape 1/4) | Choix du montant du circle | Barre de progression 4 étapes, slider (3,000–120,000 MAD) avec bornes affichées, carte info avec mini-carrousel (dots), CTA "Next" | Indicateur de progression multi-étapes, slider à poignée unique, carte info avec dots, bouton | ⬜ |
| Monthly Pay-in (étape 2/4) | Choix de la mensualité | Résumé de l'étape précédente (montant + lien "Edit"), liste de 3 options radio (mensualité/durée), bandeau info, CTA | Ligne résumé éditable, liste d'options sélectionnables (radio + chevron), bandeau info | ⬜ |
| Slot / Choose turn (étape 3/4, vide) | Choix du tour de paiement | Résumés des 2 étapes précédentes (avec "Edit"), 3 onglets/cartes (Fastest Payout / Lowest Fees / Highest Return) chacune avec icône+description+tag (fees apply / pay-ins discount), bandeau info | Tabs ou cartes sélectionnables à 3 options, tag coloré, bandeau info | ⬜ |
| Slot / Choose turn (étape 3/4, rempli) | Idem, tab "Highest Return" sélectionné | Cartes de créneaux datées (ex. "March 2025" / "April 2025") sélectionnables, badges ("Zero Fees", remise), bandeau "Admin Fees" + lien "Learn More", CTA dynamique ("Continue with April") | Cartes de sélection de date (2 colonnes), badge, lien avec flèche, bouton avec libellé dynamique | ⬜ |
| *(étape 4/4 — révision/confirmation)* | **Non capturée** — à demander avant de construire, ou à sauter vers Payout Method | — | — | ⬜ |

---

## 5. Rejoindre un cercle — Saving Program

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Choose a Saving Circle | Choix d'un palier d'épargne prédéfini | Liste de 6 paliers (Lite/Bronze/Silver/Gold/Silver/Silver Saver — montants croissants), montant + cashback max + icône par ligne | Liste de cartes navigables (montant + sous-texte + icône) | ⬜ |
| Choose Duration | Choix de la durée (bottom sheet) | 3 cartes sélectionnables (6/12/24 mois) avec mensualité, résumé (Starts on / Payout date / Total payout), CTA | Bottom sheet (réutilise `Sheet` app 1), 3 cartes sélectionnables en ligne, ligne de résumé à 3 colonnes, bouton | ⬜ |

---

## 6. Payout Method

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Payout Method | Choix du mode de réception du gain | Liste radio (Digital Wallets / Prepaid Card ["No Charge"] / Bank Transfer ["No Charge"] / Fawry [désactivé, "Not available" + icône info]), CTA | Liste d'options radio avec icône, badge "No Charge", état désactivé, bouton | ⬜ |

---

## 7. Payment (onglet 3/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Payment (vide) | Hub paiements | État vide illustré + CTA "Join New Circle", grille "Others" (5 raccourcis : Payout Eligibility, Payment Settings, Payment History, Payment Policy*, Help*) | Illustration + texte + bouton, grille 2 colonnes de cartes-raccourcis (icône+label) | ⬜ |
| Payment Eligibility | Checklist des prérequis avant paiement | 4 lignes à statut (✓ vert validé / ⚠ rouge à corriger) + description, séparateur, ligne "Due Payments" (statut seul, pas de chevron) | Liste de lignes à statut coloré (icône check/warning) + chevron conditionnel | ⬜ |
| Payment History — Payments | Historique des versements | Toggle Payments/Payouts, liste de transactions (icône, montant, date/heure, description avec mois en lien) | Toggle segmenté, liste de lignes transaction avec icône colorée | ⬜ |
| Payment History — Payouts | Idem, onglet Payouts | Même liste, icône différente (reçu vs payé) | Idem, variante icône | ⬜ |
| Payment History (vide) | État vide | Illustration + texte + lien "Explore Circles" | Illustration état vide + lien avec flèche | ⬜ |
| Payment Settings | Réglages de paiement | Toggle (Deduct pay-in from payout), 2 lignes navigables (Change Payout Method, Saved Cards) | Toggle switch (réutilise `Switch` app 1), lignes navigables avec icône | ⬜ |

*Payment Policy et Help référencés dans la grille "Others" mais pas capturés — pas d'écran construit pour eux, à signaler comme lien inerte (cohérent avec le pattern déjà établi sur l'app 1).

---

## 8. Saved Cards

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Saved Cards (rempli) | Gestion des cartes enregistrées | Liste de cartes (logo marque, numéro masqué, radio "carte par défaut", icônes éditer/supprimer), ligne "Add Card" avec logos de marques acceptées | Liste de lignes carte (logo + texte + radio + 2 icônes action), ligne d'ajout | ⬜ |
| Saved Cards (vide) | État vide | Illustration + texte | Illustration état vide | ⬜ |
| Add Card | Formulaire d'ajout de carte | Champs Card Number, Name on Card, Expiration (Month/Year sur 2 colonnes), Security Code (CVC), CTA "Save" | 4 champs texte (dont 2 champs sur une ligne), bouton | ⬜ |

---

## 9. Profile (onglet 4/4)

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Profile | Hub profil | En-tête avatar+nom+téléphone, carte résumé navigable ("Monthly Pay-in Limit"), 4 sections de réglages (Account : Personal Information/My Documents/Invite Friends ; Security : Change Passcode/Enable Biometrics toggle ; Settings : Language ; Support : Get Help), bouton "Log out" | Ligne avatar+identité, carte promo navigable (fond marque), sections de lignes de réglages avec icône, toggle, bouton secondaire pleine largeur | ⬜ |

---

## 10. Personal Info

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Personal Info | Édition des infos personnelles | Champs First Name ×2 (probable coquille app 2 : doublon "First Name", à traiter comme First/Last Name), téléphone (sélecteur pays + numéro), email | Champs texte, champ téléphone avec sélecteur pays (drapeau) | ⬜ |

---

## 11. My Documents

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| My Documents | Liste des documents à fournir | 6 lignes (National ID, Proof of Income, Utility Bill [badge "New"], Car License, Club ID, Syndicate ID), icône+titre+description+note colorée ("Required to...")+chevron | Liste de lignes navigables avec icône, badge "New", texte d'aide coloré | ⬜ |
| Scan National ID | Instructions de scan | Icône, 2 exemples "Don't" (illustrations à éviter), bandeau info, CTA "Scan National ID" (avec icône caméra) | Icône grand format, 2 vignettes d'exemple avec badge "Don't", bandeau info, bouton avec icône | ⬜ |
| Proof of Income | Choix du type de justificatif | 2 options radio (HR Letter / Bank Statement) avec icône+titre+description, bandeau info, CTA "Next" | Liste d'options radio avec icône, bandeau info, bouton | ⬜ |
| Your Monthly Income | Saisie du revenu mensuel | Affichage montant large ("0 MAD"), CTA désactivé tant que 0 (implique clavier numérique, non visible sur cette capture) | Affichage montant hero, clavier numérique (réutilise `NumericKeypad` app 1), bouton désactivé/activé | ⬜ |
| Upload HR Letter | Instructions de scan (document) | Icône, liste à puces (2 conseils), bandeau info, CTA "Scan Document" | Icône, liste à puces, bandeau info, bouton avec icône | ⬜ |

---

## 12. Invite Friends

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Invite Friends (Refer a friend) | Parrainage | Titre accrocheur, lien "Track your invitations", 3 étapes numérotées avec icône+titre+description, code de parrainage copiable, CTA "Share your invite" | Liste d'étapes numérotées avec icône, ligne code + icône copier, bouton primaire pleine largeur | ⬜ |
| Track Invitations | Suivi du parrainage (sheet) | 3 stats en ligne (Earned/Redeemed/Balance), bandeau info, état vide illustré pour la liste des invités | Bottom sheet (réutilise `Sheet`), ligne de 3 stats, bandeau info, illustration état vide | ⬜ |

---

## 13. Change Language

| Écran | Rôle | Fonctionnalités | Éléments UI nécessaires | Statut |
|---|---|---|---|---|
| Change Language | Changement de langue (sheet) | 2 options radio (English/Arabic), CTA "Save" (désactivé si aucun changement) | Bottom sheet, liste radio, bouton | ⬜ |

---

## Écarts / éléments non capturés à clarifier avant de coder

- **Étape 4/4 du flux "Join a Game'ya"** (écran de révision/confirmation après "Slot") : absente des captures. À construire par analogie avec la révision "Creating a goal" de l'app 1, ou à sauter directement vers Payout Method ? → **à valider avec toi**.
- **Écran de révision du flux "Saving Program"** après "Choose Duration" : idem, non capturé.
- **"Payment Policy" et "Help"** (grille "Others" de Payment) : référencés mais aucun écran fourni — resteront des liens inertes, comme le pattern déjà établi sur l'app 1 pour les écrans non documentés.
- **"Personal Info"** affiche deux fois le label "First Name" (probable erreur dans la maquette source) : à interpréter comme First Name / Last Name.
- **Contrat, Insurance Note** (mentionnés dans "Payment Eligibility") : pas d'écran de détail capturé pour ces 2 items — resteront des liens inertes.
- **FAB central "+"** (Home/Circles) : mène à "Choose a Service" — à confirmer que c'est le seul point d'entrée du flux Join (pas de bouton "Join now" direct sur une carte de circle recommandé qui sauterait une étape ?).

---

## Prochaine étape

Étape 2 (mapping design) : pour chaque élément listé ci-dessus, indiquer le
composant existant de `src/components/ui/` à réutiliser, lister les
composants manquants à créer dans le style de l'app 1, et identifier les
écrans de l'app 1 pouvant servir de modèle de mise en page. **En attente de
ta validation de ce document avant de continuer.**
