"use client"

import * as React from "react"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { TextField } from "@/components/ui/text-field"

// Édition des infos personnelles. Cf. app-cible/Profile/Personal Info.png
// (2 champs "First Name" dans la capture source, traités ici comme First
// Name / Last Name — cf. FONCTIONNEL.md, décisions Étape 1).
export default function DartPersonalInfoPage() {
  const [firstName, setFirstName] = React.useState("Hafiz")
  const [lastName, setLastName] = React.useState("Hanif")
  const [phone, setPhone] = React.useState("01080740123")
  const [email, setEmail] = React.useState("hafiz.hanif@gmail.com")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/profile" />} title="Personal Info" />

      <div className="mt-6 flex flex-col gap-4">
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField label="Phone" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} />
        <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
    </div>
  )
}
