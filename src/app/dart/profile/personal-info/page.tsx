"use client"

import * as React from "react"
import { Bell } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { TextField } from "@/components/ui/text-field"
import { CURRENT_USER } from "@/lib/dart-data"

// Édition des infos personnelles. Cf. app-cible/Profile/Personal Info.png
// (2 champs "First Name" dans la capture source, traités ici comme First
// Name / Last Name — cf. FONCTIONNEL.md, décisions Étape 1). Valeurs
// initiales partagées avec /dart/profile via CURRENT_USER (corrige
// l'incohérence documentée entre les deux écrans).
export default function DartPersonalInfoPage() {
  const [firstName, setFirstName] = React.useState(CURRENT_USER.firstName)
  const [lastName, setLastName] = React.useState(CURRENT_USER.lastName)
  const [phone, setPhone] = React.useState(CURRENT_USER.phone)
  const [email, setEmail] = React.useState(CURRENT_USER.email)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/profile" />}
        title="Personal Info"
        trailing={<Bell className="size-6 text-ink" />}
      />

      <div className="mt-6 flex flex-col gap-4">
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField label="Phone" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} />
        <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
    </div>
  )
}
