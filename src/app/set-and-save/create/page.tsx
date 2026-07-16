"use client"

import Link from "next/link"
import { CaretRight } from "@phosphor-icons/react/ssr"

import { NavHeader, NavCloseButton } from "@/components/layout/nav-header"

// Choix du type de but. Cf. design-refs/Oportun_iOS_Creating_a_goal_home/
// Oportun iOS Creating a goal (home) 1.png. "Savings goal" mène directement
// au formulaire générique de détails ; "Smart bill" passe d'abord par le
// choix de catégorie de facture. "Learn about Smart bills" n'a pas d'écran
// cible construit, reste décoratif.
export default function CreateGoalTypePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavCloseButton href="/set-and-save" />} />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">What do you want to save for?</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        We&apos;ll automatically set aside money to help you reach your goals.
      </p>

      <Link
        href="/set-and-save/create/details"
        className="mt-6 flex items-center gap-4 rounded-card border border-neutral-200 p-5"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-peach font-heading text-xl font-bold text-[#D9A566]">
          $
        </span>
        <div className="flex-1">
          <p className="font-heading text-[17px] font-bold text-ink">Savings goal</p>
          <p className="mt-1 text-[15px] text-neutral-500">
            Save a little everyday. Great for a trip, a gift or an emergency fund. It all adds up.
          </p>
        </div>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </Link>

      <Link
        href="/set-and-save/create/category"
        className="mt-4 flex items-center gap-4 rounded-card border border-neutral-200 p-5"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-blue-tint text-ink">
          $
        </span>
        <div className="flex-1">
          <p className="flex items-center gap-2 font-heading text-[17px] font-bold text-ink">
            Smart bill
            <span className="rounded-full bg-brand-blue px-2.5 py-0.5 text-[13px] font-bold text-paper uppercase">
              New
            </span>
          </p>
          <p className="mt-1 text-[15px] text-neutral-500">
            Set a <span className="font-bold text-ink">repeating goal</span> that saves weekly &amp; sends your money
            back before the due date of your bill, rent or utilities.
          </p>
        </div>
        <CaretRight className="size-5 shrink-0 text-ink" />
      </Link>

      <p className="mt-4 text-[17px] font-bold text-brand-green">Learn about Smart bills</p>
    </div>
  )
}
