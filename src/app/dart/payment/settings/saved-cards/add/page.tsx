"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import { useDart } from "@/lib/dart-context"

// Formulaire d'ajout de carte. Cf. app-cible/Payment/Payment Settings/
// Saved Cards/Add.png.
export default function AddCardPage() {
  const router = useRouter()
  const { addSavedCard } = useDart()

  const [cardNumber, setCardNumber] = React.useState("")
  const [name, setName] = React.useState("")
  const [month, setMonth] = React.useState("")
  const [year, setYear] = React.useState("")
  const [cvc, setCvc] = React.useState("")

  const canSave = cardNumber.length >= 12 && name.trim() !== "" && month !== "" && year !== "" && cvc.length >= 3

  function handleSave() {
    addSavedCard({
      id: `card-${Date.now()}`,
      brand: "visa",
      last4: cardNumber.slice(-4),
      isDefault: false,
    })
    router.push("/dart/payment/settings/saved-cards")
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/payment/settings/saved-cards" />} title="Add Card" />

      <div className="mt-6 flex flex-col gap-4">
        <TextField
          label="Card Number"
          inputMode="numeric"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
        />
        <TextField label="Name on Card" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex gap-4">
          <TextField className="flex-1" label="Month" inputMode="numeric" value={month} onChange={(e) => setMonth(e.target.value.replace(/\D/g, "").slice(0, 2))} />
          <TextField className="flex-1" label="Year" inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 2))} />
        </div>
        <TextField label="Security Code" inputMode="numeric" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} />
      </div>

      <div className="mt-auto pb-6">
        <Button className="w-full" disabled={!canSave} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
