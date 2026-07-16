"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { NavHeader, NavBackButton, CancelLink } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// Revue des accords (Étape 2/2). Cf. design-refs/
// Oportun_iOS_Completing_account_setup/Oportun iOS Completing account
// setup 3.png et 4.png. Liens verts sans écran cible construit, restent
// décoratifs.
export default function SetupAgreementsPage() {
  const router = useRouter()
  const [subscriptionAgreed, setSubscriptionAgreed] = React.useState(false)
  const [termsAgreed, setTermsAgreed] = React.useState(false)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/onboarding/setup/connect-bank" />}
        trailing={<CancelLink href="/home" />}
      />

      <p className="mt-4 text-[15px] text-neutral-500">Step 2 of 2</p>
      <h1 className="mt-1 font-heading text-[28px] font-bold text-ink">Please review our agreements</h1>

      <div className="mt-6 flex items-start gap-3 border-b border-neutral-200 pb-6">
        <Checkbox
          checked={subscriptionAgreed}
          onCheckedChange={(checked) => setSubscriptionAgreed(checked === true)}
          className="mt-0.5"
        />
        <p className="text-[15px] text-neutral-500">
          I agree to the <span className="font-bold text-brand-green">Subscription Fee Agreement</span> and
          acknowledge that my{" "}
          <span className="font-bold text-ink">
            Oportun subscription will automatically renew. I will be charged $5.99/mo or $47.88/yr, if the annual
            option is selected, on a recurring basis and that charges will continue until I cancel.
          </span>{" "}
          I can cancel any time by visiting the subscriptions page in the app or by contacting help@oportun.com.
        </p>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <Checkbox checked={termsAgreed} onCheckedChange={(checked) => setTermsAgreed(checked === true)} className="mt-0.5" />
        <p className="text-[15px] text-neutral-500">
          I have read and agree to the <span className="font-bold text-brand-green">Terms and Conditions – Set &amp; Save</span>;{" "}
          <span className="font-bold text-brand-green">Consent to Electronic Communications</span>; and I{" "}
          <span className="font-bold text-brand-green">authorize</span> recurring transfers.
        </p>
      </div>

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          disabled={!subscriptionAgreed || !termsAgreed}
          onClick={() => router.push("/onboarding/setup/transition")}
        >
          Set up savings
        </Button>
      </div>
    </div>
  )
}
