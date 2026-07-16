"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Écran de démarrage (splash). Cf. design-refs/Oportun_iOS_Onboarding/
// Oportun iOS Onboarding 0.png. Redirige automatiquement vers l'écran
// d'accueil après un court délai, comme un vrai splash screen.
export default function SplashPage() {
  const router = useRouter()

  React.useEffect(() => {
    const timeout = setTimeout(() => router.push("/onboarding/welcome"), 1200)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-paper">
      <Image src="/logos/oportun-wordmark.png" alt="Oportun" width={228} height={74} priority />
    </div>
  )
}
