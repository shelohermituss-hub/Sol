"use client";

import { useRouter } from "next/navigation";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { NumericKeypad } from "@/components/ui/numeric-keypad";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { useAmountBuffer } from "@/lib/use-amount-buffer";

// Écran 4.1 — Clavier montant (plein écran vert). Cf. design-refs/04-pay/pay-amount-keypad.png
export default function PayPage() {
  const router = useRouter();
  const { buffer, display, onDigit, onBackspace } = useAmountBuffer("10");
  const isValid = buffer.length > 0 && buffer !== ".";

  return (
    <div
      className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pt-4"
      style={{ backgroundColor: "var(--color-brand-green-surface)" }}
    >
      <div className="flex items-center justify-between">
        <ScanIcon />
        <AvatarCircle size={32} />
      </div>

      <p className="mt-12 text-center text-7xl font-extrabold text-white">{display}</p>
      <div className="mt-4 flex justify-center">
        <span className="rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-white">USD ⌄</span>
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

      <BottomTabBar theme="green" />
    </div>
  );
}

function ScanIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white">
      <path
        d="M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
