"use client"

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CaretDown, X } from "@phosphor-icons/react/ssr"

import { NavHeader, CancelLink } from "@/components/layout/nav-header"
import { TextField } from "@/components/ui/text-field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DateWheelPicker, formatWheelDate } from "@/components/ui/date-wheel-picker"
import { GoalIcon } from "@/components/sections/goal-icon"
import { useGoals } from "@/lib/goals-context"
import type { GoalIconKey } from "@/lib/goals-data"

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`
}

const FREQUENCIES = ["Every 2 weeks", "Every month", "Every 3 months", "Every 6 months", "Every year"] as const
const FREQUENCY_WEEKS: Record<(typeof FREQUENCIES)[number], number> = {
  "Every 2 weeks": 2,
  "Every month": 4.33,
  "Every 3 months": 13,
  "Every 6 months": 26,
  "Every year": 52,
}

function SelectField({
  label,
  placeholder,
  displayValue,
  onClick,
  hasCaret,
  onClear,
}: {
  label: string
  placeholder: string
  displayValue?: string
  onClick: () => void
  hasCaret?: boolean
  onClear?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-14 w-full items-center rounded-input border border-neutral-200 bg-transparent px-4 pr-11 text-left transition-colors"
    >
      {displayValue ? (
        <span className="flex w-full flex-col">
          <span className="text-xs text-neutral-500">{label}</span>
          <span className="text-base text-ink">{displayValue}</span>
        </span>
      ) : (
        <span className="text-base text-neutral-500">{placeholder}</span>
      )}
      {hasCaret && <CaretDown className="absolute right-4 size-4 text-neutral-500" />}
      {displayValue && onClear && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
          className="absolute right-4 text-ink"
          aria-label="Clear"
        >
          <X className="size-5" />
        </span>
      )}
    </button>
  )
}

// Formulaire de détails du but (nom/icône + fréquence + échéance + montant),
// commun aux deux entrées du flux (Savings goal générique, ou Smart bill
// préremplie depuis la catégorie choisie). Fréquence, date et révision sont
// des bottom sheets superposées à ce formulaire, pas des routes séparées —
// fidèle aux captures 3-10 où le formulaire reste visible en fond
// (assombri) derrière chaque sheet.
function CreateGoalDetailsForm() {
  const router = useRouter()
  const params = useSearchParams()

  const [name, setName] = React.useState(params.get("name") ?? "")
  const iconKey = (params.get("icon") as GoalIconKey | null) ?? "pencil"
  const iconColor = params.get("color") ?? "#D9A566"

  const [frequency, setFrequency] = React.useState<string | null>(null)
  const [frequencySheetOpen, setFrequencySheetOpen] = React.useState(false)
  const [pendingFrequency, setPendingFrequency] = React.useState<string | null>(null)

  const [dueDate, setDueDate] = React.useState<string | null>(null)
  const [dueDateDay, setDueDateDay] = React.useState<number | null>(null)
  const [dateSheetOpen, setDateSheetOpen] = React.useState(false)
  const [wheelValue, setWheelValue] = React.useState({ month: 5, day: 14, year: 3 })

  const [amount, setAmount] = React.useState("")
  const [reviewOpen, setReviewOpen] = React.useState(false)

  const { addGoal } = useGoals()

  const amountNumber = Number(amount)
  const canReview = name.trim() !== "" && frequency !== null && dueDate !== null && amountNumber > 0

  const weeklyAmount =
    frequency && amountNumber > 0 ? Math.round(amountNumber / FREQUENCY_WEEKS[frequency as (typeof FREQUENCIES)[number]]) : 0

  function handleConfirmGoal() {
    addGoal({
      id: `goal-${Date.now()}`,
      name,
      icon: iconKey,
      iconColor,
      amount: 0,
      targetAmount: amountNumber,
      frequency: frequency ?? undefined,
      dueDate: dueDate ?? undefined,
      isNew: true,
      recurring: true,
    })
    router.push("/?created=1")
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={
          <button type="button" onClick={() => router.back()} aria-label="Back" className="text-ink">
            <ArrowLeft className="size-6" />
          </button>
        }
        title="Goal details"
        trailing={<CancelLink href="/set-and-save" />}
      />

      <div className="mt-6 flex items-center gap-4">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-neutral-200">
          <GoalIcon goal={{ icon: iconKey, iconColor }} className="size-7" />
        </span>
        <TextField className="flex-1" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mt-4">
        <SelectField
          label="Goal frequency *"
          placeholder="Select goal frequency *"
          displayValue={frequency ?? undefined}
          hasCaret
          onClick={() => {
            setPendingFrequency(frequency)
            setFrequencySheetOpen(true)
          }}
        />
      </div>

      <div className="mt-4">
        <SelectField
          label="Next due date *"
          placeholder="Select next due date *"
          displayValue={dueDate ?? undefined}
          onClear={() => {
            setDueDate(null)
            setDueDateDay(null)
          }}
          onClick={() => setDateSheetOpen(true)}
        />
      </div>

      <div className="mt-4">
        <TextField
          label={amount ? "Target amount *" : "Add bill target amount *"}
          inputMode="decimal"
          value={amount ? `$${amount}` : ""}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          clearable={amount !== ""}
          onClear={() => setAmount("")}
        />
      </div>

      {dueDate && dueDateDay && frequency && (
        <p className="mt-6 text-[15px] text-neutral-500">
          We&apos;ll try to reach your goal by <span className="font-bold text-ink">{ordinal(dueDateDay)}</span> of{" "}
          <span className="font-bold text-ink">{frequency.charAt(0).toLowerCase() + frequency.slice(1)}</span>.
        </p>
      )}

      <div className="mt-auto pb-6">
        <Button className="w-full" disabled={!canReview} onClick={() => setReviewOpen(true)}>
          Review
        </Button>
      </div>

      {/* Bottom sheet : fréquence */}
      <Sheet open={frequencySheetOpen} onOpenChange={setFrequencySheetOpen}>
        <SheetContent>
          <SheetTitle>Goal frequency</SheetTitle>
          <SheetDescription>Set the frequency based on how often you have to pay this bill.</SheetDescription>
          <RadioGroup
            value={pendingFrequency ?? ""}
            onValueChange={(v) => setPendingFrequency(v as string)}
            className="mt-2 divide-y divide-neutral-200"
          >
            {FREQUENCIES.map((f) => (
              <label key={f} className="flex items-center justify-between py-4">
                <span className="text-[17px] text-ink">{f}</span>
                <RadioGroupItem value={f} />
              </label>
            ))}
          </RadioGroup>
          <Button
            className="w-full"
            disabled={!pendingFrequency}
            onClick={() => {
              setFrequency(pendingFrequency)
              setFrequencySheetOpen(false)
            }}
          >
            Save frequency
          </Button>
        </SheetContent>
      </Sheet>

      {/* Bottom sheet : date (roue façon iOS natif) */}
      <Sheet open={dateSheetOpen} onOpenChange={setDateSheetOpen}>
        <SheetContent className="pb-0">
          <DateWheelPicker value={wheelValue} onChange={setWheelValue} />
          <div className="border-t border-neutral-200 pt-4 pb-2 text-center">
            <button
              type="button"
              className="text-[17px] font-semibold text-[#007AFF]"
              onClick={() => {
                setDueDate(formatWheelDate(wheelValue))
                setDueDateDay(wheelValue.day + 1)
                setDateSheetOpen(false)
              }}
            >
              Confirm
            </button>
          </div>
          <button
            type="button"
            className="mb-2 w-full rounded-full border border-neutral-200 py-3.5 text-[17px] font-semibold text-[#007AFF]"
            onClick={() => setDateSheetOpen(false)}
          >
            Cancel
          </button>
        </SheetContent>
      </Sheet>

      {/* Bottom sheet : révision */}
      <Sheet open={reviewOpen} onOpenChange={setReviewOpen}>
        <SheetContent>
          <NavHeader
            leading={
              <button type="button" onClick={() => setReviewOpen(false)} aria-label="Close" className="text-ink">
                <X className="size-6" />
              </button>
            }
            title="Review"
          />
          <p className="text-[17px] text-neutral-500">
            Once created, we&apos;ll start saving for this goal based on the details you entered.
          </p>

          <div className="rounded-card border border-neutral-200 px-5">
            <div className="flex items-center justify-between border-b border-neutral-200 py-4">
              <span className="flex items-center gap-3">
                <GoalIcon goal={{ icon: iconKey, iconColor }} className="size-6" />
                <span className="font-heading text-[17px] font-bold text-ink">{name}</span>
              </span>
              <span className="font-heading text-[17px] font-bold text-ink">${amount || "0.00"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-200 py-4">
              <span className="text-[15px] text-neutral-500">Repeat frequency</span>
              <span className="text-[15px] font-bold text-ink">{frequency}</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-[15px] text-neutral-500">Next due date</span>
              <span className="text-[15px] font-bold text-ink">{dueDate}</span>
            </div>
          </div>

          <h2 className="font-heading text-[20px] font-bold text-ink">How we&apos;ll save</h2>
          <div className="flex gap-3">
            <span className="text-2xl">🐷</span>
            <div>
              <p className="font-heading text-[17px] font-bold text-ink">Around ${weeklyAmount} per week</p>
              <p className="mt-1 text-[15px] text-neutral-500">
                We&apos;ll aim to save about ${weeklyAmount} every week to reach your goal by the due date.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">💸</span>
            <div>
              <p className="font-heading text-[17px] font-bold text-ink">Back on time</p>
              <p className="mt-1 text-[15px] text-neutral-500">
                5 days before your due date, we&apos;ll send the total saved amount back to you.*
              </p>
            </div>
          </div>

          <p className="text-[13px] text-neutral-500">
            *We&apos;ll initiate the transfer of your saved amount 3-5 business days before your due date. The
            amounts saved every week may differ based on your available funds.
          </p>
          <p className="text-[13px] text-neutral-500">
            By tapping &quot;Confirm &amp; create goal&quot;, you agree you have read the{" "}
            <span className="font-bold text-brand-green">authorization</span> for multiple transfers on the schedule
            selected above and agree to those terms.
          </p>

          <Button className="w-full" onClick={handleConfirmGoal}>
            Confirm &amp; create goal
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function CreateGoalDetailsPage() {
  return (
    <Suspense fallback={null}>
      <CreateGoalDetailsForm />
    </Suspense>
  )
}
