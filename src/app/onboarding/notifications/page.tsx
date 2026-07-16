"use client"

import Image from "next/image"
import Link from "next/link"
import { Lock, WifiHigh, BatteryFull } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"

// Invite à activer les notifications. Cf. design-refs/
// Oportun_iOS_Onboarding/Oportun iOS Onboarding 12.png. Le mockup de
// téléphone (écran verrouillé + bannière de notification) est recréé en
// HTML/CSS, il n'existe pas d'asset source pour ce visuel composite.
export default function NotificationsPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-20">
      <h1 className="font-heading text-[32px] font-bold text-ink">Enable notifications</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        Stay on top of your finances with important updates about your progress and balances.
      </p>
      <p className="mt-4 text-[17px] text-neutral-500">Choose to receive your balance notifications Daily or Weekly.</p>

      <div className="relative mt-8 flex flex-1 items-start justify-center">
        <div className="w-full max-w-[280px] rounded-[36px] border-[6px] border-neutral-200 bg-paper pt-6 pb-10">
          <div className="flex items-center justify-between px-5 text-[13px] font-semibold text-ink">
            <span>Oportun</span>
            <span className="flex items-center gap-1">
              <WifiHigh className="size-3.5" weight="bold" />
              <BatteryFull className="size-4" weight="bold" />
            </span>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <Lock className="size-4 text-ink" weight="fill" />
            <span className="mt-3 font-heading text-[40px] font-medium text-ink">9:41</span>
          </div>

          <div className="mx-4 mt-8 rounded-2xl border border-neutral-200 bg-paper p-4 shadow-sm">
            <div className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200">
                <Image src="/logos/oportun-icon-mark.png" alt="" width={20} height={25} />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-[13px] font-bold text-ink">You hit your Electricity Bill goal! 🎉</p>
                <p className="mt-1 text-[13px] text-neutral-500">
                  Big win today, you saved your entire goal of $140.60!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex gap-3 pb-6">
        <Button variant="secondary" className="h-14 flex-1" nativeButton={false} render={<Link href="/onboarding/upsell" />}>
          Not now
        </Button>
        <Button className="h-14 flex-1" nativeButton={false} render={<Link href="/onboarding/upsell" />}>
          Enable
        </Button>
      </div>
    </div>
  )
}
