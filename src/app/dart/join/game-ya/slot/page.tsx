"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowRight,
  CheckCircle,
  Gauge,
  LockSimple,
  PencilSimple,
  RocketLaunch,
  ShieldCheck,
  TrendUp,
  UserPlus,
} from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { StepProgress } from "@/components/ui/step-progress"
import { Card, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import {
  CURRENT_USER_RELIABILITY_SCORE,
  POSITION_DATES,
  RELIABILITY_TIERS,
  reliabilityTierForScore,
  type ReliabilityTier,
} from "@/lib/dart-data"

const TIER_ICONS: Record<ReliabilityTier["id"], typeof ShieldCheck> = {
  trusted: ShieldCheck,
  "building-trust": TrendUp,
  "new-member": UserPlus,
}

// Étape 3/4 : position dans le cycle du Sòl. Cf. CLAUDE.md, "Score de
// fiabilité" — remplace le choix libre de créneau (Fastest/Lowest/
// Highest) par une position déterminée par le score de fiabilité du
// membre : score élevé = positions précoces, nouveau membre = positions
// tardives. Réutilise la structure de cartes de l'ancien écran Slot (cf.
// app-cible/Join/Join a Game'ya/Monthly pay-in/Slot.png) mais les 3
// paliers ne sont plus cliquables librement : seul celui correspondant
// au score de l'utilisateur (CURRENT_USER_RELIABILITY_SCORE, simulé) est
// ouvert, les 2 autres sont verrouillés à titre informatif.
function PositionForm() {
  const params = useSearchParams()
  const amount = Number(params.get("amount")) || 30000
  const monthly = Number(params.get("monthly")) || 5000
  const months = Number(params.get("months")) || 6

  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)

  const backHref = `/dart/join/game-ya/monthly-pay-in?amount=${amount}`
  const myTier = reliabilityTierForScore(CURRENT_USER_RELIABILITY_SCORE)
  const dates = POSITION_DATES[myTier.id]
  const chosenDate = dates.find((d) => d.id === selectedDate)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href={backHref} />} title="Position" />

      <StepProgress steps={4} current={3} className="mt-4" />

      <div className="mt-6 flex items-center justify-between rounded-card border border-neutral-200 px-5 py-4">
        <span className="flex items-center gap-2">
          <CheckCircle className="size-5 shrink-0 text-brand-blue" weight="fill" />
          <span className="font-heading text-[17px] font-bold text-ink">{formatCurrency(amount)}</span>
        </span>
        <Link href={`/dart/join/game-ya?amount=${amount}`} className="flex items-center gap-1 font-bold text-brand-green">
          Edit <PencilSimple className="size-4" />
        </Link>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-card border border-neutral-200 px-5 py-4">
        <span className="flex items-center gap-2 text-[15px] text-ink">
          <CheckCircle className="size-5 shrink-0 text-brand-blue" weight="fill" />
          <span className="font-bold">{formatCurrency(monthly)}</span>
          <span className="text-neutral-500">/Monthly</span> for {months} months
        </span>
        <Link href={backHref} className="flex items-center gap-1 font-bold text-brand-green">
          Edit <PencilSimple className="size-4" />
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-card bg-neutral-200/40 px-5 py-4">
        <Gauge className="size-8 shrink-0 text-ink" weight="fill" />
        <div>
          <p className="text-[13px] text-neutral-500">Your reliability score</p>
          <p className="font-heading text-[17px] font-bold text-ink">
            {CURRENT_USER_RELIABILITY_SCORE}/100 — {myTier.label}
          </p>
        </div>
      </div>

      <h1 className="mt-6 font-heading text-[20px] font-bold text-ink">Your position</h1>
      <p className="mt-1 text-[13px] text-neutral-500">
        Your position in the cycle is set by your reliability score, not a free choice.
      </p>

      <div className="mt-3 flex flex-col gap-3">
        {RELIABILITY_TIERS.map((tier) => {
          const Icon = TIER_ICONS[tier.id]
          const isMine = tier.id === myTier.id
          return (
            <div
              key={tier.id}
              className={cn("rounded-card border p-4", isMine ? "border-ink" : "border-neutral-200 opacity-50")}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-ink" />
                <span className="flex-1 font-bold text-ink">{tier.label}</span>
                {tier.tag && (
                  <span
                    className={cn(
                      "text-[13px] font-semibold",
                      tier.tagVariant === "success" ? "text-brand-green" : "text-neutral-500"
                    )}
                  >
                    {tier.tag}
                  </span>
                )}
                {isMine ? (
                  <CheckCircle className="size-4 shrink-0 text-brand-green" weight="fill" />
                ) : (
                  <span className="flex items-center gap-1 text-[12px] text-neutral-500">
                    <LockSimple className="size-3.5" />
                    {tier.minScore}+
                  </span>
                )}
              </div>
              <p className="mt-1 text-[13px] text-neutral-500">{tier.description}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {dates.map((date) => (
          <button
            key={date.id}
            type="button"
            onClick={() => setSelectedDate(date.id)}
            className={cn(
              "rounded-card border p-4 text-left",
              selectedDate === date.id ? "border-ink" : "border-neutral-200"
            )}
          >
            <p className="text-[13px] text-ink">
              {date.month} <span className="font-bold">{date.year}</span>
            </p>
            <p className="mt-1 text-[13px] text-neutral-500">{date.day}</p>
            {date.zeroFees ? (
              <Badge variant="success" className="mt-2">
                Zero Fees
              </Badge>
            ) : (
              <p className="mt-2 text-[13px] text-neutral-500">
                <span className="font-bold text-ink">{date.fees !== undefined ? formatCurrency(date.fees) : ""}</span> Fees
              </p>
            )}
            {date.discount && (
              <p className="mt-1 text-[13px] font-bold text-brand-green">{formatCurrency(date.discount)} Discount</p>
            )}
          </button>
        ))}
      </div>

      <Card className="mt-6 flex-row items-center gap-4">
        <CardDescription className="flex-1">
          <span className="font-bold text-ink">Admin Fees</span> are split equally over your pay-in until your
          payout month.
          <br />
          <span className="mt-1 inline-flex items-center gap-1 font-bold text-brand-green">
            Learn More <ArrowRight className="size-4" />
          </span>
        </CardDescription>
        <RocketLaunch className="size-10 shrink-0 text-ink" weight="duotone" />
      </Card>

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          disabled={!chosenDate}
          nativeButton={false}
          render={
            <Link
              href={`/dart/join/game-ya/review?amount=${amount}&monthly=${monthly}&months=${months}&date=${selectedDate ?? ""}`}
            />
          }
        >
          {chosenDate ? `Continue with ${chosenDate.month}` : "Continue"}
        </Button>
      </div>
    </div>
  )
}

export default function PositionPage() {
  return (
    <Suspense fallback={null}>
      <PositionForm />
    </Suspense>
  )
}
