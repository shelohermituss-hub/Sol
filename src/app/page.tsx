"use client"

import Image from "next/image"
import Link from "next/link"
import { UserCircle, ArrowRight, ArrowsClockwise, Plus, Bank, Gauge, PiggyBank } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { ListRow } from "@/components/ui/list-row"
import { Badge } from "@/components/ui/badge"
import { BottomTabBar } from "@/components/layout/bottom-tab-bar"
import { GoalIcon } from "@/components/sections/goal-icon"
import { GOALS, TOTAL_SAVED } from "@/lib/goals-data"

// Écran "Home" (onglet 1/2). Cf. design-refs/Oportun_iOS_Home/
// Onboarding/Invite friends/Profile & settings pas encore construits — le
// bouton "Get $5" et l'icône profil restent décoratifs pour l'instant.
export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex-1 px-6 pt-4">
        <div className="flex items-center justify-between">
          <UserCircle className="size-8 text-ink" />
          <Button size="default" className="h-9 px-4 text-[15px]">
            Get $5
          </Button>
        </div>

        <h1 className="mt-6 font-heading text-[32px] font-bold text-ink">Good afternoon!</h1>
        <p className="mt-2 text-[17px] text-neutral-500">
          You have <span className="font-bold text-ink">${TOTAL_SAVED.toFixed(2)}</span> in your accounts.
        </p>

        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[20px]">Set &amp; Save™</CardTitle>
            <Link
              href="/set-and-save"
              aria-label="View Set & Save"
              className="flex size-10 items-center justify-center rounded-full bg-neutral-200/60 text-ink"
            >
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <div className="flex gap-3">
            <Button size="default" className="h-11 flex-1 text-[15px]">
              Create goal
            </Button>
            <Button variant="secondary" size="default" className="h-11 flex-1 text-[15px]">
              Transfer money
            </Button>
          </div>

          <div className="divide-y divide-neutral-200">
            {GOALS.map((goal) => (
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

          {TOTAL_SAVED > 0 && (
            <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
              <span className="text-[15px] text-neutral-500">Total saved</span>
              <span className="font-heading text-[17px] font-bold text-ink">${TOTAL_SAVED.toFixed(2)}</span>
            </div>
          )}
        </Card>

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Connected account</h2>
        <div className="mt-2">
          <ListRow
            icon={<Bank className="size-6 text-ink" />}
            title="Bank of America"
            subtitle="Checking ••••"
            trailing="$7,741.33"
          />
        </div>

        <Card className="mt-8 items-start gap-4">
          <Image
            src="/images/illustrations/referral-bonus.svg"
            alt=""
            width={640}
            height={365}
            className="aspect-[16/9] w-full rounded-2xl bg-accent-mint object-cover"
          />
          <div>
            <h3 className="font-heading text-[20px] font-bold text-ink">Share Oportun &amp; score a $5 bonus</h3>
            <p className="mt-2 text-[15px] text-neutral-500">
              They&apos;ll get $5 and so will you. Refer 3 friends within a month for an extra $35. That&apos;s $50
              total.
            </p>
          </div>
          <Button className="w-full">Invite friends</Button>
        </Card>

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">More from Oportun</h2>
        <div className="divide-y divide-neutral-200">
          <ListRow
            iconVariant="square"
            icon={
              <span className="flex size-full items-center justify-center bg-[#B3DFBC]">
                <Gauge className="size-7 text-ink" weight="fill" />
              </span>
            }
            title="How long does it take to build credit?"
            subtitle="Steps to establish your first credit score"
            showChevron
          />
          <ListRow
            iconVariant="square"
            icon={
              <span className="flex size-full items-center justify-center bg-[#A6D2E5]">
                <PiggyBank className="size-7 text-ink" weight="fill" />
              </span>
            }
            title="How to build an emergency fund"
            subtitle="Help prepare for the unexpected"
            showChevron
          />
          <ListRow
            iconVariant="square"
            icon={
              <span className="flex size-full items-center justify-center bg-accent-peach font-heading text-2xl font-bold text-[#8C81FF]">
                ñ
              </span>
            }
            title="How to change your app to Spanish"
            subtitle="Two languages, one savvy app"
            showChevron
          />
        </div>

        <p className="mt-6 text-[13px] text-neutral-500">
          Oportun is not a bank. Your savings funds are FDIC insured, subject to applicable limitations and
          restrictions. <span className="font-medium text-brand-green">Click here</span> to learn more about FDIC
          coverage.
        </p>
        <p className="mt-4 pb-6 text-[13px] text-neutral-500">
          Personal loans in NM, and WI are originated by Oportun Inc. Personal loans all other states are originated
          by Pathward, N.A., except CO, CT, DC, IA, MA, ME, MD, NY, OH, WV and WY where loans are not available.
        </p>
      </div>

      <BottomTabBar active="/" />
    </div>
  )
}
