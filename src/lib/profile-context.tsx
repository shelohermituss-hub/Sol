"use client"

import * as React from "react"

type ProfileContextValue = {
  fullName: string
  phone: string
  email: string
  setEmail: (email: string) => void
}

const ProfileContext = React.createContext<ProfileContextValue | null>(null)

// Infos de contact de l'utilisateur (cf. flux "Changing an email"). Nom et
// téléphone sont statiques dans cette reproduction (pas de flux "Changing
// a name"/"Changing a phone" documenté) ; seul l'email est éditable.
function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = React.useState("alexsmith.mobbin@gmail.com")
  const value = React.useMemo(
    () => ({ fullName: "Alex Smith", phone: "(650) 213-7552", email, setEmail }),
    [email]
  )
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

function useProfile() {
  const ctx = React.useContext(ProfileContext)
  if (!ctx) throw new Error("useProfile must be used within a ProfileProvider")
  return ctx
}

export { ProfileProvider, useProfile }
