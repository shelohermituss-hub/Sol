"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

// Écran de bienvenue / proposition de valeur. Cf. design-refs/
// Oportun_iOS_Onboarding/Oportun iOS Onboarding 1.png (identique à
// design-refs/Oportun_iOS_Logging_in/Oportun iOS Logging in 0.png).
export default function WelcomePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <Image
        src="/images/illustrations/hero-reach-your-goals.svg"
        alt=""
        width={640}
        height={640}
        className="mt-2 w-full"
        priority
      />

      <h1 className="mt-4 font-heading text-[36px] leading-[1.05] font-bold text-ink">
        Reach for your goals effortlessly
      </h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        Whatever you&apos;re after, we help make it happen. Save without thinking about it, and manage your Oportun
        loan, all with one easy-to-use app.
      </p>

      <div className="mt-auto flex gap-3 pb-6">
        <Button variant="secondary" className="h-14 flex-1" nativeButton={false} render={<Link href="/login" />}>
          Log in
        </Button>
        <Button className="h-14 flex-1" nativeButton={false} render={<Link href="/onboarding/phone" />}>
          Sign up
        </Button>
      </div>
    </div>
  )
}
