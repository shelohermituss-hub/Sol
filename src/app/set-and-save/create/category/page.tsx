"use client"

import Link from "next/link"

import { NavHeader, NavBackButton, CancelLink } from "@/components/layout/nav-header"
import { ListRow } from "@/components/ui/list-row"
import { GoalIcon } from "@/components/sections/goal-icon"
import { GOAL_CATEGORIES, UNIQUE_GOAL_CATEGORY } from "@/lib/goal-categories"

// Choix de la catégorie de facture (flux "Smart bill"). Cf. design-refs/
// Oportun_iOS_Creating_a_goal_home/Oportun iOS Creating a goal (home) 2.png.
export default function CreateGoalCategoryPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/set-and-save/create" />}
        trailing={<CancelLink href="/set-and-save" />}
      />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">Which bill do you want to save for?</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        Choose from popular bill goals or create your own unique goal.
      </p>

      <div className="mt-6 divide-y divide-neutral-200">
        {GOAL_CATEGORIES.map((category) => (
          <ListRow
            key={category.id}
            icon={<GoalIcon goal={category} className="size-6" />}
            title={category.name}
            showChevron
            render={
              <Link
                href={`/set-and-save/create/details?name=${encodeURIComponent(category.name)}&icon=${category.icon}&color=${encodeURIComponent(category.iconColor)}`}
              />
            }
          />
        ))}
        <ListRow
          icon={<GoalIcon goal={UNIQUE_GOAL_CATEGORY} className="size-6" />}
          title={UNIQUE_GOAL_CATEGORY.name}
          showChevron
          render={<Link href="/set-and-save/create/details" />}
        />
      </div>
    </div>
  )
}
