"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Coins } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SAVING_DURATIONS, SAVING_TIERS, type SavingTier } from "@/lib/dart-data"

// Choix d'un palier d'épargne prédéfini. Cf. app-cible/
// Join/Saving Program.png. "Choose Duration" (bottom sheet) réutilise
// Sheet — cf. app-cible/Join/Saving Program/Choose Duration.png.
export default function SavingProgramPage() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = React.useState<SavingTier | null>(null)
  const [selectedDuration, setSelectedDuration] = React.useState(SAVING_DURATIONS[0])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/join" />} title="Choose a Saving Circle" />

      <h1 className="mt-6 font-heading text-[20px] font-bold text-ink">Get cashback on monthly savings</h1>

      <div className="mt-4 flex flex-col gap-3">
        {SAVING_TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => {
              setSelectedTier(tier)
              setSelectedDuration(SAVING_DURATIONS[0])
            }}
            className="flex items-center justify-between rounded-card border border-neutral-200 p-5 text-left"
          >
            <div>
              <p className="text-[11px] font-bold tracking-wide text-neutral-500 uppercase">{tier.label}</p>
              <p className="mt-1 font-heading text-[20px] font-bold text-ink">{tier.amount.toLocaleString("en-US")} MAD</p>
              <p className="mt-1 text-[13px] text-neutral-500">
                Up to <span className="text-brand-green">{tier.cashback.toLocaleString("en-US")} MAD</span> extra
              </p>
            </div>
            <Coins className="size-8 shrink-0 text-ink" weight="fill" />
          </button>
        ))}
      </div>

      <Sheet open={selectedTier !== null} onOpenChange={(open) => !open && setSelectedTier(null)}>
        <SheetContent>
          <SheetTitle>Choose Duration</SheetTitle>
          <div className="flex gap-3">
            {SAVING_DURATIONS.map((duration) => (
              <button
                key={duration.months}
                type="button"
                onClick={() => setSelectedDuration(duration)}
                className={cn(
                  "flex-1 rounded-card border p-4 text-center",
                  selectedDuration.months === duration.months ? "border-ink" : "border-neutral-200"
                )}
              >
                <p className="font-heading text-[22px] font-bold text-ink">{duration.months}</p>
                <p className="text-[13px] text-neutral-500">Months</p>
                <p className="mt-2 text-[13px] font-bold text-ink">{duration.monthly} MAD/Monthly</p>
              </button>
            ))}
          </div>

          {selectedTier && (
            <div className="flex items-center justify-between rounded-card bg-neutral-200/40 px-4 py-4 text-[13px]">
              <div>
                <p className="text-neutral-500">STARTS ON</p>
                <p className="mt-1 font-bold text-ink">Nov 2024</p>
              </div>
              <div>
                <p className="text-neutral-500">PAYOUT DATE</p>
                <p className="mt-1 font-bold text-ink">{selectedDuration.months === 6 ? "Apr 2025" : "Later"}</p>
              </div>
              <div>
                <p className="text-neutral-500">TOTAL PAYOUT</p>
                <p className="mt-1 font-bold text-ink">
                  {(selectedTier.amount + selectedTier.cashback).toLocaleString("en-US")} MAD
                </p>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            onClick={() => {
              if (!selectedTier) return
              router.push(
                `/dart/join/saving-program/review?amount=${selectedTier.amount}&monthly=${selectedDuration.monthly}&months=${selectedDuration.months}&cashback=${selectedTier.cashback}`
              )
            }}
          >
            Next
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  )
}
