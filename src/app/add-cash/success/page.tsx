"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/ui/header";
import { SuccessState } from "@/components/ui/success-state";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Écran 5.4 — Succès + upsell Direct Deposit.
// Cf. design-refs/05-add-cash/success-confirmation.png
function SuccessContent() {
  const router = useRouter();
  const amount = useSearchParams().get("amount") ?? "0";

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-card px-6 pt-4">
      <Header onClose={() => router.push("/")} />
      <div className="mt-6">
        <SuccessState title={`You added $${amount} to your Cash App`} />
      </div>
      <div className="mt-10 flex-1">
        <Card className="border border-bg-page-alt text-center">
          <div className="mx-auto flex h-16 w-24 items-center justify-center">
            <BanknoteIcon />
          </div>
          <p className="mt-3 text-lg font-semibold text-text-primary">
            Get paid up to 2 days faster with direct deposit
          </p>
          <div className="mt-4">
            <Button variant="secondary">Get Started</Button>
          </div>
        </Card>
      </div>
      <div className="py-6">
        <Button onClick={() => router.push("/")}>Done</Button>
      </div>
    </div>
  );
}

export default function AddCashSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}

function BanknoteIcon() {
  return (
    <svg width="72" height="40" viewBox="0 0 72 40" fill="none" aria-hidden="true">
      <rect
        x="2"
        y="6"
        width="60"
        height="30"
        rx="4"
        fill="var(--color-bg-page)"
        stroke="var(--color-brand-green)"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="21" r="8" stroke="var(--color-brand-green)" strokeWidth="1.5" />
    </svg>
  );
}
