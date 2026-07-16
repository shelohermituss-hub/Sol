"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { NavHeader } from "@/components/layout/nav-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "@phosphor-icons/react/ssr"
import { useProfile } from "@/lib/profile-context"

// Changement d'email : formulaire puis écran "Verify your email" (états
// locaux, pas des routes séparées — un seul écran "Change email" apparaît
// dans la barre de titre des captures, son contenu change). Cf.
// design-refs/Oportun_iOS_Changing_an_email_/
// Oportun iOS Changing an email  1-3.png. Pas de bouton pour continuer
// depuis "Verify your email" dans les captures (l'utilisateur cliquerait le
// lien reçu par email dans la vraie app) — auto-avance après un délai, même
// pattern que le splash /onboarding. "Resend" n'a pas de comportement
// démontré, reste décoratif.
export default function ChangeEmailPage() {
  const router = useRouter()
  const { email, setEmail } = useProfile()

  const [step, setStep] = React.useState<"form" | "verify">("form")
  const [draftEmail, setDraftEmail] = React.useState(email)

  React.useEffect(() => {
    if (step !== "verify") return
    const timeout = setTimeout(() => {
      setEmail(draftEmail)
      router.push("/profile/contact-info?updated=1")
    }, 2000)
    return () => clearTimeout(timeout)
  }, [step, draftEmail, setEmail, router])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={
          <button
            type="button"
            onClick={() => (step === "verify" ? setStep("form") : router.push("/profile/contact-info"))}
            aria-label="Back"
            className="text-ink"
          >
            <ArrowLeft className="size-6" />
          </button>
        }
        title={step === "verify" ? "Verify email" : undefined}
      />

      {step === "form" ? (
        <>
          <h1 className="mt-4 font-heading text-[28px] font-bold text-ink">Change email</h1>
          <Input
            className="mt-6"
            type="email"
            placeholder="Email address"
            value={draftEmail}
            onChange={(e) => setDraftEmail(e.target.value)}
          />
          <div className="mt-auto pb-6">
            <Button className="w-full" onClick={() => draftEmail.trim() !== "" && setStep("verify")}>
              Verify
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-4 font-heading text-[28px] font-bold text-ink">Verify your email address</h1>
          <p className="mt-4 text-[17px] text-neutral-500">
            This helps us keep your account secure. We just sent a verification link to:
          </p>
          <p className="mt-4 text-[17px] text-ink">{draftEmail}</p>
          <div className="mt-4 border-t border-neutral-200" />
          <Button variant="secondary" className="mt-6 w-full">
            Resend
          </Button>
          <p className="mt-6 text-[15px] text-neutral-500">
            This email expires after 1 hour. If you haven&apos;t gotten an email, please check your spam folder.
          </p>
        </>
      )}
    </div>
  )
}
