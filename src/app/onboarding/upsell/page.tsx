"use client"

import Link from "next/link"
import { Sparkle, CalendarBlank, DeviceMobile } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { NavHeader, NavCloseButton } from "@/components/layout/nav-header"
import { SavingsFlowerIcon } from "@/components/icons/savings-flower-icon"

const FEATURES = [
  {
    icon: Sparkle,
    title: "Automatic, effortless savings",
    body: "We'll save smart amounts for you - no need to do a thing.",
  },
  {
    icon: CalendarBlank,
    title: "Start saving as soon as tomorrow!",
    body: "Link a bank account, and we'll start transferring to Set & Save™ the next day.",
  },
  {
    icon: DeviceMobile,
    title: "Try free for 30 days",
    body: "Once your trial expires, it's $5.99/mo (or $3.99/mo billed annually) after. You can cancel anytime.",
  },
] as const

// Écran de fin d'onboarding : upsell Set & Save. Cf. design-refs/
// Oportun_iOS_Onboarding/Oportun iOS Onboarding 13.png (= même écran que
// design-refs/Oportun_iOS_Completing_account_setup/.../0.png). "Get
// started" enchaîne sur la connexion bancaire (flux "Completing account
// setup") ; la croix de fermeture saute directement à l'accueil.
export default function OnboardingUpsellPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavCloseButton href="/home" />} />

      <span className="mt-6 flex size-20 items-center justify-center rounded-2xl bg-accent-peach">
        <SavingsFlowerIcon className="size-11" />
      </span>

      <h1 className="mt-6 font-heading text-[32px] font-bold text-ink">Savvier savings start here</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        Meet your savings goals by automatically moving money in the background. You may not feel it, but every
        little bit adds up fast.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-mint">
              <Icon className="size-5 text-ink" />
            </span>
            <div>
              <p className="font-heading text-[17px] font-bold text-ink">{title}</p>
              <p className="mt-1 text-[15px] text-neutral-500">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pb-6">
        <Button className="w-full" nativeButton={false} render={<Link href="/onboarding/setup/connect-bank" />}>
          Get started
        </Button>
      </div>
    </div>
  )
}
