"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { NavHeader, NavBackButton } from "@/components/layout/nav-header"

function formatPhone(digits: string) {
  const d = digits.slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`
}

// Saisie du numéro de téléphone (états vide/rempli). Cf. design-refs/
// Oportun_iOS_Onboarding/Oportun iOS Onboarding 2.png et 3.png.
export default function PhonePage() {
  const router = useRouter()
  const [digits, setDigits] = React.useState("")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/onboarding/welcome" />} />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">Let&apos;s get started</h1>

      <TextField
        className="mt-6"
        label="Mobile phone number"
        type="tel"
        inputMode="numeric"
        value={formatPhone(digits)}
        onChange={(e) => setDigits(e.target.value.replace(/\D/g, "").slice(0, 10))}
      />

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          disabled={digits.length < 10}
          onClick={() => router.push("/onboarding/personal-info")}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
