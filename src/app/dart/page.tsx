"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

// Splash Dart. Cf. app-cible/Splash 1.png et 2.png. Wordmark recomposé
// dans la typographie app 1 (font-heading, encre noire) — jamais le script
// cursif bleu de l'app 2. Même pattern d'auto-avance que le splash
// Oportun (/onboarding).
export default function DartSplashPage() {
  const router = useRouter()

  React.useEffect(() => {
    const timeout = setTimeout(() => router.push("/dart/welcome"), 1200)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-paper">
      <span className="font-heading text-[40px] font-bold text-ink">Sòlid</span>
    </div>
  )
}
