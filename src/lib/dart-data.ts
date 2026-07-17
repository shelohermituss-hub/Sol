import type { CircleCardData } from "@/components/sections/circle-card"

// Données de démonstration pour le reskin Dart. Cf. app-cible/ (captures
// source) — structure/fonctionnalités reprises, aucune valeur visuelle
// (couleur, style) empruntée à l'app 2.

// Modèle de confiance (cf. CLAUDE.md) : groupes fermés sur invitation,
// jamais un marketplace ouvert. Cette liste représente le résultat d'une
// requête "cercles où je suis invité ou que j'organise" — jamais une
// découverte publique de cercles auxquels n'importe qui pourrait
// rejoindre. Affichée sur Home et Circles ("Invited to you").
export const INVITED_CIRCLES: CircleCardData[] = [
  {
    id: "circle-24000",
    amount: 24000,
    monthly: 2000,
    totalMonths: 12,
    yourTurnIndex: 3,
    startLabel: "Nov, 2024",
    endLabel: "Oct, 2025",
    adminFees: 2880,
  },
]

export const INITIAL_JOINED_CIRCLES: CircleCardData[] = [
  {
    id: "circle-14000",
    amount: 14000,
    monthly: 1400,
    totalMonths: 12,
    yourTurnIndex: 3,
    startLabel: "Nov, 2024",
    endLabel: "Oct, 2025",
    adminFees: 2880,
    joined: true,
  },
]

export interface SavingTier {
  id: string
  label: string
  amount: number
  cashback: number
}

// Grille Saving Program, du plus accessible au plus premium (corrige au
// passage un bug de nommage : l'ancienne grille répétait "SILVER SAVER"
// sur 3 paliers différents). Taux de cashback progressif — plus le
// palier est élevé, meilleur le taux, pour récompenser l'engagement sans
// pénaliser les petits épargnants (Starter reste à 15%, pas 0%).
export const SAVING_TIERS: SavingTier[] = [
  { id: "starter", label: "STARTER SAVER", amount: 5000, cashback: 750 }, // 15%
  { id: "bronze", label: "BRONZE SAVER", amount: 10000, cashback: 1700 }, // 17%
  { id: "silver", label: "SILVER SAVER", amount: 25000, cashback: 4750 }, // 19%
  { id: "gold", label: "GOLD SAVER", amount: 50000, cashback: 10500 }, // 21%
  { id: "platinum", label: "PLATINUM SAVER", amount: 100000, cashback: 23000 }, // 23%
  { id: "diamond", label: "DIAMOND SAVER", amount: 200000, cashback: 50000 }, // 25%
]

export interface SavingDuration {
  months: number
}

// Durées proposées pour un palier Saving Program. La mensualité affichée
// est calculée dynamiquement (montant du palier ÷ durée) sur l'écran
// Choose Duration — l'ancienne valeur `monthly` fixe par durée (500/250/
// 125) restait câblée sur le montant du tout premier palier (3 000) et
// ne suivait pas le palier réellement sélectionné.
export const SAVING_DURATIONS: SavingDuration[] = [{ months: 6 }, { months: 12 }, { months: 24 }]

// Durées de mensualité proposées pour un Sòl : mêmes paliers que
// SAVING_DURATIONS (6/12/24 mois, grille Bronze/Silver/Gold déjà
// établie). La mensualité elle-même est calculée dynamiquement
// (montant du Sòl ÷ durée) sur l'écran Monthly Pay-in — plus de liste
// figée déconnectée du montant choisi.
export const PAYIN_DURATIONS_MONTHS = SAVING_DURATIONS.map((d) => d.months)

// Score de fiabilité (cf. CLAUDE.md, "Score de fiabilité") : remplace le
// choix libre de créneau (Fastest/Lowest/Highest) par une position dans
// le cycle déterminée par le score du membre. Score simulé en l'absence
// de backend — un nouveau membre commence avec un score bas (positions
// tardives), le score augmente avec l'historique de paiements à l'heure.
export const CURRENT_USER_RELIABILITY_SCORE = 62

export interface ReliabilityTier {
  id: "trusted" | "building-trust" | "new-member"
  label: string
  description: string
  minScore: number
  tag?: string
  tagVariant?: "neutral" | "success"
}

// Score élevé → positions précoces (premier tiers du cycle) ; nouveau
// membre/score bas → positions tardives, compensées par une remise
// (même logique de compensation "attendre = bonus" que l'ancien
// "Highest Return", mais l'éligibilité n'est plus un choix libre : elle
// dépend du score, pas d'une préférence de l'utilisateur).
export const RELIABILITY_TIERS: ReliabilityTier[] = [
  { id: "trusted", label: "Trusted", description: "Early positions (from November to December)", minScore: 70, tag: "fees apply", tagVariant: "neutral" },
  { id: "building-trust", label: "Building Trust", description: "Middle positions (from January to February)", minScore: 40 },
  { id: "new-member", label: "New Member", description: "Later positions (from March to April)", minScore: 0, tag: "pay-ins discount", tagVariant: "success" },
]

export function reliabilityTierForScore(score: number): ReliabilityTier {
  return RELIABILITY_TIERS.find((tier) => score >= tier.minScore) ?? RELIABILITY_TIERS[RELIABILITY_TIERS.length - 1]
}

export interface PositionDate {
  id: string
  month: string
  year: number
  day: string
  fees?: number
  discount?: number
  zeroFees?: boolean
}

