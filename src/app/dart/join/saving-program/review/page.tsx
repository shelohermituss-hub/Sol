"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "@phosphor-icons/react/ssr"

import { NavHeader } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency"
import { useDart } from "@/lib/dart-context"

// Révision du Saving Program (écran non capturé, construit par analogie —
// cf. FONCTIONNEL.md, décisions Étape 1).
function ReviewSavingForm() {
  const router = useRouter()
  const params = useSearchParams()
  const amount = Number(params.get("amount")) || 3000
  const monthly = Number(params.get("monthly")) || 500
  const months = Number(params.get("months")) || 6
  const cashback = Number(params.get("cashback")) || 0

  const { addJoinedCircle } = useDart()

  function handleConfirm() {
    addJoinedCircle({
      id: `saving-${Date.now()}`,
      amount: amount + cashback,
      monthly,
      totalMonths: months,
      yourTurnIndex: months - 1,
      startLabel: "Now",
      endLabel: "Payout",
      adminFees: 0,
    })
    router.push("/dart/payout-method")
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={
          <button type="button" onClick={() => router.back()} aria-label="Back" className="text-ink">
            <ArrowLeft className="size-6" />
          </button>
        }
        title="Review"
      />

      <h1 className="mt-6 font-heading text-[24px] font-bold text-ink">Review your savings</h1>

      <div className="mt-6 rounded-card border border-neutral-200 px-5">
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-[15px] text-neutral-500">Saving amount</span>
          <span className="text-[15px] font-bold text-ink">{formatCurrency(amount)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-[15px] text-neutral-500">Monthly pay-in</span>
          <span className="text-[15px] font-bold text-ink">
            {formatCurrency(monthly)} for {months} months
          </span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-[15px] text-neutral-500">Cashback</span>
          <span className="text-[15px] font-bold text-brand-green">Up to {formatCurrency(cashback)}</span>
        </div>
      </div>

      <div className="mt-auto pb-6">
        <Button className="w-full" onClick={handleConfirm}>
          Confirm &amp; start saving
        </Button>
      </div>
    </div>
  )
}

export default function ReviewSavingPage() {
  return (
    <Suspense fallback={null}>
      <ReviewSavingForm />
    </Suspense>
  )
}
