"use client"

import { useRouter } from "next/navigation"
import { Camera, IdentificationCard } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Card, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Instructions de scan de la pièce d'identité. Cf. app-cible/Profile/
// My Documents/Scan National ID.png. Vignettes "Don't" simplifiées en
// texte (illustrations d'exemple non reproduites, pas d'équivalent
// composant existant justifiant un nouveau composant pour 2 usages).
// "Central Bank" → BRH (Banque de la République d'Haïti), marqué
// [A VALIDER] cf. CLAUDE.md, "Réglementaire" — l'exigence réelle reste à
// confirmer avant mise en production.
export default function ScanNationalIdPage() {
  const router = useRouter()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/profile/documents" />} title="Scan CIN" />

      <div className="mt-8 flex justify-center">
        <IdentificationCard className="size-16 text-ink" weight="duotone" />
      </div>

      <h1 className="mt-6 font-heading text-[20px] font-bold text-ink">
        When scanning your ID, make sure that both sides of your CIN:
      </h1>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-card border border-ink/20 p-4 text-center">
          <p className="text-[13px] font-bold text-ink">Don&apos;t</p>
          <p className="mt-2 text-[13px] text-neutral-500">Blurry or angled photo</p>
        </div>
        <div className="rounded-card border border-ink/20 p-4 text-center">
          <p className="text-[13px] font-bold text-ink">Don&apos;t</p>
          <p className="mt-2 text-[13px] text-neutral-500">Cropped or partial ID</p>
        </div>
      </div>

      <Card className="mt-6">
        <CardDescription>
          As required by the BRH [A VALIDER], users must upload their valid CIN before joining a Sòl to guarantee
          everyone&apos;s rights.
        </CardDescription>
      </Card>

      <div className="mt-auto pb-6">
        <Button className="w-full" onClick={() => router.push("/dart/profile/documents")}>
          <Camera className="size-5" />
          Scan CIN
        </Button>
      </div>
    </div>
  )
}
