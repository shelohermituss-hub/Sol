"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { PinDots } from "@/components/ui/pin-dots";
import { NumericKeypad } from "@/components/ui/numeric-keypad";

const PIN_LENGTH = 4;

// Écran 1.8 — Create/Confirm Cash PIN. Cf. design-refs/01-onboarding/14-pin-create.png,
// 15-pin-confirm.png
// Le clavier numérique visible ici n'apparaît pas dans les captures d'origine
// (le clavier système iOS s'affichait par-dessus) — ajouté pour permettre la
// saisie sur le web, cf. INVENTAIRE.md.
export default function PinPage() {
  const router = useRouter();
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [firstPin, setFirstPin] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleDigit(digit: string) {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPin(next);
    setError(false);

    if (next.length === PIN_LENGTH) {
      if (step === "create") {
        setTimeout(() => {
          setFirstPin(next);
          setPin("");
          setStep("confirm");
        }, 200);
      } else if (next === firstPin) {
        setTimeout(() => router.push("/onboarding/card-intro"), 200);
      } else {
        setTimeout(() => {
          setPin("");
          setError(true);
        }, 200);
      }
    }
  }

  function handleBackspace() {
    setPin((p) => p.slice(0, -1));
  }

  return (
    <OnboardingShell
      title={
        step === "create"
          ? "Create a Cash PIN to help secure your personal account"
          : "Please confirm your Cash PIN"
      }
    >
      <div className="flex flex-col items-center gap-2">
        <PinDots length={PIN_LENGTH} filled={pin.length} />
        {error && <p className="mt-2 text-sm text-red-600">PINs didn&apos;t match. Try again.</p>}
      </div>
      <div className="mt-12">
        <NumericKeypad theme="light" onDigit={handleDigit} onBackspace={handleBackspace} />
      </div>
    </OnboardingShell>
  );
}
