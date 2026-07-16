"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Check } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { NavHeader, NavBackButton, CancelLink } from "@/components/layout/nav-header"
import { cn } from "@/lib/utils"

// Création du mot de passe. Cf. design-refs/Oportun_iOS_Onboarding/
// Oportun iOS Onboarding 6.png et 7.png.
export default function PasswordPage() {
  const router = useRouter()
  const [password, setPassword] = React.useState("")
  const meetsLength = password.length >= 10

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/onboarding/personal-info" />} trailing={<CancelLink href="/onboarding/welcome" />} />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">Set your password</h1>

      <TextField
        className="mt-6"
        label="Password *"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {password.length > 0 && (
        <div className="mt-6">
          <p className="font-heading text-[17px] font-bold text-ink">Requirements:</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full",
                meetsLength ? "bg-brand-green text-paper" : "border border-neutral-200"
              )}
            >
              {meetsLength && <Check className="size-3" weight="bold" />}
            </span>
            <span className="text-[15px] text-neutral-500">Minimum of 10 characters</span>
          </div>
        </div>
      )}

      <div className="mt-auto pb-6">
        <Button className="w-full" disabled={!meetsLength} onClick={() => router.push("/onboarding/otp")}>
          Sign up
        </Button>
      </div>
    </div>
  )
}
