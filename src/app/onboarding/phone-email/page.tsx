"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

// Écran 1.2 — Enter phone or email. Cf. design-refs/01-onboarding/01-enter-phone.png,
// 02-enter-email-empty.png, 03-enter-email-filled.png (le mode email est le
// même écran, basculé via "Use Email" / "Use Phone").
export default function PhoneEmailPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");

  const isValid = value.trim().length > 0;

  function handleNext() {
    if (!isValid) return;
    router.push(`/onboarding/otp?contact=${encodeURIComponent(value)}`);
  }

  return (
    <OnboardingShell
      header={<Header onHelp={() => {}} />}
      title={mode === "phone" ? "Enter your phone or email" : "Enter your email"}
      footer={
        <>
          {mode === "email" && (
            <p className="text-center text-sm text-text-secondary">
              By entering and tapping Next, you agree to the Terms, E-Sign Consent & Privacy
              Notice
            </p>
          )}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              fullWidth={false}
              className="flex-1"
              onClick={() => {
                setMode(mode === "phone" ? "email" : "phone");
                setValue("");
              }}
            >
              {mode === "phone" ? "Use Email" : "Use Phone"}
            </Button>
            <Button fullWidth={false} className="flex-1" disabled={!isValid} onClick={handleNext}>
              Next
            </Button>
          </div>
        </>
      }
    >
      <div className="flex flex-col items-center gap-6">
        {mode === "phone" ? (
          <div className="flex h-16 w-full items-center gap-2 rounded-2xl border border-border-input bg-bg-card px-5">
            <span className="text-lg text-text-primary">+1</span>
            <input
              type="tel"
              placeholder="Phone Number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-full flex-1 text-lg text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
          </div>
        ) : (
          <TextInput
            type="email"
            placeholder="Email Address"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <button type="button" className="text-base font-semibold text-text-primary underline">
          Need help logging in?
        </button>
      </div>
    </OnboardingShell>
  );
}
