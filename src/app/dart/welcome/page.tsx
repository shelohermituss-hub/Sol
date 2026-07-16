"use client"

import Link from "next/link"
import { HandCoins } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"

// Écran de bienvenue. Cf. app-cible/Onboarding.png. Illustration "main +
// pièces" en attente de génération Higgsfield (cf. ASSETS-A-REMPLACER.md)
// — placeholder icône Phosphor en badge pêche (même famille que le badge
// Face ID de l'app 1) en attendant.
export default function DartWelcomePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <span className="mt-4 font-heading text-[24px] font-bold text-ink">Dart</span>

      <div className="mt-12 flex justify-center">
        <span className="flex size-40 items-center justify-center rounded-full bg-accent-peach">
          <HandCoins className="size-20 text-ink" weight="duotone" />
        </span>
      </div>

      <h1 className="mt-12 font-heading text-[28px] font-bold text-ink">Welcome to Dart</h1>
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
