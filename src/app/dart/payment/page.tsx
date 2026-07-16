"use client"

import Link from "next/link"
import { CheckSquare, Gear, Question, ReceiptX, Wallet } from "@phosphor-icons/react/ssr"

import { DartHeader } from "@/components/layout/dart-header"
import { DartTabBar } from "@/components/layout/dart-tab-bar"
import { Button } from "@/components/ui/button"

const OTHERS = [
  { label: "Payout Eligibility", href: "/dart/payment/eligibility", icon: CheckSquare },
  { label: "Payment Settings", href: "/dart/payment/settings", icon: Gear },
  { label: "Payment History", href: "/dart/payment/history", icon: ReceiptX },
  { label: "Payment Policy", href: undefined, icon: ReceiptX },
  { label: "Help", href: undefined, icon: Question },
] as const

// Onglet Payment (hub). Cf. app-cible/Payment.png. État vide toujours
// affiché dans cette reproduction (état canonique de la capture) —
// illustration en attente de génération Higgsfield, placeholder icône en
// attendant. "Payment Policy" et "Help" référencés mais aucun écran
// fourni, restent décoratifs.
export default function DartPaymentPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex-1 px-6 pt-4">
        <DartHeader />

        <div className="mt-10 flex flex-col items-center text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-neutral-200/50">
            <Wallet className="size-10 text-ink" />
          </span>
          <p className="mt-4 font-heading text-[17px] font-bold text-ink">You don&apos;t have any payment due yet</p>
          <p className="mt-1 text-[15px] text-neutral-500">
            Your due payment and your balance will appear here after you join a circle.
          </p>
          <Button className="mt-4" nativeButton={false} render={<Link href="/dart/join" />}>
            Join New Circle
          </Button>
        </div>

        <h2 className="mt-10 font-heading text-[20px] font-bold text-ink">Others</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {OTHERS.map(({ label, href, icon: Icon }) =>
            href ? (
              <Link key={label} href={href} className="flex flex-col gap-3 rounded-card border border-neutral-200 p-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-neutral-200/50">
                  <Icon className="size-5 text-ink" />
                </span>
                <span className="text-[15px] font-bold text-ink">{label}</span>
              </Link>
            ) : (
              <div key={label} className="flex flex-col gap-3 rounded-card border border-neutral-200 p-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-neutral-200/50">
                  <Icon className="size-5 text-ink" />
                </span>
                <span className="text-[15px] font-bold text-ink">{label}</span>
              </div>
            )
          )}
        </div>
      </div>

      <DartTabBar active="/dart/payment" />
    </div>
  )
}
