"use client";

import { useRouter } from "next/navigation";
import { Scan, CaretDown } from "@phosphor-icons/react/ssr";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { NumericKeypad } from "@/components/ui/numeric-keypad";
import { AppShell } from "@/components/layout/app-shell";
import { useAmountBuffer } from "@/lib/use-amount-buffer";

// Écran 4.1 — Clavier montant (plein écran vert). Cf. design-refs/04-pay/pay-amount-keypad.png
export default function PayPage() {
  const router = useRouter();
  const { buffer, display, isValid, onDigit, onBackspace } = useAmountBuffer("10");

  return (
    <AppShell tabBarTheme="green" bgClassName="" contentMaxWidth="md:max-w-md">
      <div
        className="flex min-h-dvh flex-col px-6 pt-4 md:min-h-0 md:rounded-3xl md:py-8"
        style={{ backgroundColor: "var(--color-brand-green-surface)" }}
      >
        <div className="flex items-center justify-between">
          <Scan size={24} color="white" />
          <AvatarCircle size={32} />
        </div>

      <p className="mt-12 text-center text-7xl font-extrabold text-white">{display}</p>
      <div className="mt-4 flex justify-center">
        <span className="flex items-center gap-1 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-white">
          USD
          <CaretDown size={12} />
        </span>
      </div>

      <div className="mt-12 flex-1">
        <NumericKeypad theme="green" onDigit={onDigit} onBackspace={onBackspace} />
      </div>

        <div className="flex gap-3 py-6">
          <button
            type="button"
            disabled={!isValid}
            className="h-14 flex-1 rounded-full bg-white/20 text-lg font-semibold text-white disabled:opacity-50"
          >
            Request
          </button>
          <button
            type="button"
            disabled={!isValid}
            onClick={() => router.push(`/pay/details?amount=${encodeURIComponent(buffer)}`)}
            className="h-14 flex-1 rounded-full bg-white/20 text-lg font-semibold text-white disabled:opacity-50"
          >
            Pay
          </button>
        </div>
      </div>
    </AppShell>
  );
}
