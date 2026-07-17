"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Bank, Bell, Info, Wallet } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { PAYOUT_METHODS } from "@/lib/dart-data"

const METHOD_ICONS = {
  moncash: Wallet,
  "bank-transfer": Bank,
} as const

// Choix du mode de réception du gain, affiché après avoir rejoint un
// circle. Cf. app-cible/Home/Payout Method.png. Cf. CLAUDE.md,
// "Paiement" : MonCash uniquement pour le pilote.
export default function PayoutMethodPage() {
  const router = useRouter()
  const [method, setMethod] = React.useState("moncash")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/home" />}
        title="Payout Method"
        trailing={<Bell className="size-6 text-ink" />}
      />

      <p className="mt-6 text-[15px] text-neutral-500">Choose your preferred payout method for the next circles.</p>

      <RadioGroup value={method} onValueChange={(v) => setMethod(v as string)} className="mt-4">
        {PAYOUT_METHODS.map((option) => {
          const Icon = METHOD_ICONS[option.id]
          return (
            <label
              key={option.id}
              className="flex items-center gap-4 rounded-card border border-neutral-200 p-4 has-disabled:opacity-50"
            >
              <Icon className="size-6 shrink-0 text-ink" />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold text-ink">{option.label}</p>
                <p className="mt-0.5 text-[13px] text-neutral-500">{option.description}</p>
                {!option.available && (
                  <p className="mt-1 flex items-center gap-1 text-[13px] text-ink">
                    Not available <Info className="size-3.5" />
                  </p>
                )}
              </div>
              <RadioGroupItem value={option.id} disabled={!option.available} />
            </label>
          )
        })}
      </RadioGroup>

      <div className="mt-auto pb-6">
        <Button className="w-full" onClick={() => router.push("/dart/home")}>
          Continue
        </Button>
      </div>
    </div>
  )
}
