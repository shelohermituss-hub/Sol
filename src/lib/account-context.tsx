"use client"

import * as React from "react"

import { ACCOUNT_AVAILABLE_BALANCE } from "@/lib/account-data"

type AccountContextValue = {
  accountName: string
  setAccountName: (name: string) => void
  availableBalance: number
  withdraw: (amount: number) => void
}

const AccountContext = React.createContext<AccountContextValue | null>(null)

// Nom éditable et solde du compte connecté (cf. flux "Editing an account
// name" et "Transferring money"), partagés entre l'écran de détail, Home
// et le flux de transfert. En mémoire uniquement, comme GoalsProvider.
function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountName, setAccountName] = React.useState("Adv Plus Banking")
  const [availableBalance, setAvailableBalance] = React.useState(ACCOUNT_AVAILABLE_BALANCE)

  const withdraw = React.useCallback((amount: number) => {
    setAvailableBalance((prev) => prev - amount)
  }, [])

  const value = React.useMemo(
    () => ({ accountName, setAccountName, availableBalance, withdraw }),
    [accountName, availableBalance, withdraw]
  )
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

function useAccount() {
  const ctx = React.useContext(AccountContext)
  if (!ctx) throw new Error("useAccount must be used within an AccountProvider")
  return ctx
}

export { AccountProvider, useAccount }
