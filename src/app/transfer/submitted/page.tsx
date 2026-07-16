"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PaperPlaneTilt } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"

// Confirmation du transfert. Cf. design-refs/Oportun_iOS_Transferring_money/
// Oportun iOS Transferring money 6.png. Icône approximée en Phosphor
// PaperPlaneTilt (pas d'équivalent exact au pictogramme vert de la
// capture).
function TransferSubmittedContent() {
  const params = useSearchParams()
  const amount = Number(params.get("amount") ?? "0")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-16">
      <span className="flex size-20 items-center justify-center rounded-full border border-brand-green">
        <PaperPlaneTilt className="size-8 text-brand-green" />
      </span>

      <h1 className="mt-6 font-heading text-[28px] font-bold text-ink">Transfer submitted!</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        We will initiate a transfer for ${amount.toFixed(2)} shortly. Please note, it may take 3-5 business days for
        the transfer to complete and for the money to be available in your account.
      </p>

      <div className="mt-auto pb-6">
        <Button className="w-full" nativeButton={false} render={<Link href="/home" />}>
          Done
        </Button>
      </div>
    </div>
  )
}

export default function TransferSubmittedPage() {
  return (
    <Suspense fallback={null}>
      <TransferSubmittedContent />
    </Suspense>
  )
}
