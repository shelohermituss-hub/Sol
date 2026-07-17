"use client"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { ListRow } from "@/components/ui/list-row"
import { Card, CardDescription } from "@/components/ui/card"
import { COLLECTION_FEE_TIERS, TRANSFER_FEE_TIERS } from "@/lib/dart-data"

// Détail de la carte "Fees" de l'accueil. Reprend telles quelles les 2
// grilles de .claude/skills/moncash-flow/SKILL.md §6.1/§6.2 — jamais un
// pourcentage ou palier recalculé/deviné ici, seulement affiché.
export default function FeesPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/home" />} title="Fees" />

      <p className="mt-4 text-[15px] text-neutral-500">
        Fees are set by MonCash, not by Sòlid — we never add a markup on top.
      </p>

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Contribution fees</h2>
      <p className="mt-1 text-[13px] text-neutral-500">Applied when you pay your monthly contribution.</p>
      <div className="mt-3 divide-y divide-neutral-200">
        {COLLECTION_FEE_TIERS.map((tier) => (
          <ListRow key={tier.id} title={tier.label} trailing={tier.rate} />
        ))}
      </div>

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Payout fees</h2>
      <p className="mt-1 text-[13px] text-neutral-500">Fixed amount, applied when the pot is sent to you.</p>
      <div className="mt-3 divide-y divide-neutral-200">
        {TRANSFER_FEE_TIERS.map((tier) => (
          <ListRow key={tier.range} title={tier.range} trailing={tier.fee === 0 ? "Free" : `${tier.fee} HTG`} />
        ))}
      </div>

      <Card className="mt-6 mb-6">
        <CardDescription>
          Payouts above 100,000 HTG are not yet covered by this schedule. [TARIF A CONFIRMER AUPRES DE MONCASH]
        </CardDescription>
      </Card>
    </div>
  )
}
