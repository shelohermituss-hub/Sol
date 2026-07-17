"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, CaretRight, CheckCircle, ClockCountdown, Lightning, PencilSimple, RocketLaunch, TrendUp } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { StepProgress } from "@/components/ui/step-progress"
import { Card, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import { SLOT_DATES, SLOT_OPTIONS, type SlotOption } from "@/lib/dart-data"

const SLOT_ICONS: Record<SlotOption["id"], typeof Lightning> = {
  fastest: Lightning,
  "lowest-fees": ClockCountdown,
  "highest-return": TrendUp,
}

// Étape 3/4 : choix du créneau ("Choose turn"). Cf. app-cible/
// Join/Join a Game'ya/Monthly pay-in/Slot.png et
// .../Slot/Highest Return.png.
function SlotForm() {
  const params = useSearchParams()
  const amount = Number(params.get("amount")) || 30000
  const monthly = Number(params.get("monthly")) || 5000
  const months = Number(params.get("months")) || 6

  const [selectedOption, setSelectedOption] = React.useState<SlotOption["id"] | null>(null)
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)

  const backHref = `/dart/join/game-ya/monthly-pay-in?amount=${amount}`
  const dates = selectedOption ? SLOT_DATES[selectedOption] : []
  const chosenDate = dates.find((d) => d.id === selectedDate)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href={backHref} />} title="Slot" />

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

      <h1 className="mt-6 font-heading text-[20px] font-bold text-ink">Choose turn</h1>

      {!selectedOption ? (
        // État initial : liste des 3 créneaux en cartes pleine largeur avec
        // libellé de droite (frais/remise) + chevron. Cf. app-cible/
        // Join/Join a Game'ya/Monthly pay-in/Slot.png.
        <div className="mt-3 flex flex-col gap-3">
          {SLOT_OPTIONS.map((option) => {
            const Icon = SLOT_ICONS[option.id]
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedOption(option.id)}
                className="rounded-card border border-neutral-200 p-4 text-left"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0 text-ink" />
                  <span className="flex-1 font-bold text-ink">{option.label}</span>
                  {option.tag && (
                    <span
                      className={cn(
                        "text-[13px] font-semibold",
                        option.tagVariant === "success" ? "text-brand-green" : "text-neutral-500"
                      )}
                    >
                      {option.tag}
                    </span>
                  )}
                  <CaretRight className="size-4 shrink-0 text-ink" />
                </div>
                <p className="mt-1 text-[13px] text-neutral-500">{option.description}</p>
              </button>
            )
          })}
        </div>
      ) : (
        // État sélectionné : rangée de pastilles compactes + grille de
        // dates. Cf. app-cible/Join/.../Slot/Highest Return.png.
        <div className="mt-3 flex flex-wrap gap-2">
          {SLOT_OPTIONS.map((option) => {
            const Icon = SLOT_ICONS[option.id]
            const isActive = selectedOption === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelectedOption(option.id)
                  setSelectedDate(null)
                }}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] font-semibold",
                  isActive ? "border-ink bg-ink text-paper" : "border-neutral-200 text-ink"
                )}
              >
                <Icon className="size-4" weight={isActive ? "fill" : "regular"} />
                {option.label}
              </button>
            )
          })}
        </div>
      )}

      {selectedOption && (
        <div className="mt-4 grid grid-cols-2 gap-3">
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
      )}

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

export default function SlotPage() {
  return (
    <Suspense fallback={null}>
      <SlotForm />
    </Suspense>
  )
}
