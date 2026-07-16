# INVENTAIRE.md — Oportun iOS (reproduction Next.js)

> Basé sur l'analyse visuelle des 86 captures d'écran fournies (15 flows),
> extraites dans `design-refs/`. Chaque capture porte un bandeau de curation
> "Oportun · curated by Mobbin" en bas — c'est un habillage de l'outil Mobbin,
> **pas** une partie de l'app à reproduire, à ignorer partout.
>
> Statuts : ⬜ à faire / 🟡 en cours / ✅ validé
>
> **Racine de l'app** : `/` redirige vers `/onboarding` (splash) pour
> reproduire fidèlement un vrai premier lancement — impossible d'atteindre
> Home sans traverser Onboarding et/ou Login. Le Home réel vit sur `/home`.

---

## 1. Liste des écrans identifiés

### Onboarding (14 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Splash (logo seul) | `/onboarding` | 🟡 |
| 1 | Écran d'accueil / value prop ("Reach for your goals effortlessly") | `/onboarding/welcome` | 🟡 |
| 2-3 | Saisie numéro de téléphone (vide → rempli) | `/onboarding/phone` | 🟡 |
| 4-5 | Formulaire infos perso (prénom/nom/email + consentement) (vide → rempli) | `/onboarding/personal-info` | 🟡 |
| 6-7 | Création mot de passe (vide → checklist de validation) | `/onboarding/password` | 🟡 |
| 8-10 | Code OTP (vide → partiellement rempli → soumission/loading) | `/onboarding/otp` | 🟡 |
| 11 | Prompt Face ID | `/onboarding/face-id` | 🟡 |
| 12 | Prompt notifications (avec mockup iPhone) | `/onboarding/notifications` | 🟡 |
| 13 | Upsell "Set & Save" (paywall-like, 3 bénéfices) | `/onboarding/upsell` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright, tous états : vide,
rempli, erreurs de validation, loading) contre `design-refs/`, match proche.
Parcours complet cliquable : `/onboarding` (splash, redirige seul après
1,2s) → `/welcome` → `/phone` → `/personal-info` → `/password` → `/otp`
(auto-soumission dès le 6e chiffre) → `/face-id` → `/notifications` →
`/upsell` → `/home` (Home). Écarts connus : icône Face ID = Phosphor
`ScanSmiley` (pas d'équivalent exact) ; mockup iPhone de l'écran
notifications recréé en HTML/CSS (pas d'asset source) ; icône fleur de
l'écran upsell recréée à la main en SVG
(`components/icons/savings-flower-icon.tsx`), approximation des couleurs
échantillonnées sur la capture. Boutons "Log in" (accueil), "Resend" et
"Request a voice call" (OTP) sans écran cible construit — inertes, texte
stylé uniquement (pattern cohérent avec le reste du projet). Le flux
"Logging in" (accueil → mot de passe existant) n'est pas construit, seul le
flux "Sign up" l'est.

**Composant ajouté** : `SavingsFlowerIcon` (`components/icons/`), recréation
SVG à la main de l'icône fleur/pièce de l'écran upsell, pas d'équivalent
Phosphor. `TextField`, `OtpInput` et `Checkbox` (déjà présents depuis
l'Étape 4) réutilisés tels quels sans modification.

**Piège rencontré** : `Button` (`@base-ui/react/button`) émet un
avertissement runtime ("expected a native `<button>`") quand on lui passe
`render={<Link ... />}` sans préciser `nativeButton={false}` — la prop
`nativeButton` est vraie par défaut. Ajouté sur tous les boutons-liens de
l'Onboarding.

### Logging in (7 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Écran d'accueil (identique à Onboarding #1) | `/onboarding/welcome` | 🟡 |
| 1-2 | Formulaire login (vide → rempli, toggle Face ID) | `/login` | 🟡 |
| 3-5 | Code OTP (vide → rempli → loading) | `/login/otp` | 🟡 |
| 6 | Home / dashboard (post-login) | `/home` | 🟡 (déjà construit, Étape 5) |

🟡 = codé + comparé visuellement (capture Playwright, tous états) contre
`design-refs/`. Parcours cliquable : `/onboarding/welcome` → "Log in" →
`/login` → `/login/otp` (auto-soumission dès le 6e chiffre) → `/home` (Home,
déjà construit). Le bouton "Log in" du formulaire s'active dès que le champ
email/téléphone est renseigné, fidèle à la capture 2 où il est déjà noir
alors que le mot de passe est vide. "Forgot password" et le toggle "Log in
with Face ID" (réutilise `Switch`) n'ont pas d'écran/flux cible construit —
restent décoratifs. La capture 6 (Home post-login) montre un état de
données différent (soldes à $0, 2 buts) de celui déjà codé sur `/home` — pas de
nouvel écran créé, simple confirmation que le login redirige vers le Home
existant.

### Home (5 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Onglet "Set & Save" (vide) | `/set-and-save` | 🟡 (état rempli construit, pas l'état $0 séparément — mêmes composants, données à zéro) |
| 1 | Onglet "Home" (vide, $0.00) | `/home` | 🟡 (idem) |
| 2 | Onglet "Home" (rempli, $3.00, tri par échéance) | `/home` | 🟡 |
| 3-4 | Home scrollé — carte parrainage + "More from Oportun" + footer légal | `/home` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright) contre `design-refs/`,
match proche. Écarts connus : icônes de but (Rainy Day/Emergency
cushion/Cell phone) et icônes "More from Oportun" (jauge crédit/tirelire) en
Phosphor coloré, pas les illustrations plates fidèles au design (cf.
design-tokens.md, section Icônes — recréation SVG prévue plus tard). Bouton
"Get $5", icône profil, "Create goal", "Transfer money", "Invite friends" et
liens "Click here"/articles "More from Oportun" navigent vers des écrans pas
encore construits — inertes pour l'instant (pattern cohérent avec le reste du
projet). Montants/comptes en dur (`src/lib/goals-data.ts`), pas de vraies
données.

**Composant ajouté** : `ListRow` étend un prop `iconVariant` ("circle" |
"square") pour les badges colorés des articles "More from Oportun".
`GoalIcon` (`components/sections/goal-icon.tsx`) mappe les buts à une icône
Phosphor colorée. `src/lib/goals-data.ts` centralise les buts, partagés entre
`/home` et `/set-and-save`.

**Bug corrigé en cours de route** : `ListRow` tronquait titres/sous-titres
(`truncate`) au lieu de les laisser passer à la ligne — cassait "Emergency
cushion", "Low balance protection" et les titres d'articles à 375px. Corrigé
en retirant `truncate` (le composant est utilisé par plusieurs futurs écrans,
fix global).

### Creating a goal (home) (12 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Home (point d'entrée) | `/home` | 🟡 |
| 1 | Choix type de but ("Savings goal" / "Smart bill") | `/set-and-save/create` | 🟡 |
| 2 | Choix catégorie de facture | `/set-and-save/create/category` | 🟡 |
| 3 | Formulaire détails du but (vide) | `/set-and-save/create/details` | 🟡 |
| 4-5 | Bottom sheet fréquence (non sélectionné → sélectionné) | idem (sheet) | 🟡 |
| 6-7 | Date picker natif iOS (roue Mois/Jour/Année) | idem (sheet) | 🟡 |
| 8 | Formulaire détails (rempli) | idem | 🟡 |
| 9-10 | Écran de révision (résumé + "How we'll save") | idem (sheet) | 🟡 |
| 11 | Home + bandeau succès "goal created" | `/home?created=1` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright, tous états et
interactions) contre `design-refs/`. Fréquence, date et révision sont des
bottom sheets (`Sheet`) superposées au formulaire `/set-and-save/create/details`,
pas des routes séparées — fidèle aux captures où le formulaire reste
visible assombri derrière chaque sheet. "Savings goal" (écran 1) mène
directement au formulaire générique (icône crayon, nom vide) ; "Smart
bill" passe par la catégorie puis préremplit nom/icône via query params.
Aucune capture ne documente un formulaire "Savings goal" distinct — les
deux entrées convergent sur le même formulaire (avec fréquence), seule
forme capturée ; hypothèse non confirmée, à corriger si une référence
contredit ce choix. "Learn about Smart bills" (écran 1) et
"authorization" (écran 9-10) sans écran cible construit, restent
décoratifs.

