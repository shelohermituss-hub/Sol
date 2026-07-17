"use client"

import * as React from "react"
import Image from "next/image"

import { DartHeader } from "@/components/layout/dart-header"
import { DartTabBar } from "@/components/layout/dart-tab-bar"
import { SegmentedControl, SegmentedControlList, SegmentedControlTab } from "@/components/ui/segmented-control"
import { CircleCard } from "@/components/sections/circle-card"
import { useDart } from "@/lib/dart-context"
import { INVITED_CIRCLES } from "@/lib/dart-data"

// Onglet Circles. Cf. app-cible/Circles.png (vide) et
// Circles (Joined).png (rempli). État vide : illustration générée par
// Higgsfield (Recraft V4.1, vector) + carte bordée — cf.
// ASSETS-A-REMPLACER.md.
export default function DartCirclesPage() {
  const [tab, setTab] = React.useState<"active" | "finished">("active")
  const { joinedCircles } = useDart()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex-1 px-6 pt-4">
        <DartHeader />

        <SegmentedControl value={tab} onValueChange={(v) => setTab(v as "active" | "finished")} className="mt-6">
          <SegmentedControlList>
            <SegmentedControlTab value="active">Active</SegmentedControlTab>
            <SegmentedControlTab value="finished">Finished</SegmentedControlTab>
          </SegmentedControlList>
        </SegmentedControl>

        <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Your Circles</h2>

        {tab === "active" ? (
          joinedCircles.length > 0 ? (
            <div className="mt-3 flex flex-col gap-3">
              {joinedCircles.map((circle) => (
                <CircleCard key={circle.id} circle={circle} joinHref="#" />
              ))}
            </div>
          ) : (
            <div className="mt-3 flex flex-col items-center rounded-card border border-neutral-200 p-5 text-center">
              <Image src="/images/illustrations/dart-circles-empty.svg" alt="" width={320} height={320} className="w-28" />
              <p className="mt-3 text-[15px] text-neutral-500">Your active circles will appear here!</p>
            </div>
          )
        ) : (
          <div className="mt-3 rounded-card border border-neutral-200 p-5">
            <p className="text-[15px] text-neutral-500">Your finished circles will appear here!</p>
          </div>
        )}

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Invited to you</h2>
        <div className="mt-3 flex flex-col gap-3">
          {INVITED_CIRCLES.map((circle) => (
            <CircleCard key={circle.id} circle={circle} joinHref={`/dart/join/game-ya?amount=${circle.amount}`} />
          ))}
        </div>
      </div>

      <DartTabBar active="/dart/circles" />
    </div>
  )
}
