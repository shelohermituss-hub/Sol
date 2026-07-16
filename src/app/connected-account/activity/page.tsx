"use client"

import { ArrowDown } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { ACCOUNT_TRANSACTIONS } from "@/lib/account-data"

// Historique complet des transactions du compte connecté. Cf.
// design-refs/Oportun_iOS_Connected_account_detail/
// Oportun iOS Connected account detail 3.png.
export default function ConnectedAccountActivityPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/connected-account" />} title="Connected account" />

      <h1 className="mt-6 font-heading text-[20px] font-bold text-ink">Recent activity</h1>

      <div className="divide-y divide-neutral-200">
        {ACCOUNT_TRANSACTIONS.map((transaction, i) => (
          <div key={i} className="flex items-center gap-3 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200">
              <ArrowDown className="size-4 text-ink" />
            </span>
            <p className="flex-1 text-[15px] text-neutral-500">{transaction.date}</p>
            <span className="font-heading text-[17px] font-bold text-ink">
              -${Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
