"use client"

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { SuccessBanner } from "@/components/ui/success-banner"

// Bandeau affiché sur Home juste après la création d'un but (?created=1),
// cf. design-refs/Oportun_iOS_Creating_a_goal_home/
// Oportun iOS Creating a goal (home) 11.png. Se referme seul après
// quelques secondes et nettoie l'URL. Isolé dans son propre composant +
// Suspense car useSearchParams() l'exige côté build statique.
function CreatedGoalBannerInner() {
  const router = useRouter()
  const params = useSearchParams()
  const created = params.get("created") === "1"

  React.useEffect(() => {
    if (!created) return
    const timeout = setTimeout(() => router.replace("/"), 4000)
    return () => clearTimeout(timeout)
  }, [created, router])

  if (!created) return null

  return <SuccessBanner className="mt-4">Your savings goal has been created!</SuccessBanner>
}

function CreatedGoalBanner() {
  return (
    <Suspense fallback={null}>
      <CreatedGoalBannerInner />
    </Suspense>
  )
}

export { CreatedGoalBanner }
