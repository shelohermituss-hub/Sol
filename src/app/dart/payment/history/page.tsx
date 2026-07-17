"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUp, Bell } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { SegmentedControl, SegmentedControlList, SegmentedControlTab } from "@/components/ui/segmented-control"
import { formatCurrency } from "@/lib/currency"
import { PAYMENT_TRANSACTIONS } from "@/lib/dart-data"

// Historique des paiements. Cf. app-cible/Payment/Payment History/
// Payments.png, Payout.png et Payment History(Empty).png.
export default function PaymentHistoryPage() {
  const [tab, setTab] = React.useState<"payment" | "payout">("payment")
  const transactions = PAYMENT_TRANSACTIONS.filter((t) => t.kind === tab)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/payment" />}
        title="Payment History"
        trailing={<Bell className="size-6 text-ink" />}
      />

      <SegmentedControl value={tab} onValueChange={(v) => setTab(v as "payment" | "payout")} className="mt-6">
        <SegmentedControlList>
          <SegmentedControlTab value="payment">Payments</SegmentedControlTab>
          <SegmentedControlTab value="payout">Payouts</SegmentedControlTab>
        </SegmentedControlList>
      </SegmentedControl>

      {transactions.length > 0 ? (
        <div className="mt-4 flex flex-col gap-3">
          {transactions.map((t) => {
            const Icon = t.kind === "payment" ? ArrowUp : ArrowDown
            return (
              <div key={t.id} className="flex items-center gap-3 rounded-card border border-neutral-200 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-200/50">
                  <Icon className="size-4 text-ink" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2">
                    <span className="font-heading text-[17px] font-bold text-ink">
                      {formatCurrency(t.amount)}
                    </span>
                    <span className="text-[13px] text-neutral-500">
                      {t.time}, {t.date}
                    </span>
                  </p>
                  <p className="mt-1 text-[13px] text-neutral-500">
                    You have {t.kind === "payment" ? "paid for" : "received for"} circle for the month of{" "}
                    <span className="font-bold text-brand-green">{t.month}</span>.
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <Image src="/images/illustrations/dart-payment-history-empty.svg" alt="" width={320} height={320} className="w-28" />
          <p className="mt-4 font-heading text-[17px] font-bold text-ink">
            You don&apos;t have any payment history yet.
          </p>
          <p className="mt-1 text-[15px] text-neutral-500">
            Transactions will appear here whenever you pay an installment or received payout.
          </p>
          <Link href="/dart/circles" className="mt-4 flex items-center gap-1 font-bold text-brand-green">
            Explore Circles <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
