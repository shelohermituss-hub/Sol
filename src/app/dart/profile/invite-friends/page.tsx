"use client"

import * as React from "react"
import { Copy, Envelope, Gift, Percent } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

const STEPS = [
  { icon: Envelope, title: "Invite your friends", description: "Share your referral link and code to your friends who still haven't download app." },
  { icon: Gift, title: "Gift them a discount", description: "Once they sign up with the promocode and join their first Game'ya through the invitation link, they will enjoy 150 MAD OFF their first pay-in." },
  { icon: Percent, title: "Enjoy your own discount!", description: "On settling their first pay-in, you'll get 150 MAD OFF your next pay-in." },
]

// Parrainage. Cf. app-cible/Profile/Invite Friends.png et
// Invite Friends/Track Invitiations.png (sheet).
export default function InviteFriendsPage() {
  const [trackOpen, setTrackOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/profile" />} title="Refer a friend" />

      <h1 className="mt-4 font-heading text-[24px] font-bold text-ink">Spread the word &amp; Get 150 MAD OFF!</h1>
      <button type="button" onClick={() => setTrackOpen(true)} className="mt-2 text-left font-bold text-brand-green">
        Track your invitations →
      </button>

      <div className="mt-6 flex flex-col gap-5">
        {STEPS.map(({ icon: Icon, title, description }, i) => (
          <div key={title} className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-mint">
              <Icon className="size-5 text-ink" weight="fill" />
            </span>
            <div>
              <p className="font-heading text-[17px] font-bold text-ink">
                {i + 1}. {title}
              </p>
              <p className="mt-1 text-[15px] text-neutral-500">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pb-6">
        <button
          type="button"
          onClick={() => setCopied(true)}
          className="mx-auto mb-4 flex items-center gap-2 font-bold text-brand-green"
        >
          {copied ? "Copied!" : "Copy code: pogvhsuh"} <Copy className="size-4" />
        </button>
        <Button className="w-full">Share your invite</Button>
      </div>

      <Sheet open={trackOpen} onOpenChange={setTrackOpen}>
        <SheetContent>
          <SheetTitle>My Referrals</SheetTitle>
          <p className="text-[15px] text-neutral-500">
            For every friend who joins through your invitation, you get 150 MAD OFF your next pay-in.
          </p>

          <div className="flex items-center justify-between rounded-card border border-neutral-200 p-4">
            <div>
              <p className="text-[11px] text-neutral-500 uppercase">Earned</p>
              <p className="mt-1 font-heading text-[17px] font-bold text-ink">0 MAD</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase">Redeemed</p>
              <p className="mt-1 font-heading text-[17px] font-bold text-ink">0 MAD</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-500 uppercase">Balance</p>
              <p className="mt-1 font-heading text-[17px] font-bold text-brand-green">0 MAD</p>
            </div>
          </div>

          <p className="text-[13px] text-neutral-500">
            Referral discount will be automatically deducted from your next pay-in.
          </p>

          <h2 className="font-heading text-[17px] font-bold text-ink">Invitees</h2>
          <div className="rounded-card border border-neutral-200 p-6 text-center">
            <p className="text-[15px] font-bold text-ink">Invites friends</p>
            <p className="mt-1 text-[13px] text-neutral-500">
              You haven&apos;t invited any friends or your friends haven&apos;t signed up yet.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