**État partagé ajouté** : `GoalsProvider`/`useGoals` (`src/lib/goals-context.tsx`),
contexte React posé dans `layout.tsx`, remplace les imports statiques
`GOALS`/`TOTAL_SAVED` sur `/home` et `/set-and-save` — nécessaire pour que
"Confirm & create goal" ajoute réellement un but visible sur les deux
onglets. En mémoire uniquement (pas de backend), réinitialisé au
rechargement.

**Composants ajoutés** : `DateWheelPicker` (`components/ui/date-wheel-picker.tsx`),
roue de sélection de date à 3 colonnes (scroll-snap CSS natif + fondu par
mask-image), pas de librairie tierce. `GoalIcon`/`Goal.icon` étendus avec
5 icônes de catégorie (house/lightbulb/car/bank/pencil), toujours des
approximations Phosphor unies (voir gap déjà documenté pour Home/Set&Save).

**Bug corrigé en cours de route** : `SheetContent` (`components/ui/sheet.tsx`)
n'avait pas `overflow-y-auto` — tout contenu dépassant `max-h-[85vh]`
(le cas de la sheet de révision) était coupé et son bouton bas
inatteignable. Fix global, affecte toutes les sheets futures.

### Goal detail (3 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Home (point d'entrée) | `/home` | 🟡 |
| 1 | Détail but simple ("Rainy Day", solde, transferts en attente) | `/set-and-save/[goalId]` | 🟡 |
| 2 | Détail but récurrent "Smart bill" ("Cell phone", carte fréquence/montant/échéance + callout info) | `/set-and-save/[goalId]` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright) contre `design-refs/`.
Les lignes de but sur `/home` et `/set-and-save` sont maintenant cliquables
(`render={<Link href="/set-and-save/[id]" />}` sur `ListRow`, sans chevron —
fidèle aux captures qui n'en montrent pas sur ces lignes précises). Le
solde affiché est celui réel de `useGoals()`, pas le montant figé de la
capture (mêmes buts, montants différents selon l'instantané de démo — écart
déjà documenté sur Home). Carte fréquence/montant/échéance et callout info
n'apparaissent que pour les buts `recurring` (Smart bill). "Add money" et
l'icône réglages n'ont pas d'écran cible construit (flux "Transferring
money" pas encore fait), restent décoratifs. Un but créé via le flux
"Creating a goal" a maintenant `targetAmount`/`frequency` renseignés
(alignés sur cet écran) mais pas de `pendingTransfers` (donnée non
disponible/non inventée) — la section "Goal activity" est masquée dans ce
cas plutôt que d'afficher une transaction fictive.

### Completing account setup (8 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Intro / paywall "Set & Save" | `/onboarding/upsell` (écran partagé) | 🟡 |
| 1-2 | Connexion compte bancaire (Plaid) — avant/après connexion | `/onboarding/setup/connect-bank` | 🟡 |
| 3-4 | Revue des accords (2 checkboxes, non coché → coché) | `/onboarding/setup/agreements` | 🟡 |
| 5 | Écran de transition/chargement pédagogique | `/onboarding/setup/transition` | 🟡 |
| 6 | Confirmation création du 1er but ("Rainy Day") | `/onboarding/setup/first-goal` | 🟡 |
| 7 | Dashboard Set & Save (post-onboarding) | `/set-and-save` (déjà construit) | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright, parcours complet
cliqué de bout en bout) contre `design-refs/`. Découverte importante :
l'écran 0 est identique à `/onboarding/upsell` (Onboarding #13) — "Get
started" y menait jusqu'ici directement à l'accueil ; il enchaîne
maintenant sur ce flux de connexion bancaire avant d'atteindre l'accueil,
ce qui est le vrai parcours complet. "Connect bank" simule une connexion
Plaid instantanée (pas de vraie intégration tierce). Icône Bank générique
plutôt que le logo Bank of America (marque déposée, cf.
ASSETS-A-REMPLACER.md). L'écran 6 est une confirmation visuelle du but
"Rainy Day" déjà présent dans la graine `useGoals()` — pas de second ajout
pour éviter un doublon. Illustration de l'écran 5
(`educational-transition.svg`) déjà générée à l'Étape 3, utilisée ici pour
la première fois. Liens verts légaux (Privacy Policy, Plaid, Subscription
Fee Agreement, etc.) sans écran cible construit, restent décoratifs.

