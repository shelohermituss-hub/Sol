"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { OtpInput } from "@/components/ui/otp-input"
import { NumericKeypad } from "@/components/ui/numeric-keypad"
import { Checkbox } from "@/components/ui/checkbox"

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

// Vérification OTP (4 chiffres, app 1 en utilise 6 — OtpInput accepte déjà
// un `length` variable). Cf. app-cible/Signin/Signup/Verify OTP.png.
export default function DartVerifyOtpPage() {
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(true)
  const [countdown, setCountdown] = React.useState(159)

  React.useEffect(() => {
    if (countdown <= 0) return
    const timeout = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timeout)
  }, [countdown])

  function handleKey(key: string) {
    if (key === "backspace") {
      setCode((prev) => prev.slice(0, -1))
      return
    }
    if (code.length >= 4) return
    const next = code + key
    setCode(next)
    if (next.length === 4) {
      const timeout = setTimeout(() => router.push("/dart/home"), 600)
      return () => clearTimeout(timeout)
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <h1 className="mt-6 text-center font-heading text-[22px] font-bold text-ink">Verify OTP</h1>
      <p className="mt-2 text-center text-[15px] text-neutral-500">
        We send you OTP to your email please enter 4 digit code to verify.
      </p>

      <div className="mt-8 flex justify-center">
        <OtpInput length={4} value={code} onChange={setCode} />
      </div>

      <p className="mt-4 text-center text-[13px] text-neutral-500">
        {"Didn't Received Code? "}
        {countdown > 0 ? (
          <span className="text-ink">{formatCountdown(countdown)}</span>
        ) : (
          <button type="button" onClick={() => setCountdown(159)} className="font-bold text-brand-green">
            Resend
          </button>
        )}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Checkbox checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)} />
        <span className="text-[15px] text-ink">Remember Me</span>
      </div>

      <div className="mt-auto">
        <NumericKeypad onPress={handleKey} />
      </div>
    </div>
  )
}
