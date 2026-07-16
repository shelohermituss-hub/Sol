"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bank, CaretRight } from "@phosphor-icons/react/ssr"

import { NavHeader, NavCloseButton, CancelLink } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { GoalIcon } from "@/components/sections/goal-icon"
import { useGoals } from "@/lib/goals-context"
import { useAccount } from "@/lib/account-context"

function PartyRow({
  label,
  icon,
  title,
  subtitle,
  onClick,
}: {
  label: string
  icon?: React.ReactNode
  title?: string
  subtitle?: string
  onClick: () => void
}) {
  return (
    <div>
      <p className="text-[15px] text-neutral-500">{label}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-1 flex w-full items-center gap-4 border-b border-neutral-200 py-4 text-left"
      >
        <span
          className={
            icon
              ? "flex size-14 shrink-0 items-center justify-center rounded-full border border-neutral-200"
              : "flex size-14 shrink-0 items-center justify-center rounded-full border border-dashed border-neutral-200"
          }
        >
          {icon}
        </span>
        <span className="flex-1">
          <span className="block font-heading text-[17px] font-bold text-ink">{title ?? "Select account or goal"}</span>
          {subtitle && <span className="block text-[15px] text-neutral-500">{subtitle}</span>}
        </span>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </button>
    </div>
  )
}

// Choix des comptes source/destination du transfert. Cf. design-refs/
// Oportun_iOS_Transferring_money/Oportun iOS Transferring money 1-2.png.
// "From" n'a qu'une seule option dans cette reproduction (le compte
// bancaire connecté, seul compte du projet) — la sheet s'ouvre quand même
// pour rester fidèle à l'interaction montrée. Icône Bank générique plutôt
// que le logo Bank of America (marque déposée).
function MakeTransferForm() {
  const params = useSearchParams()
  const { goals } = useGoals()
  const { accountName, availableBalance } = useAccount()

  const [fromSelected, setFromSelected] = React.useState(false)
  const [toGoalId, setToGoalId] = React.useState<string | null>(params.get("to"))
  const [fromSheetOpen, setFromSheetOpen] = React.useState(false)
  const [toSheetOpen, setToSheetOpen] = React.useState(false)

  const toGoal = goals.find((g) => g.id === toGoalId)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavCloseButton href="/home" />} title="Make a transfer" trailing={<CancelLink href="/home" />} />

      <div className="mt-6">
        <PartyRow
          label="From"
          icon={fromSelected ? <Bank className="size-6 text-ink" /> : undefined}
          title={fromSelected ? accountName : undefined}
          subtitle={fromSelected ? `$${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} available` : undefined}
          onClick={() => setFromSheetOpen(true)}
        />
      </div>

      <div className="mt-4">
        <PartyRow
          label="To"
          icon={toGoal ? <GoalIcon goal={toGoal} className="size-6" /> : undefined}
          title={toGoal?.name}
          subtitle={toGoal ? `$${toGoal.amount.toFixed(2)} available` : undefined}
          onClick={() => setToSheetOpen(true)}
        />
      </div>

      <p className="mt-4 text-[15px] text-neutral-500">Some limits may apply.</p>

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          disabled={!fromSelected || !toGoal}
          nativeButton={false}
          render={<Link href={`/transfer/amount?to=${toGoalId}`} />}
        >
          Next
        </Button>
      </div>

      <Sheet open={fromSheetOpen} onOpenChange={setFromSheetOpen}>
        <SheetContent>
          <SheetTitle>Select account</SheetTitle>
          <button
            type="button"
            onClick={() => {
              setFromSelected(true)
              setFromSheetOpen(false)
            }}
            className="flex w-full items-center gap-4 py-4 text-left"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-neutral-200">
              <Bank className="size-6 text-ink" />
            </span>
            <span className="flex-1">
              <span className="block font-heading text-[17px] font-bold text-ink">{accountName}</span>
              <span className="block text-[15px] text-neutral-500">
                ${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} available
              </span>
            </span>
          </button>
        </SheetContent>
      </Sheet>

      <Sheet open={toSheetOpen} onOpenChange={setToSheetOpen}>
        <SheetContent>
          <SheetTitle>Select goal</SheetTitle>
          <div className="divide-y divide-neutral-200">
            {goals.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => {
                  setToGoalId(goal.id)
                  setToSheetOpen(false)
                }}
                className="flex w-full items-center gap-4 py-4 text-left"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-neutral-200">
                  <GoalIcon goal={goal} className="size-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-heading text-[17px] font-bold text-ink">{goal.name}</span>
                  <span className="block text-[15px] text-neutral-500">${goal.amount.toFixed(2)} available</span>
                </span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function MakeTransferPage() {
  return (
    <Suspense fallback={null}>
      <MakeTransferForm />
    </Suspense>
  )
}