### Transferring money (8 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Home (point d'entrée) | `/home` | 🟡 |
| 1-2 | Sélection compte source/destination (vide → rempli) | `/transfer` | 🟡 |
| 3-4 | Saisie montant (clavier numérique, $0 → $1) | `/transfer/amount` | 🟡 |
| 5 | Révision du transfert | `/transfer/review` | 🟡 |
| 6 | Confirmation "Transfer submitted!" | `/transfer/submitted` | 🟡 |
| 7 | Home mis à jour (soldes actualisés) | `/home` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright, parcours complet
cliqué de bout en bout, y compris vérification que les soldes bougent
réellement) contre `design-refs/`. "From" n'a qu'une seule option dans
cette reproduction (le compte bancaire connecté, seul compte du projet) —
la sheet s'ouvre quand même pour rester fidèle à l'interaction montrée.
"To" liste tous les buts existants (pas de transfert but→but ou vers le
compte bancaire, non documenté dans les captures). "Make transfer" crédite
réellement le but visé (`useGoals().addToGoalAmount`) et débite le solde du
compte connecté (`useAccount().withdraw`) — vérifié sur Home, Set & Save et
Connected account après un transfert. Icône de l'écran 6 approximée en
Phosphor `PaperPlaneTilt` (pas d'équivalent exact au pictogramme de la
capture).

