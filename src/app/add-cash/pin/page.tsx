"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/ui/header";
import { PinDots } from "@/components/ui/pin-dots";
import { NumericKeypad } from "@/components/ui/numeric-keypad";

const PIN_LENGTH = 4;

// Écran 5.3 — Confirm your Cash PIN. Cf. design-refs/05-add-cash/confirm-pin.png
function ConfirmPinForm() {
  const router = useRouter();
  const amount = useSearchParams().get("amount") ?? "0";
  const [pin, setPin] = useState("");

  function handleDigit(digit: string) {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === PIN_LENGTH) {
      setTimeout(() => router.push(`/add-cash/success?amount=${encodeURIComponent(amount)}`), 200);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-card px-6 pt-4">
      <Header onClose={() => router.push("/")} onHelp={() => {}} />
      <p className="mt-6 text-3xl font-extrabold text-text-primary">Confirm your Cash PIN</p>
      <div className="mt-6">
        <PinDots length={PIN_LENGTH} filled={pin.length} />
      </div>
      <div className="mt-16 flex-1">
        <NumericKeypad theme="light" onDigit={handleDigit} onBackspace={() => setPin((p) => p.slice(0, -1))} />
      </div>
    </div>
  );
}

export default function ConfirmPinPage() {
  return (
    <Suspense>
      <ConfirmPinForm />
    </Suspense>
  );
}
