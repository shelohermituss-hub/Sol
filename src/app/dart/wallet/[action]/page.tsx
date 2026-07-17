"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency"
import { useDart } from "@/lib/dart-context"

const MIN_AMOUNT = 100
const MAX_AMOUNT = 50000

// "Add Cash"/"Cash Out" du bloc Cash Balance de l'accueil. Un seul écran
// paramétré par l'action plutôt que deux pages quasi identiques — met à
// jour le portefeuille (DartProvider) via MonCash, pas de carte bancaire
// (cf. CLAUDE.md, "Paiement").
export default function WalletActionPage() {
  const router = useRouter()
  const params = useParams<{ action: string }>()
  const { walletBalance, addCash, cashOut } = useDart()
  const isCashOut = params.action === "cash-out"
  const isValidAction = params.action === "add-cash" || params.action === "cash-out"

  const maxForCashOut = Math.max(MIN_AMOUNT, Math.min(MAX_AMOUNT, walletBalance))
  const [amount, setAmount] = React.useState(Math.min(1000, isCashOut ? maxForCashOut : MAX_AMOUNT))

  if (!isValidAction) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
        <NavHeader leading={<NavBackButton href="/dart/home" />} title="Wallet" />
        <p className="mt-8 text-center text-[15px] text-neutral-500">This page doesn&apos;t exist.</p>
      </div>
    )
  }

  function handleConfirm() {
    if (isCashOut) {
      cashOut(amount)
    } else {
      addCash(amount)
    }
    router.push("/dart/home")
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/home" />} title={isCashOut ? "Cash Out" : "Add Cash"} />

      <p className="mt-8 text-[15px] text-neutral-500">{isCashOut ? "Amount to cash out" : "Amount to add"}</p>
      <p className="font-heading text-[32px] font-bold text-ink">{formatCurrency(amount)}</p>

      <Slider
        className="mt-4"
        min={MIN_AMOUNT}
        max={isCashOut ? maxForCashOut : MAX_AMOUNT}
        step={100}
        value={amount}
        onValueChange={(v) => setAmount(v as number)}
      />
      <div className="flex items-center justify-between text-[13px] text-neutral-500">
        <span>{formatCurrency(MIN_AMOUNT)}</span>
        <span>{formatCurrency(isCashOut ? maxForCashOut : MAX_AMOUNT)}</span>
      </div>

      <p className="mt-6 text-[13px] text-neutral-500">
        {isCashOut
          ? `Your balance is currently ${formatCurrency(walletBalance)}. Cashing out sends this amount to your MonCash number.`
          : "Cash is added to your Sòlid wallet via MonCash."}
      </p>

      <div className="mt-auto pb-6">
        <Button className="w-full" onClick={handleConfirm} disabled={isCashOut && walletBalance <= 0}>
          Confirm
        </Button>
      </div>
    </div>
  )
}