**Composant ajouté** : `NumericKeypad` (`components/ui/numeric-keypad.tsx`),
clavier 1-9/./0/retour arrière, réutilisable pour de futurs écrans de
saisie de montant.

**État partagé étendu** : `useGoals()` gagne `addToGoalAmount(goalId,
amount)` ; `useAccount()` gagne `availableBalance`/`withdraw(amount)`
(remplace la constante statique `ACCOUNT_AVAILABLE_BALANCE`, désormais
seulement la valeur de départ). Home et Connected account lisent le solde
depuis le contexte.

**Bug corrigé en cours de route** : `Button` stylait l'état `disabled`
uniquement via le pseudo-sélecteur CSS `:disabled`, qui ne s'applique
jamais à un `<a>` — un bouton désactivé combiné à `render={<Link .../>}`
(`nativeButton={false}`) restait visuellement noir/actif alors que le clic
était bien bloqué en pratique (Base UI pose `aria-disabled` sur les
éléments non natifs). Ajouté les variantes `aria-disabled:*` en plus de
`disabled:*` dans `buttonVariants` — fix global, affecte tous les futurs
boutons-liens désactivés.

### Set & save (3 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Dashboard Set & Save (état $0) | `/set-and-save` | 🟡 |
| 1-2 | Scrollé — liste des buts + ligne "Low balance protection" (toggle) | `/set-and-save` | 🟡 |

