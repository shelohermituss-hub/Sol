"use client"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Card, CardDescription } from "@/components/ui/card"
import { Sparkline } from "@/components/sections/sparkline"
import { EXCHANGE_RATE } from "@/lib/dart-data"

// Détail de la carte "Exchange Rate" de l'accueil. Taux de démo, pas un
// flux réel — marqué [A VALIDER - BRH] comme toute autre donnée
// financière affichée sans source vérifiée (cf. CLAUDE.md,
// "Réglementaire").
export default function ExchangeRatePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/home" />} title="Exchange Rate" />

      <p className="mt-6 text-[15px] text-neutral-500">{EXCHANGE_RATE.base} to {EXCHANGE_RATE.quote}</p>
      <p className="font-heading text-[32px] font-bold text-ink">
        1 {EXCHANGE_RATE.base} = {EXCHANGE_RATE.rate} {EXCHANGE_RATE.quote}
      </p>
      <p className="mt-1 text-[13px] text-neutral-500">Updated {EXCHANGE_RATE.updatedAt}</p>

      <Sparkline data={EXCHANGE_RATE.history} color="#7fc1e1" className="mt-6 h-32 w-full" />

      <Card className="mt-8">
        <CardDescription>
          This rate is indicative and provided for reference only — it is not an official Banque de la République
          d&apos;Haïti (BRH) rate and should not be used to settle a transaction. [A VALIDER - BRH]
        </CardDescription>
      </Card>
    </div>
  )
}
