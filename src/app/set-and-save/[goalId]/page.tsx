"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowDown, Gear, Info } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { GoalIcon } from "@/components/sections/goal-icon"
import { useGoals } from "@/lib/goals-context"

// Détail d'un but. Cf. design-refs/Oportun_iOS_Goal_detail/
// Oportun iOS Goal detail 1.png (but simple, "Rainy Day") et 2.png (but
// récurrent "Smart bill", "Cell phone" — carte fréquence/montant/échéance +
// callout info, réservés aux buts `recurring`). L'icône réglages n'a pas
// d'écran cible construit, reste décorative. Le solde affiché ($0.00 pour
// Rainy Day et Cell phone dans la capture) diffère de l'état courant des
// buts — cohérent avec les écarts déjà documentés entre captures Home
// (mêmes buts, montants différents selon l'instantané de démo) : on
// affiche le solde réel de `useGoals()`, pas le chiffre figé de cette
// capture précise.
export default function GoalDetailPage() {
  const { goalId } = useParams<{ goalId: string }>()
  const { goals } = useGoals()
  const goal = goals.find((g) => g.id === goalId)

  if (!goal) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
        <NavHeader leading={<NavBackButton href="/set-and-save" />} title="Goal details" />
        <p className="mt-8 text-[17px] text-neutral-500">Goal not found.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/set-and-save" />}
        title="Goal details"
        trailing={<Gear className="size-6 text-ink" />}
      />

      <div className="mt-6 flex items-center gap-4">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-full border border-neutral-200">
          <GoalIcon goal={goal} className="size-9" />
        </span>
        <h1 className="font-heading text-[28px] font-bold text-ink">{goal.name}</h1>
      </div>

      <p className="mt-6 text-[15px] text-neutral-500">Current balance</p>
      <p className="font-heading text-[32px] font-bold text-ink">${goal.amount.toFixed(2)}</p>

      <Button
        variant="secondary"
        className="mt-6 w-full"
        nativeButton={false}
        render={<Link href={`/transfer?to=${goal.id}`} />}
      >
        Add money
      </Button>

      {goal.recurring && (
        <div className="mt-6 rounded-card border border-neutral-200 px-5">
          {goal.frequency && (
            <div className="flex items-center justify-between border-b border-neutral-200 py-4">
              <span className="text-[15px] text-neutral-500">Goal frequency</span>
              <span className="text-[15px] font-bold text-ink">{goal.frequency}</span>
            </div>
          )}
          {goal.targetAmount !== undefined && (
            <div className="flex items-center justify-between border-b border-neutral-200 py-4">
              <span className="text-[15px] text-neutral-500">Target amount</span>
              <span className="text-[15px] font-bold text-ink">${goal.targetAmount.toFixed(2)}</span>
            </div>
          )}
          {goal.dueDate && (
            <div className="flex items-center justify-between py-4">
              <span className="text-[15px] text-neutral-500">Next due date</span>
              <span className="text-[15px] font-bold text-ink">{goal.dueDate}</span>
            </div>
          )}
        </div>
      )}

      {goal.recurring && (
        <div className="mt-4 flex items-start gap-3 rounded-card border border-neutral-200 p-5">
          <Info className="size-5 shrink-0 text-ink" />
          <p className="text-[15px] text-neutral-500">
            This goal saves once a week and sends back your saved amount 3-5 business days before the next due date.
          </p>
        </div>
      )}

      {goal.pendingTransfers && goal.pendingTransfers.length > 0 && (
        <>
          <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Goal activity</h2>
          <p className="mt-4 text-[13px] text-neutral-500">Pending</p>
          <div className="divide-y divide-neutral-200">
            {goal.pendingTransfers.map((transfer, i) => (
              <div key={i} className="flex items-center gap-3 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200">
                  <ArrowDown className="size-4 text-ink" />
                </span>
                <div className="flex-1">
                  <p className="font-heading text-[17px] font-bold text-ink">Transfer from Checking</p>
                  <p className="mt-1 text-[15px] text-neutral-500">Estimated {transfer.estimatedDate}</p>
                </div>
                <span className="font-heading text-[17px] font-bold text-ink">+${transfer.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