Même page que "Home #0" ci-dessus (états de scroll de `/set-and-save`), pas de
nouvel écran distinct. Ligne "Low balance protection" : pastille verte "On" +
chevron construits, mais navigue vers un écran de réglage pas encore
construit (`/set-and-save/low-balance-protection`, inerte pour l'instant).

### Changing an email (6 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Contact info (point d'entrée) | `/profile/contact-info` | 🟡 |
| 1-2 | Formulaire changement email (vide → rempli) | `/profile/contact-info/change-email` | 🟡 |
| 3 | Écran "Verify your email" (lien envoyé) | idem (état local) | 🟡 |
| 4 | Contact info + bandeau succès | `/profile/contact-info?updated=1` | 🟡 |
| 5 | Contact info (état stabilisé) | `/profile/contact-info` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright, parcours complet
cliqué) contre `design-refs/`. "Change email" et "Verify your email" sont
un seul écran à deux états locaux (`step`), pas deux routes — le titre de
la barre de nav et le contenu changent, fidèle aux captures qui montrent
la même structure de navigation. Aucune capture ne montre de bouton pour
continuer depuis "Verify your email" (l'utilisateur cliquerait le lien
reçu par email dans la vraie app) — auto-avance après 2s, même pattern que
le splash `/onboarding` et l'écran de transition "Completing account
setup". "Resend" et "Change" sur Phone n'ont pas de comportement démontré/
d'écran cible construit, restent décoratifs.

**État partagé ajouté** : `ProfileProvider`/`useProfile`
(`src/lib/profile-context.tsx`), posé dans `layout.tsx`. Nom complet et
téléphone statiques (pas de flux "Changing a name"/"Changing a phone"
documenté) ; seul l'email est éditable et persiste réellement après le
cycle changement → vérification → retour.

### Connected account detail (4 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Home (contexte) | `/home` | 🟡 |
| 1-2 | Détail compte connecté (variantes) | `/connected-account` | 🟡 |
| 3 | Historique des transactions (liste complète) | `/connected-account/activity` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright) contre
`design-refs/`. Les captures 1 et 2 montrent deux instantanés de démo
différents (nom "Adv Plus Banking" vs "Mobbin bank", "Safe saving level"
vide vs "$10,000") — on retient la variante la plus complète (2) comme état
initial. Icône Bank générique plutôt que le logo Bank of America (marque
déposée). La ligne "Bank of America" sur Home est désormais cliquable.
"Safe saving level" affiche un chevron dans la capture mais n'a pas d'écran
cible dans les 15 flows documentés, reste décoratif. "Remove account" mène
au flux "Removing an account" (pas encore construit), reste décoratif.

**État partagé ajouté** : `AccountProvider`/`useAccount`
(`src/lib/account-context.tsx`), posé dans `layout.tsx` à côté de
`GoalsProvider` — tient le nom éditable du compte, partagé avec le flux
"Editing an account name". `src/lib/account-data.ts` centralise le solde,
la date de sync et les 9 transactions de démo (statiques, non éditables).

### Editing an account name (4 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Détail compte (point d'entrée) | `/connected-account` | 🟡 |
| 1-2 | Édition du nom (2 comptes en exemple) | `/connected-account/edit-name` | 🟡 |
| 3 | Détail compte (post-sauvegarde) | `/connected-account` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright, cycle complet
édition → sauvegarde → retour) contre `design-refs/`. Un seul compte réel
dans cette reproduction (contre 2 "exemples" dans les captures) — le champ
part de la valeur courante et se sauvegarde via `useAccount()`, visible
immédiatement sur `/connected-account` au retour. Champ texte simple
(`Input`), pas de label flottant — fidèle à la capture qui n'en montre
pas, contrairement aux autres formulaires de l'app.

