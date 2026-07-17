"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

// Écran de bienvenue. Cf. app-cible/Onboarding.png. Illustration "main +
// pièces" générée par Higgsfield (Recraft V4.1, vector), même palette que
// hero-reach-your-goals.svg — cf. ASSETS-A-REMPLACER.md.
export default function DartWelcomePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <span className="mt-4 font-heading text-[24px] font-bold text-ink">Sòlid</span>

      <Image
        src="/images/illustrations/dart-welcome-hero.svg"
        alt=""
        width={480}
        height={480}
        className="mx-auto mt-8 w-2/3"
        priority
      />

      <h1 className="mt-8 font-heading text-[28px] font-bold text-ink">Welcome to Sòlid</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        Explore everything you require for your financial progress and your adventure - browse, learn, network, all
        in one place.
      </p>

      <div className="mt-auto pb-6">
        <Button className="w-full" nativeButton={false} render={<Link href="/dart/signup" />}>
          Continue
        </Button>
      </div>
    </div>
  )
}
