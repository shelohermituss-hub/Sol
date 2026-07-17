"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CaretRight, CheckCircle, PencilSimple, RocketLaunch } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { StepProgress } from "@/components/ui/step-progress"
import { Card, CardDescription } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"
import { MONTHLY_PAYIN_OPTIONS } from "@/lib/dart-data"

// Étape 2/4 : choix de la mensualité. Cf. app-cible/
// Join/Join a Game'ya/Monthly pay-in.png.
function MonthlyPayInForm() {
  const router = useRouter()
  const params = useSearchParams()
  const amount = Number(params.get("amount")) || 30000

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href={`/dart/join/game-ya?amount=${amount}`} />} title="Monthly Pay-in" />

      <StepProgress steps={4} current={2} className="mt-4" />

      <div className="mt-6 flex items-center justify-between rounded-card border border-neutral-200 px-5 py-4">
        <span className="flex items-center gap-2">
          <CheckCircle className="size-5 shrink-0 text-brand-blue" weight="fill" />
          <span className="font-heading text-[17px] font-bold text-ink">{formatCurrency(amount)}</span>
        </span>
        <Link href={`/dart/join/game-ya?amount=${amount}`} className="flex items-center gap-1 font-bold text-brand-green">
          Edit <PencilSimple className="size-4" />
        </Link>
      </div>

      <h1 className="mt-6 font-heading text-[20px] font-bold text-ink">Choose your suitable monthly pay-in</h1>

      <div className="mt-4 flex flex-col gap-3">
        {MONTHLY_PAYIN_OPTIONS.map((option) => (
          <button
            key={option.months}
            type="button"
            onClick={() =>
              router.push(
                `/dart/join/game-ya/slot?amount=${amount}&monthly=${option.monthly}&months=${option.months}`
              )
            }
            className="flex items-center justify-between rounded-input border border-neutral-200 px-4 py-4 text-left"
          >
            <span className="text-[15px] text-ink">
              <span className="font-bold text-brand-green">{formatCurrency(option.monthly)}</span>
              <span className="text-neutral-500">/Monthly</span>
            </span>
            <span className="flex items-center gap-1 text-[15px] text-neutral-500">
              for {option.months} months
              <CaretRight className="size-4" />
            </span>
          </button>
        ))}
      </div>

      <Card className="mt-6 flex-row items-center gap-4">
        <CardDescription className="flex-1">
          <span className="font-bold text-ink">Monthly pay-in</span> may vary according to the discount or fees
          applied on your payout slot.
        </CardDescription>
        <RocketLaunch className="size-10 shrink-0 text-ink" weight="duotone" />
      </Card>
    </div>
  )
}

export default function MonthlyPayInPage() {
  return (
    <Suspense fallback={null}>
      <MonthlyPayInForm />
    </Suspense>
  )
}
