"use client"

import Link from "next/link"
import { Bell, CaretRight, ClockClockwise, HandCoins } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { formatCurrency } from "@/lib/currency"

// Choix du service à rejoindre. Cf. app-cible/Join-1.png. Suit la mise en
// page du choix de type de but de l'app 1 (/set-and-save/create) : cartes
// navigables icône + titre + description + chevron.
export default function DartJoinPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/home" />}
        title="Choose a Service"
        trailing={<Bell className="size-6 text-ink" />}
      />

      <h1 className="mt-6 font-heading text-[24px] font-bold text-ink">What would you like to do?</h1>

      <Link
        href="/dart/join/game-ya"
        className="mt-6 flex items-center gap-4 rounded-card border border-neutral-200 p-5"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-peach">
          <HandCoins className="size-6 text-ink" weight="fill" />
        </span>
        <div className="flex-1">
          <p className="font-heading text-[17px] font-bold text-ink">Join a Sòl</p>
          <p className="mt-1 text-[15px] text-neutral-500">
            Select your preferred slot and choose any payout amount to {formatCurrency(120000)} per Sòl.
          </p>
        </div>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </Link>

      <Link
        href="/dart/join/saving-program"
        className="mt-4 flex items-center gap-4 rounded-card border border-neutral-200 p-5"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-mint">
          <ClockClockwise className="size-6 text-ink" weight="fill" />
        </span>
        <div className="flex-1">
          <p className="font-heading text-[17px] font-bold text-ink">Join Saving Program</p>
          <p className="mt-1 text-[15px] text-neutral-500">
            Save in installments up to {formatCurrency(1000000)}, receive it at the end of the chosen duration with
            up 20% cashback.
          </p>
        </div>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </Link>
    </div>
  )
}