### Removing an account (4 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Détail compte (point d'entrée) | `/connected-account` | 🟡 |
| 1 | Bottom sheet confirmation "Remove account?" | idem (sheet) | 🟡 |
| 2 | Liste comptes + bandeau succès "Account removed!" | `/profile/connected-accounts?removed=1` | 🟡 |
| 3 | Liste comptes (état vide) | `/profile/connected-accounts` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright, cycle complet
suppression → bandeau → état stabilisé, et vérifié que la section
"Connected account" disparaît de Home) contre `design-refs/`. Nouvelle
route `/profile/connected-accounts` (liste, pluriel) distincte de
`/connected-account` (détail, un seul compte dans cette reproduction) —
la ligne "Bank of America" y disparaît une fois `useAccount().removed`
vrai, ne laissant que "Add account" (décoratif, pas de flux d'ajout
construit). Le montant du transfert de retour dans la sheet utilise le
vrai `totalSaved` de `useGoals()`, pas le "$0.00" figé de la capture.

### Contact information (2 captures)
| # | Écran | Route | Statut |
|---|---|---|---|
| 0 | Menu "Profile & settings" | `/profile` | 🟡 |
| 1 | Contact info (détail) | `/profile/contact-info` | 🟡 |

🟡 = codé + comparé visuellement (capture Playwright) contre
`design-refs/`. Construit comme point d'entrée nécessaire du flux
"Changing an email". Icônes profil (Home) et réglages (Set & Save),
jusqu'ici décoratives, mènent maintenant à `/profile`. Seules les lignes
"Contact information" et "Connected accounts" mènent à un écran construit
— "Subscription", "Notifications", "Security", "Link my loan", "Set &
Save statements", "ACH & autopay agreements", "Legal notices" ne sont pas
dans les 15 flows documentés (ou pas encore construits), restent
décoratives.

### Subscription (3 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Écran abonnement (plan actuel + upsell annuel) | ⬜ |
| 1 | Scrollé — section confiance + support | ⬜ |
| 2 | Home (contexte carte parrainage) | ⬜ |

### Invite friends (3 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Home (point d'entrée) | ⬜ |
| 1 | Écran principal parrainage (stats + accordéons) | ⬜ |
| 2 | Scrollé — "How it works" déplié | ⬜ |

**Total : 15 flows, ~50 écrans uniques (hors doublons/états de contexte réutilisés), 86 captures.**

---

## 2. Composants récurrents

- **Bouton primaire** : pill noir plein, texte blanc gras, pleine largeur. État désactivé = gris clair.
- **Bouton secondaire** : fond blanc, bordure noire ~1.5px, texte noir gras, même forme pill.
- **Lien texte** : vert (couleur de marque), utilisé pour tous les liens inline (Change, Resend, Cancel, mentions légales, "help@oportun.com").
- **Champ de saisie** : rectangle arrondi, bordure gris clair, label flottant qui remonte au-dessus de la valeur une fois rempli, icône trailing optionnelle (œil pour mot de passe, "X" pour effacer).
- **Barre de navigation** : 3 variantes — (a) flèche retour + titre centré ; (b) flèche retour + lien "Cancel" vert (formulaires abandonnables) ; (c) icône "X" (modales/interstitiels plein écran).
- **OTP input** : 6 cases individuelles bordées, case active = bordure noire.
- **Checkbox** : carré arrondi, non coché = contour gris, coché = vert plein + coche blanche.
- **Toggle switch** : style iOS standard.
- **Ligne de liste (list row)** : icône circulaire (avatar/illustration) + titre gras + sous-titre gris optionnel + élément trailing (chevron, montant, badge), séparateur fin entre lignes. Réutilisée pour : buts d'épargne, comptes connectés, transactions, articles "More from Oportun".
- **Badge pill "NEW"** : fond bleu, texte blanc gras.
- **Carte (card)** : fond blanc, bordure fine gris clair, coins arrondis ~16px.
- **Bottom sheet / modale** : fond blanc, coins hauts arrondis, poignée grise centrée, dimming du fond ; utilisé pour sélecteurs (fréquence), confirmation (suppression de compte), révision.
- **Sélecteur de date natif iOS** : roue à 3 colonnes (Mois/Jour/Année), lien bleu "Confirm" (style natif, seul usage du bleu iOS natif hors design system app).
- **Clavier numérique** : boutons texte sans fond, grille 4x3, pour saisie de montant.
- **Bandeau succès (toast inline)** : bandeau noir pleine largeur, icône coche blanche + texte blanc, pousse le contenu (pas de flottant/overlay).
- **Onglet du bas (bottom tab bar)** : 2 onglets visibles "Home" / "Set & Save", actif = icône pleine + label gras noir, inactif = icône outline + gris.
- **Icône de catégorie/but** : cercle contouré contenant une illustration plate 2-3 couleurs (parapluie, nuage-éclair, téléphone, maison, ampoule, voiture, tirelire...).
- **Accordéon** : label gras + bouton chevron circulaire (bas = replié, haut = déplié).

