"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

// Écran 1.6 — What's your date of birth? Cf. design-refs/01-onboarding/11-dob-empty.png,
// 12-dob-filled.png
// Simplifié en un seul champ texte "MM/DD/YYYY" pour cette première passe
// (un input à 3 segments viendra si besoin de fidélité accrue).
export default function DobPage() {
  const router = useRouter();
  const [dob, setDob] = useState("");
  const isValid = dob.trim().length > 0;

  return (
    <OnboardingShell
      header={<Header onBack={() => router.back()} />}
      title="What's your date of birth?"
      subtitle="Incorrect date of birth will impact access to most features on Cash App."
      footer={
        <Button disabled={!isValid} onClick={() => router.push("/onboarding/cashtag")}>
          Next
        </Button>
      }
    >
      <TextInput placeholder="MM / DD / YYYY" value={dob} onChange={(e) => setDob(e.target.value)} />
    </OnboardingShell>
  );
}
