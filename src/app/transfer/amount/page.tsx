"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Bank } from "@phosphor-icons/react/ssr"

import { NavHeader, CancelLink } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { NumericKeypad } from "@/components/ui/numeric-keypad"
import { useAccount } from "@/lib/account-context"

// Saisie du montant au clavier numérique. Cf. design-refs/
// Oportun_iOS_Transferring_money/Oportun iOS Transferring money 3-4.png.
function SelectAmountForm() {
  const router = useRouter()
  const params = useSearchParams()
  const toGoalId = params.get("to") ?? ""
  const { availableBalance } = useAccount()

  const [amount, setAmount] = React.useState("")

  function handleKey(key: string) {
    if (key === "backspace") {
      setAmount((prev) => prev.slice(0, -1))
      return
    }
    if (key === "." && amount.includes(".")) return
    setAmount((prev) => prev + key)
  }

  const amountNumber = Number(amount)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={
          <button
            type="button"
            onClick={() => router.push(`/transfer?to=${toGoalId}`)}
            aria-label="Back"
            className="text-ink"
          >
            <ArrowLeft className="size-6" />
          </button>
        }
        title="Select amount"
        trailing={<CancelLink href="/home" />}
      />

      <p className="mt-12 text-center font-heading text-[48px] font-bold text-ink">${amount || "0"}</p>

      <div className="mt-6 border-t border-neutral-200" />

      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200">
          <Bank className="size-5 text-ink" />
        </span>
        <span className="text-[17px] text-neutral-500">
          ${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} available
        </span>
      </div>

      <div className="mt-auto">
        <NumericKeypad onPress={handleKey} />
      </div>

      <div className="mt-6 pb-6">
        <Button
          className="w-full"
          disabled={!(amountNumber > 0)}
          nativeButton={false}
          render={<Link href={`/transfer/review?to=${toGoalId}&amount=${amount}`} />}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default function SelectAmountPage() {
  return (
    <Suspense fallback={null}>
      <SelectAmountForm />
    </Suspense>
  )
}
