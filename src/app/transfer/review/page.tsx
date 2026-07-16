"use client"

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Bank } from "@phosphor-icons/react/ssr"

import { NavHeader, CancelLink } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { GoalIcon } from "@/components/sections/goal-icon"
import { useGoals } from "@/lib/goals-context"
import { useAccount } from "@/lib/account-context"

// Révision du transfert avant confirmation. Cf. design-refs/
// Oportun_iOS_Transferring_money/Oportun iOS Transferring money 5.png.
// "Make transfer" applique réellement le mouvement (crédite le but, débite
// le solde du compte connecté) via useGoals()/useAccount().
function ReviewTransferForm() {
  const router = useRouter()
  const params = useSearchParams()
  const toGoalId = params.get("to") ?? ""
  const amount = params.get("amount") ?? "0"
  const amountNumber = Number(amount)

  const { goals, addToGoalAmount } = useGoals()
  const { accountName, availableBalance, withdraw } = useAccount()
  const toGoal = goals.find((g) => g.id === toGoalId)

  function handleMakeTransfer() {
    addToGoalAmount(toGoalId, amountNumber)
    withdraw(amountNumber)
    router.push(`/transfer/submitted?amount=${amount}`)
  }

  if (!toGoal) return null

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={
          <button
            type="button"
            onClick={() => router.push(`/transfer/amount?to=${toGoalId}`)}
            aria-label="Back"
            className="text-ink"
          >
            <ArrowLeft className="size-6" />
          </button>
        }
        title="Review transfer"
        trailing={<CancelLink href="/home" />}
      />

      <p className="mt-6 font-heading text-[32px] font-bold text-ink">${amountNumber.toFixed(2)}</p>
      <div className="mt-4 border-t border-neutral-200" />

      <p className="mt-6 text-[15px] text-neutral-500">From</p>
      <div className="mt-1 flex items-center gap-4 border-b border-neutral-200 pb-6">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-neutral-200">
          <Bank className="size-6 text-ink" />
        </span>
        <span>
          <span className="block font-heading text-[17px] font-bold text-ink">{accountName}</span>
          <span className="block text-[15px] text-neutral-500">
            ${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} available
          </span>
        </span>
      </div>

      <p className="mt-6 text-[15px] text-neutral-500">To</p>
      <div className="mt-1 flex items-center gap-4 pb-6">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-neutral-200">
          <GoalIcon goal={toGoal} className="size-6" />
        </span>
        <span>
          <span className="block font-heading text-[17px] font-bold text-ink">{toGoal.name}</span>
          <span className="block text-[15px] text-neutral-500">${toGoal.amount.toFixed(2)} available</span>
        </span>
      </div>

      <p className="text-[15px] text-neutral-500">
        By tapping Make transfer, I <span className="font-bold text-brand-green">authorize</span> a one-time
        transfer.
      </p>
      <p className="mt-4 text-[15px] text-neutral-500">
        It can take 3-5 business days for the money to be available in your account for standard transfers. For
        instant transfers, money will become available within a few minutes.
      </p>

      <div className="mt-auto pb-6">
        <Button className="w-full" onClick={handleMakeTransfer}>
          Make transfer
        </Button>
      </div>
    </div>
  )
}

export default function ReviewTransferPage() {
  return (
    <Suspense fallback={null}>
      <ReviewTransferForm />
    </Suspense>
  )
}
