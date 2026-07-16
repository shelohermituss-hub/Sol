"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";

// Écran 1.7 — Choose a $Cashtag. Cf. design-refs/01-onboarding/13-cashtag-empty.png
export default function CashtagPage() {
  const router = useRouter();
  const [tag, setTag] = useState("");
  const isValid = tag.trim().length > 0;

  return (
    <OnboardingShell
      header={<Header onBack={() => router.back()} />}
      title="Choose a $Cashtag"
      subtitle="You will be able to change this later in settings"
      footer={
        <Button disabled={!isValid} onClick={() => router.push("/onboarding/pin")}>
          Next
        </Button>
      }
    >
      <div className="flex h-16 items-center gap-1 rounded-2xl border border-border-input bg-bg-card px-5">
        <span className="text-lg text-text-primary">$</span>
        <input
          placeholder="Cashtag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="h-full flex-1 text-lg text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
      </div>
    </OnboardingShell>
  );
}
