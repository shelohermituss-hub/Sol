# INVENTAIRE.md — Reskin Cash App → Sòlid

> Historique : ce projet a déjà tenté une reproduction Cash App une première
> fois (voir commits `f481fa5`…`fff4280`), entièrement supprimée (`52011ee`,
> « Repartir de zéro »), puis reconstruite sur une base Oportun/Dart qui a
> donné l'app Sòlid actuelle (voir `INVENTAIRE-OPORTUN-ARCHIVE.md` et
> `FONCTIONNEL.md` pour cette phase). Décision prise le 2026-07-18, en
> connaissance de cet historique : reskin de la coquille visuelle vers un
> style Cash App, en conservant tout le contenu fonctionnel Sòlid déjà
> construit (routes `src/app/dart/**`, données, currency HTG, etc.).
>
> Statuts : ⬜ à faire / 🟡 en cours / ✅ validé

## ⚠️ Ce qui n'est PAS reproduit

Les captures dans `design-refs/` sont des écrans réels de Cash App (Block,
Inc.), quasi certainement issus d'une capture Mobbin (placeholders
`judy.mobbin@gmail.com`, version exacte `4.7.1 (4071001)`, texte légal
« Brokerage services provided by Cash App Investing LLC, member FINRA /
SIPC »). Ne sont **jamais** repris verbatim :
- Le nom « Cash App », le symbole `$Cashtag`, le domaine `cash.app/...`
- Le logo Cash App (placeholder générique à la place)
- Les logos tiers (Nike, GE, Coca-Cola, Walmart, Meta, MarketWatch, CNBC,
  Twitter, Instagram)
- Les textes légaux/réglementaires spécifiques (FINRA/SIPC, W-9...)
- Les fonctionnalités Stocks/Bitcoin/Investing (hors périmètre tontine —
  seuls certains *patterns* d'écran, ex. clavier de montant, sont réutilisés)

Ce qui est réutilisé : la structure, les proportions, l'échelle
d'espacement, les types de composants (cartes arrondies, clavier
numérique plein écran, bottom sheet, tab bar à 5 icônes, list row).

## Écrans sources (21 captures, `design-refs/`)

### `2023-community/` — Home / Argent
| Fichier | Contenu | Pattern réutilisé pour Sòlid |
|---|---|---|
| Home.png | Solde principal, Add Cash/Cash Out, cartes Savings/Bitcoin/Stocks/Tax | Home : solde total, boutons Contribuer/Retirer, cartes Circles |
| Add cash.png | Bottom sheet montants rapides | Bottom sheet montant de contribution (HTG, MonCash) |
| Payment details.png | Montant + destinataire + note + mode + contacts suggérés | Écran de contribution vers un groupe |
| Enter PIN.png | Clavier PIN 4 chiffres | Écran PIN Sòlid |
| Stocks 1-2.png / Stocks 2-2.png / Stock details.png | Bourse (hors périmètre) | — |
| Buy stock.png | Bottom sheet montant d'achat | Pattern bottom sheet montant générique |
| Pay amount.png | Clavier montant plein écran, fond coloré | Clavier montant HTG plein écran |
| Deposit amount.png | Clavier montant fond blanc | Variante clavier dépôt |
| Success.png | Écran succès + carte promo | Écran succès contribution/versement |

### `clone-inspiration-1/` — Compte & réglages
| Fichier | Contenu | Pattern réutilisé |
|---|---|---|
| Frame 27 | Liste FAQ | Aide/FAQ Sòlid |
| Frame 28 | Notifications (toggles) | Réglages notifications |
| Frame 29 | Security & Privacy (PIN, devices) | Sécurité/PIN |
| Frame 30 | Menu compte | Menu profil |
| Frame 31 | Écran compte (avatar, Edit Profile, Invite friends) | Profil + inviter un membre |

### `clone-inspiration-2/` — Onboarding / KYC
| Fichier | Contenu | Pattern réutilisé |
|---|---|---|
| Frame 35 | Vérif. identité (photo ID + selfie) | Onboarding KYC (CIN Haïti) |
| Frame 36/37 | Code de confirmation (rempli/vide) | Vérification code SMS/email |
| Frame 38 | Vérif. identité obligatoire (bitcoin) | Hors périmètre — pattern shield réutilisable |
| Frame 39 | Saisie email | Étape email onboarding |
| Frame 41 | ZIP code (US) | Hors périmètre |
| Frame 42/43 | Choix $Cashtag (rempli/vide) | Identifiant Sòlid (renommé, sans `$`) |
| Frame 44 | Saisie prénom/nom | Étape identité onboarding |
| Frame 45 | Achat action Amazon (courtage) | Hors périmètre total |

## Composants récurrents (base pour `src/components/ui/`)

- Bottom tab bar (5 icônes)
- Card blanche arrondie sur fond gris clair (balance card, tuiles 2 colonnes)
- Numeric keypad (plein écran coloré / bottom sheet blanc)
- Bottom sheet modal (poignée grise, coins hauts arrondis, CTA pill)
- Pill buttons (CTA principal, montants rapides)
- List row (icône + titre/sous-titre + chevron)
- Avatar circulaire
- Checkbox/Radio circulaire, Toggle switch
- Filter chips (segmented control)
- Header : chevron retour gauche, titre centré, action droite (X)

## États visibles

Vide, rempli/actif, désactivé (CTA grisé tant que champ vide), succès
(checkmark vert + résumé), focus clavier.

## Mapping vers les pages existantes (`src/app/dart/**`)

| Page Sòlid existante | Écran Cash App de référence |
|---|---|
| `home` | Home.png |
| `circles`, `join/*` | Home.png (cards) + Payment details.png (liste contacts/membres) |
| `payment` (contribution) | Pay amount.png / Add cash.png |
| `payment/eligibility`, `payout-method` | Frame 29 (Security), Enter PIN.png |
| `payment/history` | List row pattern (Frame 27/30) |
| `payment/settings`, `settings/saved-cards` | Frame 28/29/30 |
| `profile`, `profile/personal-info` | Frame 31 |
| `profile/documents/*` | Frame 35 (vérif. identité) |
| `signup`, `signup/verify-otp` | Frame 39, Frame 36/37 |
| `welcome` | Pattern générique onboarding |

## Prochaine étape

Étape 2 : extraction des tokens (couleurs, typo, espacements) dans
`src/styles/design-tokens.md` + `src/app/globals.css`, en gardant le
langage visuel Cash App mais avec un accent de marque distinct (voir
décision dans design-tokens.md) pour ne pas se confondre visuellement
avec un vrai produit concurrent en activité.
