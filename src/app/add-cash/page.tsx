"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/header";
import { NumericKeypad } from "@/components/ui/numeric-keypad";
import { Button } from "@/components/ui/button";
import { useAmountBuffer } from "@/lib/use-amount-buffer";

// Écran 5.2 — Add Cash (clavier plein écran).
// Cf. design-refs/05-add-cash/add-cash-fullscreen-keypad.png
export default function AddCashPage() {
  const router = useRouter();
  const { buffer, display, onDigit, onBackspace } = useAmountBuffer();
  const isValid = buffer.length > 0 && buffer !== ".";

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-card px-6 pt-4">
      <Header onClose={() => router.push("/")} />
      <p className="mt-4 text-center text-lg font-bold text-text-primary">Add Cash</p>
      <p
        className="mt-16 text-center text-7xl font-extrabold"
        style={{ color: "var(--color-brand-green)" }}
      >
        {display}
      </p>
      <div className="mt-16 flex-1">
        <NumericKeypad theme="light" showDecimal onDigit={onDigit} onBackspace={onBackspace} />
      </div>
      <div className="py-6">
        <Button
          disabled={!isValid}
          onClick={() => router.push(`/add-cash/pin?amount=${encodeURIComponent(buffer)}`)}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
