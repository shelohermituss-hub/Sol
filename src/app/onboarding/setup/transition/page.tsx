"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { NavHeader, NavCloseButton } from "@/components/layout/nav-header"

// Écran de transition pédagogique, auto-avance après un court délai (même
// pattern que le splash /onboarding). Cf. design-refs/
// Oportun_iOS_Completing_account_setup/Oportun iOS Completing account
// setup 5.png. Illustration déjà générée (educational-transition.svg, cf.
// ASSETS-A-REMPLACER.md).
export default function SetupTransitionPage() {
  const router = useRouter()

  React.useEffect(() => {
    const timeout = setTimeout(() => router.push("/onboarding/setup/first-goal"), 1800)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavCloseButton href="/home" />} />

      <div className="mt-16">
        <svg viewBox="0 0 44 44" className="size-11 -rotate-90">
          <circle cx="22" cy="22" r="19" fill="none" stroke="var(--color-neutral-200)" strokeWidth="3" />
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="var(--color-brand-green)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 19 * 0.22} ${2 * Math.PI * 19}`}
          />
        </svg>
      </div>

      <p className="mt-6 text-[17px] text-neutral-500">We&apos;re here to:</p>
      <h1 className="mt-2 font-heading text-[28px] font-bold text-ink">
        Automatically set aside money for your goals so you don&apos;t have to think about it.
      </h1>

      <Image
        src="/images/illustrations/educational-transition.svg"
        alt=""
        width={1344}
        height={768}
        className="mt-auto mb-6 w-full rounded-2xl"
      />
    </div>
  )
}