// Seules les dates du palier "trusted" sont issues d'une capture (Slot/
// Highest Return.png, rebaptisé). Les dates "building-trust" et
// "new-member" ne sont visibles dans aucun screenshot de app-cible/ :
// elles suivent la même plage de mois que RELIABILITY_TIERS[].description
// avec des montants extrapolés, faute de capture source.
export const POSITION_DATES: Record<ReliabilityTier["id"], PositionDate[]> = {
  trusted: [
    { id: "nov", month: "November", year: 2025, day: "3rd", fees: 3600 },
    { id: "dec", month: "December", year: 2025, day: "5th", fees: 2900 },
  ],
  "building-trust": [
    { id: "jan", month: "January", year: 2025, day: "4th", fees: 0 },
    { id: "feb", month: "February", year: 2025, day: "6th", fees: 0 },
  ],
  "new-member": [
    { id: "march", month: "March", year: 2025, day: "5th", fees: 2400 },
    { id: "april", month: "April", year: 2025, day: "6th", zeroFees: true, discount: 1200 },
  ],
}

// Cf. CLAUDE.md, "Paiement" : MonCash uniquement pour le pilote, jamais
// de cartes bancaires, jamais de Fawry ou équivalent non pertinent pour
// Haïti. "Prepaid Card" (carte bancaire) retiré entièrement — pas juste
// indisponible, jamais réintroduit. "Bank Transfer" reste listé à titre
// de feuille de route (compte bancaire, pas une carte) mais indisponible
// tant que le pilote ne couvre que MonCash.
export const PAYOUT_METHODS = [
  { id: "moncash", label: "MonCash", description: "Receive your payout directly to your MonCash mobile wallet.", available: true },
  { id: "bank-transfer", label: "Bank Transfer", description: "Direct your payout to your bank account.", available: false },
] as const

export interface PaymentTransaction {
  id: string
  amount: number
  date: string
  time: string
  month: string
  kind: "payment" | "payout"
}

// Régénéré en HTG, aligné sur la mensualité du cercle déjà rejoint dans
// la démo (INITIAL_JOINED_CIRCLES : 14 000 HTG, 1 400 HTG/mois) plutôt
// que les anciens montants MAD arbitraires (3 000-4 500). Dates
// avancées à 2026 pour rester cohérentes avec la date de démarrage du
// Saving Program (cf. START_MONTH/START_YEAR).
export const PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  { id: "p1", amount: 1400, date: "29-03-26", time: "12:00 PM", month: "March", kind: "payment" },
  { id: "p2", amount: 1400, date: "29-04-26", time: "12:00 PM", month: "April", kind: "payment" },
  { id: "p3", amount: 1400, date: "29-05-26", time: "12:00 PM", month: "May", kind: "payment" },
  { id: "p4", amount: 1400, date: "29-06-26", time: "12:00 PM", month: "June", kind: "payment" },
  { id: "o1", amount: 14000, date: "29-03-26", time: "12:00 PM", month: "March", kind: "payout" },
  { id: "o2", amount: 4750, date: "29-05-26", time: "12:00 PM", month: "May", kind: "payout" },
]

export interface EligibilityItem {
  id: string
  label: string
  description: string
  status: "success" | "warning"
  chevron?: boolean
}

// Cf. CLAUDE.md, "Réglementaire" : toute référence légale/bancaire est
// marquée [A VALIDER - BRH], jamais supprimée ni inventée. "Insurance
// Note" reste tel quel (le libellé n'est pas remplacé par autre chose)
// mais porte désormais ce marqueur — l'exigence réelle reste à confirmer
// avec la Banque de la République d'Haïti avant mise en production.
export const ELIGIBILITY_ITEMS: EligibilityItem[] = [
  { id: "national-id", label: "CIN (National ID)", description: "You will need to upload a valid CIN (Carte d'Identification Nationale).", status: "success", chevron: false },
  { id: "insurance-note", label: "Insurance Note [A VALIDER - BRH]", description: "You will need to sign the Insurance Note first, if you signed it ignore this.", status: "warning", chevron: true },
  { id: "payout-method", label: "Payout Method Selected", description: "You will need to select a payout method.", status: "warning", chevron: true },
  { id: "contract", label: "Contract", description: "You will need to sign the contract first.", status: "warning", chevron: true },
]

export interface SavedCard {
  id: string
  brand: "visa" | "mastercard"
  last4: string
  isDefault: boolean
}

export const INITIAL_SAVED_CARDS: SavedCard[] = [
  { id: "card-1", brand: "visa", last4: "0215", isDefault: true },
  { id: "card-2", brand: "mastercard", last4: "9834", isDefault: false },
]

export interface DocumentItem {
  id: string
  label: string
  description: string
  /** Ligne d'accroche additionnelle en vert, sous la description (cf. app-cible/Profile/My Documents.png). */
  hint?: string
  isNew?: boolean
  href?: string
}

export const DOCUMENT_ITEMS: DocumentItem[] = [
  { id: "national-id", label: "National ID", description: "Upload a photo of your National ID.", hint: "Required to verify your identity", href: "/dart/profile/documents/scan-id" },
  { id: "proof-of-income", label: "Proof of Income", description: "Upload an HR letter or a business bank statement.", hint: "Required to to increase limit", href: "/dart/profile/documents/proof-of-income" },
  { id: "utility-bill", label: "Utility Bill", description: "Upload a copy of a utility bill under your name or a first-degree relatively.", isNew: true },
  { id: "car-license", label: "Car License", description: "Upload a photo of your car's license." },
  { id: "club-id", label: "Club ID", description: "Upload a photo of your club membership card." },
  { id: "syndicate-id", label: "Syndicate ID", description: "Upload a photo of your syndicate's card." },
]
