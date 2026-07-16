"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Envelope } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"

// Saisie identifiant (email OU téléphone dans un champ unique — écart vs
// app 1 qui sépare les deux). Cf. app-cible/Signin/Signup.png. Liens
// légaux sans écran cible construit, restent décoratifs.
export default function DartSignupPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = React.useState("")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <div className="mt-4 flex justify-center">
        <span className="font-heading text-[28px] font-bold text-ink">Dart</span>
      </div>

      <h1 className="mt-6 text-center font-heading text-[22px] font-bold text-ink">Welcome</h1>
      <p className="mt-2 text-center text-[15px] text-neutral-500">
        Please enter your email/phone or connect to your social accounts to continue.
      </p>

      <TextField
        className="mt-8"
        label="Email/Phone"
        trailingAction={<Envelope className="size-5 text-neutral-500" />}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <Button
        className="mt-6 w-full"
        disabled={identifier.trim() === ""}
        onClick={() => router.push("/dart/signup/verify-otp")}
      >
        Continue
      </Button>

      <p className="mt-auto pb-6 text-center text-[13px] text-neutral-500">
        By clicking Continue, you agree to Dart{" "}
        <span className="font-medium text-brand-green">Terms of Use</span> and{" "}
        <span className="font-medium text-brand-green">Privacy Policy</span>.
      </p>
    </div>
  )
}
