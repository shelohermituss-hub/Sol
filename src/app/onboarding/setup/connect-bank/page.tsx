"use client"

import * as React from "react"
import Link from "next/link"
import { Bank, Check } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton, CancelLink } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"

// Connexion du compte bancaire via Plaid (Étape 1/2 de "Completing account
// setup"). Cf. design-refs/Oportun_iOS_Completing_account_setup/
// Oportun iOS Completing account setup 1.png (avant) et 2.png (après).
// Icône Bank générique plutôt que le logo Bank of America (marque
// déposée, cf. ASSETS-A-REMPLACER.md). Pas de vraie intégration Plaid —
// "Connect bank" simule une connexion instantanée. Les liens verts du
// paragraphe légal n'ont pas d'écran cible construit, restent décoratifs.
export default function ConnectBankPage() {
  const [connected, setConnected] = React.useState(false)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/onboarding/upsell" />} trailing={<CancelLink href="/home" />} />

      <p className="mt-4 text-[15px] text-neutral-500">Step 1 of 2</p>
      <h1 className="mt-1 font-heading text-[28px] font-bold text-ink">
        {connected ? "Bank account connected" : "Connect bank account"}
      </h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        {connected
          ? "We'll automate money transfers from your personal bank account to save towards each goal."
          : "With Plaid, we'll automate money transfers from your personal bank account to save towards each goal."}
      </p>

      <div className="mt-4 border-t border-neutral-200" />

      {connected && (
        <div className="mt-4 flex items-center gap-4 rounded-card border border-neutral-200 p-5">
          <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-green">
            <Bank className="size-5 text-ink" />
            <span className="absolute -right-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full bg-brand-green text-paper">
              <Check className="size-2.5" weight="bold" />
            </span>
          </span>
          <div className="flex-1">
            <p className="font-heading text-[17px] font-bold text-ink">
              Bank of America <span className="inline-block h-4 w-16 rounded bg-neutral-200 align-middle" />
            </p>
            <p className="mt-1 text-[17px] text-ink">$7,741.33</p>
          </div>
          <p className="text-[17px] font-bold text-brand-green">Remove</p>
        </div>
      )}

      <p className="mt-4 text-[15px] text-neutral-500">
        You agree to provide Oportun, and its affiliates and bank partners, access to your bank account information
        through Plaid. This information will be used for this transaction; to inform our automated savings and
        budgeting decisions; to verify your income, debt and bank account for future applications and offers,
        modeling, account review and servicing; and as otherwise described in{" "}
        <span className="font-bold text-brand-green">Oportun&apos;s Privacy Policy</span>. Plaid will continue to
        access your account until you terminate with them. Review{" "}
        <span className="font-bold text-brand-green">Plaid&apos;s End User Privacy Policy</span> to see how it
        applies to you, and <span className="font-bold text-brand-green">click here</span> to learn how to terminate
        Plaid&apos;s access. Terminating Plaid&apos;s access may impact the availability of some Oportun products and
        services. Visit <span className="font-bold text-brand-green">Oportun&apos;s Privacy Policy</span> to learn
        more.
      </p>

      <div className="mt-auto pb-6">
        {connected ? (
          <Button className="w-full" render={<Link href="/onboarding/setup/agreements" />} nativeButton={false}>
            Next step
          </Button>
        ) : (
          <Button className="w-full" onClick={() => setConnected(true)}>
            Connect bank
          </Button>
        )}
      </div>
    </div>
  )
}
