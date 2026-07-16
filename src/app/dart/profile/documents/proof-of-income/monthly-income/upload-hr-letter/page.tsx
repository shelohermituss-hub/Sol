"use client"

import { useRouter } from "next/navigation"
import { Camera, IdentificationCard } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Card, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Instructions de scan du document HR Letter. Cf. app-cible/Profile/
// My Documents/Proof of Income/Your Monthly Income/Upload HR Letter.png.
export default function UploadHrLetterPage() {
  const router = useRouter()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/profile/documents/proof-of-income/monthly-income" />}
        title="Upload HR Letter"
      />

      <div className="mt-8 flex justify-center">
        <IdentificationCard className="size-16 text-ink" weight="duotone" />
      </div>

      <h1 className="mt-6 font-heading text-[20px] font-bold text-ink">
        When scanning your ID, make sure that papers:
      </h1>
      <ul className="mt-3 list-disc pl-5 text-[15px] text-neutral-500">
        <li>Well-lit and clear to read.</li>
        <li>Inside the frame (not clipped)</li>
      </ul>

      <Card className="mt-6">
        <CardDescription>
          Request a recent HR Letter from your employer that details your monthly income. Make sure it has been{" "}
          <span className="font-bold text-ink">stamped and signed</span> within the last 3 months.
        </CardDescription>
      </Card>

      <div className="mt-auto pb-6">
        <Button className="w-full" onClick={() => router.push("/dart/profile/documents")}>
          <Camera className="size-5" />
          Scan Document
        </Button>
      </div>
    </div>
  )
}
