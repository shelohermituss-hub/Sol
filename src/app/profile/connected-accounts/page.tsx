"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Bank, CaretRight, Plus } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { SuccessBanner } from "@/components/ui/success-banner"
import { useAccount } from "@/lib/account-context"

// Liste des comptes connectés (distincte du détail d'un compte). Cf.
// design-refs/Oportun_iOS_Removing_an_account/
// Oportun iOS Removing an account 2-3.png. Un seul compte possible dans
// cette reproduction — la ligne "Bank of America" disparaît quand
// useAccount().removed est vrai. "Add account" n'a pas d'écran cible
// construit, reste décoratif.
function ConnectedAccountsContent() {
  const router = useRouter()
  const params = useSearchParams()
  const removed = params.get("removed") === "1"
  const { removed: accountRemoved, accountName, availableBalance } = useAccount()

  React.useEffect(() => {
    if (!removed) return
    const timeout = setTimeout(() => router.replace("/profile/connected-accounts"), 4000)
    return () => clearTimeout(timeout)
  }, [removed, router])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/profile" />} title="Connected accounts" />

      {removed && <SuccessBanner className="mt-4">Account removed!</SuccessBanner>}

      <h1 className="mt-4 font-heading text-[20px] font-bold text-ink">Accounts</h1>

      {!accountRemoved && (
        <Link href="/connected-account" className="flex items-center gap-4 border-b border-neutral-200 py-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-neutral-200">
            <Bank className="size-6 text-ink" />
          </span>
          <span className="flex-1">
            <span className="block font-heading text-[17px] font-bold text-ink">{accountName}</span>
            <span className="block text-[15px] text-neutral-500">
              ${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} available
            </span>
          </span>
          <CaretRight className="size-5 shrink-0 text-ink" />
        </Link>
      )}

      <div className="flex items-center gap-4 py-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-dashed border-neutral-200">
          <Plus className="size-5 text-ink" />
        </span>
        <span className="flex-1 font-heading text-[17px] font-bold text-ink">Add account</span>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </div>
    </div>
  )
}

export default function ConnectedAccountsPage() {
  return (
    <Suspense fallback={null}>
      <ConnectedAccountsContent />
    </Suspense>
  )
}
