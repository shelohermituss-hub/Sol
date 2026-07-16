"use client"

import * as React from "react"

import { ACCOUNT_AVAILABLE_BALANCE } from "@/lib/account-data"

type AccountContextValue = {
  accountName: string
  setAccountName: (name: string) => void
  availableBalance: number
  withdraw: (amount: number) => void
  removed: boolean
  removeAccount: () => void
}

const AccountContext = React.createContext<AccountContextValue | null>(null)

// Nom éditable, solde et statut (retiré ou non) du compte connecté (cf.
// flux "Editing an account name", "Transferring money" et "Removing an
// account"), partagés entre l'écran de détail, Home et Set & Save. En
// mémoire uniquement, comme GoalsProvider.
function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountName, setAccountName] = React.useState("Adv Plus Banking")
  const [availableBalance, setAvailableBalance] = React.useState(ACCOUNT_AVAILABLE_BALANCE)
  const [removed, setRemoved] = React.useState(false)

  const withdraw = React.useCallback((amount: number) => {
    setAvailableBalance((prev) => prev - amount)
  }, [])

  const removeAccount = React.useCallback(() => {
    setRemoved(true)
  }, [])

  const value = React.useMemo(
    () => ({ accountName, setAccountName, availableBalance, withdraw, removed, removeAccount }),
    [accountName, availableBalance, withdraw, removed, removeAccount]
  )
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

function useAccount() {
  const ctx = React.useContext(AccountContext)
  if (!ctx) throw new Error("useAccount must be used within an AccountProvider")
  return ctx
}

export { AccountProvider, useAccount }
