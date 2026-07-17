"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import { useDart } from "@/lib/dart-context"

// Formulaire d'ajout de carte MonCash. Cf. app-cible/Payment/Payment
// Settings/Saved Cards/Add.png (mise en page conservée), champs adaptés
// — cf. CLAUDE.md, "Paiement" : plus de Nom sur la carte / Date
// d'expiration / Code de sécurité (reliquat carte bancaire), un seul
// champ pertinent pour lier une carte MonCash (produit prépayé unique).
export default function AddCardPage() {
  const router = useRouter()
  const { addSavedCard } = useDart()

  const [cardNumber, setCardNumber] = React.useState("")

  const canSave = cardNumber.length >= 12

  function handleSave() {
    addSavedCard({
      id: `card-${Date.now()}`,
      last4: cardNumber.slice(-4),
      isDefault: false,
    })
    router.push("/dart/payment/settings/saved-cards")
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/payment/settings/saved-cards" />} title="Add MonCash Card" />

      <div className="mt-6 flex flex-col gap-4">
        <TextField
          label="MonCash Card Number"
          inputMode="numeric"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
        />
      </div>

      <div className="mt-auto pb-6">
        <Button className="w-full" disabled={!canSave} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
