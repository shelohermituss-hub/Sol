"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { Switch } from "@/components/ui/switch"
import { NavHeader, NavBackButton } from "@/components/layout/nav-header"

// Formulaire de connexion (vide → rempli). Cf. design-refs/
// Oportun_iOS_Logging_in/Oportun iOS Logging in 1.png et 2.png. Le bouton
// "Log in" s'active dès que l'email/téléphone est renseigné (fidèle à la
// capture 2, où il est déjà noir alors que le mot de passe est vide).
// "Forgot password" n'a pas d'écran cible construit, reste décoratif.
export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [faceId, setFaceId] = React.useState(false)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/onboarding/welcome" />} />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">Log in</h1>

      <div className="mt-6 flex flex-col gap-4">
        <TextField label="Email or phone" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Switch checked={faceId} onCheckedChange={(checked) => setFaceId(checked)} />
        <span className="text-[17px] text-ink">Log in with Face ID</span>
      </div>

      <p className="mt-4 text-[17px] font-bold text-brand-green">Forgot password</p>

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          disabled={identifier.trim() === ""}
          onClick={() => router.push("/login/otp")}
        >
          Log in
        </Button>
      </div>
    </div>
  )
}
