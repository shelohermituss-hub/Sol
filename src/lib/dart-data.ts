import type { CircleCardData } from "@/components/sections/circle-card"
import { formatCurrency } from "@/lib/currency"

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

export const SAVING_TIERS: SavingTier[] = [
  { id: "lite", label: "LITE SAVER", amount: 3000, cashback: 600 },
  { id: "bronze", label: "BRONZE SAVER", amount: 6000, cashback: 1200 },
  { id: "silver-1", label: "SILVER SAVER", amount: 12000, cashback: 2400 },
  { id: "gold", label: "GOLD SAVER", amount: 30000, cashback: 6000 },
  { id: "silver-2", label: "SILVER SAVER", amount: 60000, cashback: 12000 },
  { id: "silver-3", label: "SILVER SAVER", amount: 100000, cashback: 20000 },
]

export interface SavingDuration {
  months: number
  monthly: number
}

export const SAVING_DURATIONS: SavingDuration[] = [
  { months: 6, monthly: 500 },
  { months: 12, monthly: 250 },
  { months: 24, monthly: 125 },
]

export const MONTHLY_PAYIN_OPTIONS = [
  { monthly: 5000, months: 6 },
  { monthly: 3000, months: 10 },
  { monthly: 2500, months: 12 },
]

export interface SlotOption {
  id: "fastest" | "lowest-fees" | "highest-return"
  label: string
  description: string
  tag?: string
  tagVariant?: "neutral" | "success"
}

export const SLOT_OPTIONS: SlotOption[] = [
  { id: "fastest", label: "Fastest Payout", description: "First slots (from November to December)", tag: "fees apply", tagVariant: "neutral" },
  { id: "lowest-fees", label: "Lowest Fees", description: "Middle slots (from January to February)" },
  { id: "highest-return", label: "Highest Return", description: "Last slots (from March to April)", tag: "pay-ins discount", tagVariant: "success" },
]

export interface SlotDate {
  id: string
  month: string
  year: number
  day: string
  fees?: number
  discount?: number
  zeroFees?: boolean
}

// Seules les dates de l'onglet "highest-return" sont issues d'une capture
// (Slot/Highest Return.png). Les dates "fastest" et "lowest-fees" ne sont
// visibles dans aucun screenshot de app-cible/ : elles suivent la même
// plage de mois annoncée par SLOT_OPTIONS[].description (nov-déc,
// jan-fév) avec des montants extrapolés, faute de capture source.
export const SLOT_DATES: Record<SlotOption["id"], SlotDate[]> = {
  fastest: [
    { id: "nov", month: "November", year: 2025, day: "3rd", fees: 3600 },
    { id: "dec", month: "December", year: 2025, day: "5th", fees: 2900 },
  ],
  "lowest-fees": [
    { id: "jan", month: "January", year: 2025, day: "4th", fees: 0 },
    { id: "feb", month: "February", year: 2025, day: "6th", fees: 0 },
  ],
  "highest-return": [
    { id: "march", month: "March", year: 2025, day: "5th", fees: 2400 },
    { id: "april", month: "April", year: 2025, day: "6th", zeroFees: true, discount: 1200 },
  ],
}

export const PAYOUT_METHODS = [
  { id: "digital-wallet", label: "Digital Wallets", description: "Receive your payout on any digital wallet.", available: true },
  { id: "prepaid-card", label: "Prepaid Card", description: `Receive your payout on any Prepaid Card. Card limit is ${formatCurrency(100000)}`, available: true, badge: "No Charge" },
  { id: "bank-transfer", label: "Bank Transfer", description: "Direct your payout to your bank account.", available: true, badge: "No Charge" },
  { id: "fawry", label: "Fawry", description: "Receive your payout from any of Fawry Plus stores without bank account.", available: false },
] as const

export interface PaymentTransaction {
  id: string
  amount: number
  date: string
  time: string
  month: string
  kind: "payment" | "payout"
}

export const PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  { id: "p1", amount: 3000, date: "29-08-24", time: "12:00 PM", month: "August", kind: "payment" },
  { id: "p2", amount: 4000, date: "29-09-24", time: "12:00 PM", month: "September", kind: "payment" },
  { id: "p3", amount: 3500, date: "29-10-24", time: "12:00 PM", month: "October", kind: "payment" },
  { id: "p4", amount: 4500, date: "29-11-24", time: "12:00 PM", month: "November", kind: "payment" },
  { id: "o1", amount: 30000, date: "29-08-24", time: "12:00 PM", month: "August", kind: "payout" },
  { id: "o2", amount: 4000, date: "29-09-24", time: "12:00 PM", month: "September", kind: "payout" },
]

export interface EligibilityItem {
  id: string
  label: string
  description: string
  status: "success" | "warning"
  chevron?: boolean
}

export const ELIGIBILITY_ITEMS: EligibilityItem[] = [
  { id: "national-id", label: "National ID", description: "You will need to upload a valid National ID.", status: "success", chevron: false },
  { id: "insurance-note", label: "Insurance Note", description: "You will need to sign the Insurance Note first, if you signed it ignore this.", status: "warning", chevron: true },
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
