"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "@phosphor-icons/react/ssr"

import { NavHeader } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency"
import { useDart } from "@/lib/dart-context"

// Étape 4/4 : révision (écran non capturé dans app-cible/, construit par
// analogie avec la sheet de révision "Creating a goal" de l'app 1 — cf.
// FONCTIONNEL.md, décisions Étape 1). "Confirm" ajoute le sòl à "Your
// Circles" puis enchaîne sur Payout Method, comme pour tout sòl
// nouvellement rejoint. Terminologie affichée "Sòl" (cf. CLAUDE.md) — le
// nom de fonction interne `addJoinedCircle`/`circle-${...}` reste
// inchangé, jamais exposé à l'écran.
function ReviewJoinForm() {
  const router = useRouter()
  const params = useSearchParams()
  const amount = Number(params.get("amount")) || 30000
  const monthly = Number(params.get("monthly")) || 5000
  const months = Number(params.get("months")) || 6
  const date = params.get("date") ?? ""

  const { addJoinedCircle } = useDart()

  function handleConfirm() {
    addJoinedCircle({
      id: `circle-${Date.now()}`,
      amount,
      monthly,
      totalMonths: months,
      yourTurnIndex: Math.floor(months / 3),
      startLabel: "Now",
      endLabel: date || "—",
      adminFees: Math.round(amount * 0.096),
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

      <h1 className="mt-6 font-heading text-[24px] font-bold text-ink">Review your sòl</h1>

      <div className="mt-6 rounded-card border border-neutral-200 px-5">
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-[15px] text-neutral-500">Sòl amount</span>
          <span className="text-[15px] font-bold text-ink">{formatCurrency(amount)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-[15px] text-neutral-500">Monthly pay-in</span>
          <span className="text-[15px] font-bold text-ink">
            {formatCurrency(monthly)} for {months} months
          </span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-[15px] text-neutral-500">Position</span>
          <span className="text-[15px] font-bold text-ink">{date || "—"}</span>
        </div>
      </div>

      <p className="mt-6 text-[13px] text-neutral-500">
        By tapping Confirm, I <span className="font-bold text-brand-green">authorize</span> the recurring monthly
        pay-in for this sòl.
      </p>

      <div className="mt-auto pb-6">
        <Button className="w-full" onClick={handleConfirm}>
          Confirm &amp; join sòl
        </Button>
      </div>
    </div>
  )
}

export default function ReviewJoinPage() {
  return (
    <Suspense fallback={null}>
      <ReviewJoinForm />
    </Suspense>
  )
}
