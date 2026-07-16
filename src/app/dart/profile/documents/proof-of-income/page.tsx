"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RocketLaunch } from "@phosphor-icons/react/ssr"

const OPTIONS = [
  { id: "hr-letter", label: "HR Letter", description: "Upload a recently signed & stamped HR letter." },
  { id: "bank-statement", label: "Bank Statement", description: "Upload a recent Bank Statement from your bank reflecting the last 3 months transactions." },
]

// Choix du type de justificatif de revenu. Cf. app-cible/Profile/
// My Documents/Proof of Income.png.
export default function ProofOfIncomePage() {
  const router = useRouter()
  const [choice, setChoice] = React.useState("hr-letter")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/profile/documents" />} title="Proof of Income" />

      <RadioGroup value={choice} onValueChange={(v) => setChoice(v as string)} className="mt-6 gap-3">
        {OPTIONS.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-4 rounded-card border border-neutral-200 p-4 has-data-checked:border-ink"
          >
            <FileText className="size-6 shrink-0 text-ink" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-ink">{option.label}</p>
              <p className="mt-1 text-[13px] text-neutral-500">{option.description}</p>
            </div>
            <RadioGroupItem value={option.id} />
          </label>
        ))}
      </RadioGroup>

      <Card className="mt-6 flex-row items-center gap-4">
        <CardDescription className="flex-1">
          Upload more <span className="font-bold text-ink">Proof of Income</span> documents and increase your
          credit limit. More documents, Bigger payouts!
        </CardDescription>
        <RocketLaunch className="size-10 shrink-0 text-ink" weight="duotone" />
      </Card>

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          onClick={() =>
            router.push(
              choice === "hr-letter"
                ? "/dart/profile/documents/proof-of-income/monthly-income"
                : "/dart/profile/documents"
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}