### Constat important — pas de rouge destructif
Le flow "Removing an account" n'utilise **aucune couleur rouge** : la modale de confirmation, le texte d'avertissement et le bouton de confirmation reprennent le noir/blanc/gris standard de l'app. Si le design system Figma définit un token rouge destructif, vérifier s'il s'applique ailleurs — ces captures n'en montrent aucun usage.

---

## 3. États visibles (par écran)

Voir tableaux ci-dessus par flow — la majorité des écrans à formulaire montre au moins 2 états : **vide/désactivé** puis **rempli/activé**. Écrans avec bouton "Submit"/OTP montrent en plus un état **loading** (spinner blanc centré). Les flows de suppression/mise à jour montrent un état **succès** (bandeau noir + coche). Le flow de suppression de compte montre en plus l'état **vide** (liste de comptes réduite à "Add account").

---

## 4. Visuels à traiter

### Logo
- Wordmark "Oportun" (minuscule, noir, point vert sur le "O") — écran splash.
- Icône de marque circulaire ("O" + point vert) — utilisée en petit dans les notifications.
- → à recadrer proprement depuis la capture la plus nette, **ne pas régénérer**. Sera listé dans `ASSETS-A-REMPLACER.md`.

### Icônes (à identifier pack d'origine / recréer en SVG)
Chevron, flèche retour, croix de fermeture, œil (mdp), corbeille/suppression, engrenage (réglages), profil (silhouette), cloche, "+" cercle pointillé, chevrons haut/bas (accordéon), icône Face ID, icône info "i", bouclier-coche (low balance protection), point d'interrogation (aide).

### Illustrations (flat, palette pastel : lavande, vert menthe, bleu ciel, corail/saumon)
- Illustration héro "Reach for your goals" (femme + chat + vignettes circulaires : voiture, sac, café, valise).
- Icône fleur-pièce (motif Set & Save, fond pêche).
- Illustration écran transition/pédagogique (2 personnages, calculatrice, graphique, jauge — fond vert pâle).
- Illustration parrainage (2 personnages + accents décoratifs).
- Illustration héro "Invite friends" (5-6 personnages + call-outs).
- Petites icônes de features (Subscription) : tirelire, document $, banque, cadenas, pot+pièce, main+téléphone.
- Petites icônes articles "More from Oportun" (jauge crédit, tirelire, "ñ" violet).
- Icône succès transfert (feuille/sparkle vert, pas une coche générique).
- Logo tiers **Bank of America** (mark rouge/bleu) et badges **BBB A+**, **Bankrate** — marques tierces réelles, à conserver identiques ou signaler pour remplacement selon droits d'usage.

Tout élément listé ci-dessus qui nécessite une génération IA (illustrations) sera soumis à validation groupée (prompts détaillés) avant génération, conformément à l'Étape 3 du prompt.

---

## Prochaine étape

En attente de validation de cet inventaire avant de démarrer l'Étape 2
(extraction du design system : couleurs exactes, police, échelle d'espacements).
