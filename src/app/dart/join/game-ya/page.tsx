"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, RocketLaunch } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { StepProgress } from "@/components/ui/step-progress"
import { Slider } from "@/components/ui/slider"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const MIN_AMOUNT = 3000
const MAX_AMOUNT = 120000

// Étape 1/4 du flux "Join a Game'ya" : choix du montant du circle. Cf.
// app-cible/Join/Join a Game'ya.png. Slider nouveau composant (cf.
// FONCTIONNEL.md, Étape 2).
function PayoutAmountForm() {
  const params = useSearchParams()
  const [amount, setAmount] = React.useState(Number(params.get("amount")) || 30000)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/join" />} title="Payout Amount" />

      <StepProgress steps={4} current={1} className="mt-4" />

      <p className="mt-8 text-[15px] text-neutral-500">Payout Amount</p>
      <p className="font-heading text-[32px] font-bold text-ink">{amount.toLocaleString("en-US")} MAD</p>

      <Slider
        className="mt-4"
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        step={1000}
        value={amount}
        onValueChange={(v) => setAmount(v as number)}
      />
      <div className="flex items-center justify-between text-[13px] text-neutral-500">
        <span>{MIN_AMOUNT.toLocaleString("en-US")} MAD</span>
        <span>{MAX_AMOUNT.toLocaleString("en-US")} MAD</span>
      </div>

      <Card className="mt-8 flex-row items-center gap-4">
        <div className="flex-1">
          <CardTitle className="text-[15px]">
            Payout Amount <span className="font-normal text-neutral-500">Your monthly pay-in is automatically deducted from your circle amount.</span>
          </CardTitle>
          <CardDescription className="mt-2 flex items-center gap-1 font-bold text-brand-green">
            Learn More <ArrowRight className="size-4" />
          </CardDescription>
        </div>
        <RocketLaunch className="size-10 shrink-0 text-ink" weight="duotone" />
      </Card>

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          nativeButton={false}
          render={<Link href={`/dart/join/game-ya/monthly-pay-in?amount=${amount}`} />}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default function PayoutAmountPage() {
  return (
    <Suspense fallback={null}>
      <PayoutAmountForm />
    </Suspense>
  )
}
