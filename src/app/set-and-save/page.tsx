"use client"

import Image from "next/image"
import Link from "next/link"
import { UserCircle, Gear, ArrowRight, ArrowsClockwise, Plus, ShieldCheck } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { ListRow } from "@/components/ui/list-row"
import { Badge } from "@/components/ui/badge"
import { BottomTabBar } from "@/components/layout/bottom-tab-bar"
import { GoalIcon } from "@/components/sections/goal-icon"
import { useGoals } from "@/lib/goals-context"

// Écran "Set & Save" (onglet 2/2). Cf. design-refs/Oportun_iOS_Set__save/,
// Oportun_iOS_Home/Oportun iOS Home 0.png
export default function SetAndSavePage() {
  const { goals, totalSaved } = useGoals()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex-1 px-6 pt-4">
        <div className="flex items-center justify-between">
          <Link href="/profile" aria-label="Profile & settings" className="text-ink">
            <UserCircle className="size-8" />
          </Link>
          <Link href="/profile" aria-label="Settings" className="text-ink">
            <Gear className="size-6" />
          </Link>
        </div>

        <h1 className="mt-6 font-heading text-[32px] font-bold text-ink">Set &amp; Save™</h1>
        <p className="mt-4 text-[15px] text-neutral-500">Total savings</p>
        <p className="font-heading text-[32px] font-bold text-ink">${totalSaved.toFixed(2)}</p>

        <div className="mt-6 flex gap-3">
          <Button
            variant="secondary"
            size="default"
            className="h-14 flex-1"
            nativeButton={false}
            render={<Link href="/transfer" />}
          >
            Transfer money
          </Button>
          <Button size="default" className="h-14 flex-1" nativeButton={false} render={<Link href="/set-and-save/create" />}>
            Create goal
          </Button>
        </div>

        <div className="mt-6 rounded-card border border-neutral-200 p-5">
          <p className="font-heading text-[17px] font-bold text-ink">No auto saves initiated today.</p>
          <p className="mt-1 text-[15px] text-neutral-500">We&apos;ll let you know when we initiate your next auto save.</p>
        </div>

        <div className="mt-6 flex items-center gap-4 rounded-card border border-neutral-200 p-5">
          <Image
            src="/images/illustrations/referral-bonus.svg"
            alt=""
            width={80}
            height={80}
            className="size-20 shrink-0 rounded-2xl bg-accent-peach object-cover"
          />
          <div className="flex-1">
            <p className="font-heading text-[17px] font-bold text-ink">Enjoying Oportun? Get $5</p>
            <p className="mt-1 text-[15px] text-neutral-500">
              Refer friends and family to Oportun and you&apos;ll both get $5. Win, win.
            </p>
          </div>
          <Link
            href="/invite-friends"
            aria-label="Refer friends"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-200/60 text-ink"
          >
            <ArrowRight className="size-5" />
          </Link>
        </div>

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Your goals</h2>
        <p className="mt-1 text-[15px] text-neutral-500">Goals are funded based on their deadline.</p>

        <div className="divide-y divide-neutral-200">
          {goals.map((goal) => (
            <ListRow
              key={goal.id}
              icon={<GoalIcon goal={goal} className="size-6" />}
              title={goal.name}
              subtitle={
                goal.dueDate ? (
                  <span className="inline-flex items-center gap-1">
                    {goal.dueDate}
                    {goal.recurring && <ArrowsClockwise className="size-3.5" />}
                  </span>
                ) : undefined
              }
              trailing={goal.isNew ? <Badge>NEW</Badge> : `$${goal.amount.toFixed(2)}`}
              render={<Link href={`/set-and-save/${goal.id}`} />}
            />
          ))}
          <ListRow
            icon={
              <span className="flex size-full items-center justify-center rounded-full border border-dashed border-neutral-200">
                <Plus className="size-5 text-ink" />
              </span>
            }
            title="Create goal"
            showChevron
            render={<Link href="/set-and-save/create" />}
          />
        </div>

        <div className="mt-6 rounded-card border border-neutral-200 px-5">
          <ListRow
            icon={<ShieldCheck className="size-6 text-ink" />}
            title="Low balance protection"
            trailing={
              <span className="rounded-full bg-brand-green px-3 py-1 text-[15px] font-bold text-paper">On</span>
            }
            showChevron
            render={<Link href="/set-and-save/low-balance-protection" />}
          />
        </div>
      </div>

      <BottomTabBar active="/set-and-save" />
    </div>
  )
}
