import Link from "next/link"
import { Receipt } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CircleCardData {
  id: string
  amount: number
  monthly: number
  totalMonths: number
  yourTurnIndex: number
  startLabel: string
  endLabel: string
  adminFees: number
  joined?: boolean
}

// Carte "cercle" (circle de tontine) : montant, mensualité, frise de
// progression avec marqueur "Your Turn", plage de dates, frais admin, et
// bouton "Join now" ou statut "Joined". Nouveau composant sur-mesure (app
// 2 "Home"/"Circles") — mêmes tokens que Card/Button/badge "On" existants,
// aucune couleur ou style hors design system app 1.
function CircleCard({ circle, joinHref }: { circle: CircleCardData; joinHref: string }) {
  const { amount, monthly, totalMonths, yourTurnIndex, startLabel, endLabel, adminFees, joined } = circle

  return (
    <div className="w-full shrink-0 rounded-card border border-neutral-200 bg-paper p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-heading text-[20px] font-bold text-ink">{amount.toLocaleString("en-US")} MAD</p>
          <p className="mt-0.5 text-[15px] text-neutral-500">
            {monthly.toLocaleString("en-US")} MAD<span className="text-neutral-500">/Monthly</span>
          </p>
        </div>
        {joined ? (
          <span className="rounded-full bg-brand-green px-3 py-1.5 text-[13px] font-bold text-paper">Joined</span>
        ) : (
          <Button size="default" className="h-9 px-4 text-[14px]" nativeButton={false} render={<Link href={joinHref} />}>
            Join now
          </Button>
        )}
      </div>

      <div className="relative mt-6">
        <span
          className="absolute -top-6 -translate-x-1/2 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-paper"
          style={{ left: `${((yourTurnIndex + 0.5) / totalMonths) * 100}%` }}
        >
          Your Turn
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalMonths }, (_, i) => (
            <span
              key={i}
              className={cn("h-1.5 flex-1 rounded-full", i === yourTurnIndex ? "bg-ink" : "bg-neutral-200")}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-[13px] text-neutral-500">
          <span>{startLabel}</span>
          <span>{totalMonths} Months</span>
          <span>{endLabel}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 border-t border-neutral-200 pt-4 text-[13px] text-neutral-500">
        <Receipt className="size-4" />
        <span>
          Admin Fees: <span className="font-bold text-ink">{adminFees.toLocaleString("en-US")} MAD</span>
        </span>
      </div>
    </div>
  )
}

export { CircleCard }
