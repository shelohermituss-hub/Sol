export interface AccountTransaction {
  amount: number
  date: string
}

// Historique de transactions du compte connecté. Cf. design-refs/
// Oportun_iOS_Connected_account_detail/Oportun iOS Connected account
// detail 3.png (liste complète).
export const ACCOUNT_TRANSACTIONS: AccountTransaction[] = [
  { amount: -7.5, date: "Jun 1, 2026" },
  { amount: -13.69, date: "Jun 1, 2026" },
  { amount: -1834.99, date: "Jun 1, 2026" },
  { amount: -5.99, date: "Jun 1, 2026" },
  { amount: -7.21, date: "Jun 1, 2026" },
  { amount: -1.89, date: "Jun 1, 2026" },
  { amount: -13.23, date: "Jun 1, 2026" },
  { amount: -1, date: "May 31, 2026" },
  { amount: -54.84, date: "May 31, 2026" },
]

export const ACCOUNT_AVAILABLE_BALANCE = 7741.33
export const ACCOUNT_LAST_SYNCED = "Today"
export const ACCOUNT_SAFE_SAVING_LEVEL = "$10,000"
