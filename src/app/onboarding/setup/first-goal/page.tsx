"use client"

import Link from "next/link"

import { NavHeader, NavCloseButton } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { SavingsFlowerIcon } from "@/components/icons/savings-flower-icon"
import { GoalIcon } from "@/components/sections/goal-icon"
import { useGoals } from "@/lib/goals-context"

// Confirmation de création du premier but "Rainy Day" (fin du flux
// "Completing account setup"). Cf. design-refs/
// Oportun_iOS_Completing_account_setup/Oportun iOS Completing account
// setup 6.png. Le but "Rainy Day" existe déjà dans la graine partagée
// (useGoals) — pas de second ajout ici, cet écran est une confirmation
// visuelle, pas une mutation.
export default function SetupFirstGoalPage() {
  const { goals } = useGoals()
  const rainyDay = goals.find((g) => g.id === "rainy-day")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavCloseButton href="/set-and-save" />} />

      <span className="mt-6 flex size-20 items-center justify-center rounded-2xl bg-accent-peach">
        <SavingsFlowerIcon className="size-11" />
      </span>

      <h1 className="mt-6 font-heading text-[32px] font-bold text-ink">Congrats! We&apos;ve created your first goal</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        To get your feet wet, we&apos;ve set up your Rainy Day fund. Add as many goals as you want.
      </p>

      {rainyDay && (
        <div className="mt-6 flex items-center gap-4 rounded-card border border-neutral-200 p-5">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-neutral-200">
            <GoalIcon goal={rainyDay} className="size-6" />
          </span>
          <span className="flex-1 font-heading text-[17px] font-bold text-ink">{rainyDay.name}</span>
          <span className="font-heading text-[17px] font-bold text-ink">${rainyDay.amount.toFixed(2)}</span>
        </div>
      )}

      <div className="mt-auto flex gap-3 pb-6">
        <Button variant="secondary" className="h-14 flex-1" nativeButton={false} render={<Link href="/set-and-save" />}>
          Maybe later
        </Button>
        <Button className="h-14 flex-1" nativeButton={false} render={<Link href="/set-and-save/create" />}>
          Create goal
        </Button>
      </div>
    </div>
  )
}
