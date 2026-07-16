"use client"

import * as React from "react"

type AccountContextValue = {
  accountName: string
  setAccountName: (name: string) => void
}

const AccountContext = React.createContext<AccountContextValue | null>(null)

// Nom éditable du compte connecté (cf. flux "Editing an account name"),
// partagé entre l'écran de détail et l'écran d'édition. En mémoire
// uniquement, comme GoalsProvider.
function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountName, setAccountName] = React.useState("Adv Plus Banking")
  const value = React.useMemo(() => ({ accountName, setAccountName }), [accountName])
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

function useAccount() {
  const ctx = React.useContext(AccountContext)
  if (!ctx) throw new Error("useAccount must be used within an AccountProvider")
  return ctx
}

export { AccountProvider, useAccount }
