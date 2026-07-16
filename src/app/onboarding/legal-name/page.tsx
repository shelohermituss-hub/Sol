"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

// Écran 1.5 — What's your legal name? Cf. design-refs/01-onboarding/09-legal-name-empty.png,
// 10-legal-name-filled.png
export default function LegalNamePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isValid = firstName && lastName;

  return (
    <OnboardingShell
      header={<Header onBack={() => router.back()} />}
      title="What's your legal name?"
      subtitle="This should match the name on your government ID."
      footer={
        <Button disabled={!isValid} onClick={() => router.push("/onboarding/dob")}>
          Next
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <TextInput
          placeholder="Legal first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInput placeholder="Legal last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <p className="text-sm text-text-secondary">
          You can edit how this shows on your public profile if you go by another name.
        </p>
      </div>
    </OnboardingShell>
  );
}
