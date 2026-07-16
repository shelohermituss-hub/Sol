"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { Checkbox } from "@/components/ui/checkbox"
import { NavHeader, NavBackButton, CancelLink } from "@/components/layout/nav-header"

// Formulaire d'informations personnelles. Cf. design-refs/
// Oportun_iOS_Onboarding/Oportun iOS Onboarding 4.png et 5.png. Les liens
// "Consent to Electronic Communications", "Privacy Policy", etc. n'ont pas
// d'écran cible construit — ils restent décoratifs (texte stylé en vert).
export default function PersonalInfoPage() {
  const router = useRouter()
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [consent, setConsent] = React.useState(false)

  const canProceed = firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && consent

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/onboarding/phone" />} trailing={<CancelLink href="/onboarding/welcome" />} />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">Tell us about yourself</h1>

      <div className="mt-6 flex flex-col gap-4">
        <TextField label="Legal first name *" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label="Legal last name *" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField
          label="Email address *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <Checkbox checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-0.5" />
        <p className="text-[15px] text-neutral-500">
          I have read and agree to the <span className="font-medium text-brand-green">Consent to Electronic Communications</span>;{" "}
          <span className="font-medium text-brand-green">Privacy Policy</span>;{" "}
          <span className="font-medium text-brand-green">Consumer Privacy Notice</span>; and{" "}
          <span className="font-medium text-brand-green">Terms of Use</span>
        </p>
      </div>

      <div className="mt-auto pb-6">
        <Button className="w-full" disabled={!canProceed} onClick={() => router.push("/onboarding/password")}>
          Next
        </Button>
      </div>
    </div>
  )
}
