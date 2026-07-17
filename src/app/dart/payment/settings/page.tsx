"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, CaretRight, CreditCard, FilePlus, Scissors } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Switch } from "@/components/ui/switch"

// Réglages de paiement. Cf. app-cible/Payment/Payment Settings.png.
export default function PaymentSettingsPage() {
  const [deductPayin, setDeductPayin] = React.useState(true)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/payment" />}
        title="Payment Settings"
        trailing={<Bell className="size-6 text-ink" />}
      />

      <h1 className="mt-4 font-heading text-[20px] font-bold text-ink">Make sure to correct the following:</h1>

      <div className="mt-4 flex items-center gap-3 rounded-card border border-neutral-200 p-4">
        <Scissors className="size-6 shrink-0 text-ink" />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-ink">Deduct pay-in from payout</p>
          <p className="mt-1 text-[13px] text-neutral-500">
            If you have both payout &amp; pay-in the same month, your pay-in will be deducted automatically.
          </p>
        </div>
        <Switch checked={deductPayin} onCheckedChange={(checked) => setDeductPayin(checked)} />
      </div>

      <Link
        href="/dart/payout-method"
        className="mt-3 flex items-center gap-3 rounded-card border border-neutral-200 p-4"
      >
        <FilePlus className="size-6 shrink-0 text-ink" />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-ink">Change Payout Method</p>
          <p className="mt-1 text-[13px] text-neutral-500">You can change the payout method before your payout month.</p>
        </div>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </Link>

      <Link
        href="/dart/payment/settings/saved-cards"
        className="mt-3 flex items-center gap-3 rounded-card border border-neutral-200 p-4"
      >
        <CreditCard className="size-6 shrink-0 text-ink" />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-ink">Saved Cards</p>
          <p className="mt-1 text-[13px] text-neutral-500">Manage your pay-in cards.</p>
        </div>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </Link>
    </div>
  )
}
