"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

// Écran 1.3 — Confirmation code. Cf. design-refs/01-onboarding/04-otp-code-empty.png,
// 05-otp-code-filled.png
function OtpForm() {
  const router = useRouter();
  const contact = useSearchParams().get("contact") ?? "your phone or email";
  const [code, setCode] = useState("");
  const isValid = code.trim().length > 0;

  return (
    <OnboardingShell
      header={<Header onBack={() => router.back()} onHelp={() => {}} />}
      title={`Please enter the code sent to ${contact}`}
      footer={
        <Button disabled={!isValid} onClick={() => router.push("/onboarding/link-bank")}>
          Next
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-6">
        <TextInput
          placeholder="Confirmation Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="button" className="text-base font-semibold text-text-primary underline">
          Need help logging in?
        </button>
      </div>
    </OnboardingShell>
  );
}

export default function OtpPage() {
  return (
    <Suspense>
      <OtpForm />
    </Suspense>
  );
}
