"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CircleNotch } from "@phosphor-icons/react/ssr"

import { OtpInput } from "@/components/ui/otp-input"

// Saisie du code OTP à la connexion (vide / en cours / soumission). Cf.
// design-refs/Oportun_iOS_Logging_in/Oportun iOS Logging in 3-5.png.
// Structure identique à l'OTP d'inscription (/onboarding/otp), redirige
// vers l'accueil connecté une fois validée.
export default function LoginOtpPage() {
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  function handleChange(value: string) {
    setCode(value)
    if (value.length === 6) setSubmitting(true)
  }

  React.useEffect(() => {
    if (!submitting) return
    const timeout = setTimeout(() => router.push("/home"), 1000)
    return () => clearTimeout(timeout)
  }, [submitting, router])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-20">
      <h1 className="font-heading text-[32px] font-bold text-ink">Enter code</h1>
      <p className="mt-4 text-[17px] text-neutral-500">
        Please enter your code within the next 5 minutes to avoid being logged out.
      </p>

      <p className="mt-6 text-[13px] text-neutral-500">Phone</p>
      <div className="mt-1 flex items-center gap-3">
        <span className="font-heading text-[20px] font-bold text-ink">
          (XXX) XXX-<span className="inline-block h-4 w-12 rounded bg-neutral-200 align-middle" />
        </span>
        <Link href="/login" className="text-[17px] font-bold text-brand-green">
          Change
        </Link>
      </div>

      <div className="mt-6">
        <OtpInput value={code} onChange={handleChange} disabled={submitting} />
      </div>

      <div className="mt-6 border-t border-neutral-200 pt-6">
        <p className="text-[17px] text-neutral-500">
          Didn&apos;t receive your code? <span className="font-bold text-brand-green">Resend</span>
        </p>
        <p className="mt-4 text-[17px] font-bold text-brand-green">Request a voice call</p>
      </div>

      <div className="mt-auto pb-6">
        <button
          type="button"
          disabled
          className="flex h-14 w-full items-center justify-center rounded-full bg-neutral-200 font-heading text-[17px] font-semibold text-paper"
        >
          {submitting ? <CircleNotch className="size-5 animate-spin" /> : "Submit"}
        </button>
      </div>
    </div>
  )
}
