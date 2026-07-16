"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowDown, Bank, CaretRight } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useAccount } from "@/lib/account-context"
import { useGoals } from "@/lib/goals-context"
import { ACCOUNT_LAST_SYNCED, ACCOUNT_SAFE_SAVING_LEVEL, ACCOUNT_TRANSACTIONS } from "@/lib/account-data"

// Détail du compte connecté. Cf. design-refs/
// Oportun_iOS_Connected_account_detail/Oportun iOS Connected account
// detail 1-2.png (deux variantes de données dans les captures — on retient
// la variante la plus complète : nom "Mobbin bank", "Safe saving level"
// renseigné, activité récente présente). Icône Bank générique plutôt que
// le logo Bank of America (marque déposée, cf. ASSETS-A-REMPLACER.md).
// "Safe saving level" n'a pas d'écran cible construit (pas dans les 15
// flows documentés), reste décoratif malgré le chevron affiché dans la
// capture. "Remove account" ouvre la sheet de confirmation du flux
// "Removing an account" (design-refs/Oportun_iOS_Removing_an_account/
// Oportun iOS Removing an account 1.png).
export default function ConnectedAccountPage() {
  const router = useRouter()
  const { accountName, availableBalance, removeAccount } = useAccount()
  const { totalSaved } = useGoals()
  const preview = ACCOUNT_TRANSACTIONS[0]
  const [removeSheetOpen, setRemoveSheetOpen] = React.useState(false)

  function handleRemove() {
    removeAccount()
    router.push("/profile/connected-accounts?removed=1")
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/home" />} title="Connected account" />

      <span className="mt-6 flex size-16 items-center justify-center rounded-2xl border border-neutral-200">
        <Bank className="size-7 text-ink" />
      </span>

      <h1 className="mt-4 font-heading text-[28px] font-bold text-ink">Bank of America</h1>
      <p className="mt-1 text-[17px] text-neutral-500">{accountName}</p>

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Details</h2>

      <Link href="/connected-account/edit-name" className="flex items-center justify-between border-b border-neutral-200 py-4">
        <span>
          <span className="block text-[15px] text-neutral-500">Account name</span>
          <span className="mt-1 block text-[17px] text-ink">{accountName}</span>
        </span>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </Link>

      <div className="border-b border-neutral-200 py-4">
        <p className="text-[15px] text-neutral-500">Available balance</p>
        <p className="mt-1 text-[17px] text-ink">${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
      </div>

      <div className="border-b border-neutral-200 py-4">
        <p className="text-[15px] text-neutral-500">Last synced with Plaid</p>
        <p className="mt-1 text-[17px] text-ink">{ACCOUNT_LAST_SYNCED}</p>
      </div>

      <div className="flex items-center justify-between border-b border-neutral-200 py-4">
        <span>
          <span className="block text-[15px] text-neutral-500">Safe saving level</span>
          <span className="mt-1 block text-[17px] text-ink">{ACCOUNT_SAFE_SAVING_LEVEL}</span>
        </span>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </div>

      <button
        type="button"
        onClick={() => setRemoveSheetOpen(true)}
        className="text-left text-[17px] font-bold text-brand-green"
      >
        Remove account
      </button>

      <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Recent activity</h2>
      <Link href="/connected-account/activity" className="flex items-center gap-3 py-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200">
          <ArrowDown className="size-4 text-ink" />
        </span>
        <p className="flex-1 text-[15px] text-neutral-500">{preview.date}</p>
        <span className="font-heading text-[17px] font-bold text-ink">
          -${Math.abs(preview.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </Link>

      <Sheet open={removeSheetOpen} onOpenChange={setRemoveSheetOpen}>
        <SheetContent>
          <SheetTitle>Remove account?</SheetTitle>
          <p className="text-[15px] text-neutral-500">
            This means Oportun won&apos;t be able to move money to or from this account.
          </p>
          <p className="text-[15px] text-neutral-500">
            We will initiate a transfer of ${totalSaved.toFixed(2)} to your {accountName} account shortly. Please
            note, it may take 3-5 days for the transfer to complete and for the money to be available in your
            account.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setRemoveSheetOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
