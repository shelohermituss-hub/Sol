"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Money } from "@phosphor-icons/react/ssr";
import { CenteredPage } from "@/components/layout/centered-page";
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
    <CenteredPage bgClassName="bg-bg-card">
      <Header onClose={() => router.push("/")} />
      <div className="mt-6">
        <SuccessState title={`You added $${amount} to your Cash App`} />
      </div>
      <div className="mt-10 flex-1">
        <Card className="border border-bg-page-alt text-center">
          <div className="mx-auto flex h-16 w-24 items-center justify-center">
            <Money size={40} style={{ color: "var(--color-brand-green)" }} />
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
    </CenteredPage>
  );
}

export default function AddCashSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
