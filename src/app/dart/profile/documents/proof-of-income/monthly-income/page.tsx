"use client"

import * as React from "react"
import Link from "next/link"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { NumericKeypad } from "@/components/ui/numeric-keypad"
import { Button } from "@/components/ui/button"

// Saisie du revenu mensuel (clavier numérique non visible sur la capture
// source mais impliqué par l'affichage montant — même pattern que
// /transfer/amount). Cf. app-cible/Profile/My Documents/Proof of Income/
// Your Monthly Income.png.
export default function MonthlyIncomePage() {
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
      <NavHeader leading={<NavBackButton href="/dart/profile/documents/proof-of-income" />} title="Your Monthly Income" />

      <p className="mt-4 text-[15px] text-neutral-500">
        Your monthly income will be used to calculate your monthly pay-in limit.
      </p>

      <div className="mt-6 rounded-card bg-neutral-200/40 py-8 text-center">
        <p className="font-heading text-[28px] font-bold text-ink">
          <span className="text-neutral-500">{amount || "0"}</span> MAD
        </p>
      </div>

      <div className="mt-auto">
        <NumericKeypad onPress={handleKey} />
      </div>

      <div className="mt-6 pb-6">
        <Button
          className="w-full"
          disabled={!(amountNumber > 0)}
          nativeButton={false}
          render={<Link href="/dart/profile/documents/proof-of-income/monthly-income/upload-hr-letter" />}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
