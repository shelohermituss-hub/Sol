"use client"

import Link from "next/link"
import { ScanSmiley } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"

// Invite à activer Face ID. Cf. design-refs/Oportun_iOS_Onboarding/
// Oportun iOS Onboarding 11.png. "Not now" et "Enable" mènent tous deux à
// l'étape suivante (aucune permission système réelle en jeu ici).
export default function FaceIdPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-20">
      <span className="flex size-20 items-center justify-center rounded-2xl bg-accent-peach">
        <ScanSmiley className="size-10" style={{ color: "#96C8DE" }} weight="duotone" />
      </span>

      <h1 className="mt-6 font-heading text-[32px] font-bold text-ink">Enable Face ID</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        With Face ID, you won&apos;t need to enter your password every time. This helps make the app more secure and
        login easier.
      </p>

      <div className="mt-auto flex gap-3 pb-6">
        <Button variant="secondary" className="h-14 flex-1" nativeButton={false} render={<Link href="/onboarding/notifications" />}>
          Not now
        </Button>
        <Button className="h-14 flex-1" nativeButton={false} render={<Link href="/onboarding/notifications" />}>
          Enable
        </Button>
      </div>
    </div>
  )
}
