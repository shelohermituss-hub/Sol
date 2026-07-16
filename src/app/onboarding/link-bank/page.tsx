"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockSimple } from "@phosphor-icons/react/ssr";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

// Écran 1.4 — Add a bank using your debit card, avec sous-état "Linking…".
// Cf. design-refs/01-onboarding/06-link-bank-empty.png, 07-link-bank-filled.png,
// 08-linking-loading.png
export default function LinkBankPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");
  const [linking, setLinking] = useState(false);

  const isValid = cardNumber && expiration && cvv && zip;

  function handleLink() {
    if (!isValid) return;
    setLinking(true);
    setTimeout(() => router.push("/onboarding/legal-name"), 1200);
  }

  if (linking) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg-card">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-input border-t-cta-black" />
        <p className="text-lg text-text-primary">Linking…</p>
      </div>
    );
  }

  return (
    <OnboardingShell
      header={<Header onBack={() => router.back()} onHelp={() => {}} />}
      title="Add a bank using your debit card"
      subtitle="Linking an external account allows you to move money in and out of your Cash App balance."
      footer={
        <>
          <Button variant="secondary" onClick={() => router.push("/onboarding/legal-name")}>
            Skip
          </Button>
          <Button disabled={!isValid} onClick={handleLink}>
            Link Card
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TextInput
          id="debit-card-number"
          label="Debit Card Number"
          placeholder="Debit Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <TextInput
              id="card-expiration"
              label="Expiration date"
              placeholder="MM/YY"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <TextInput
              id="card-cvv"
              label="CVV"
              placeholder="3-Digit CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        <TextInput
          id="card-zip"
          label="ZIP Code"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <p className="flex items-center gap-1.5 text-sm text-text-secondary">
          <LockSimple size={14} weight="fill" />
          Secured with 256-bit encryption
        </p>
      </div>
    </OnboardingShell>
  );
}
