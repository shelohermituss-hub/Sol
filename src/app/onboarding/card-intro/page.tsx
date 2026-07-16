"use client";

import { useRouter } from "next/navigation";
import { Smiley, Lightning, Prohibit, ShieldCheck } from "@phosphor-icons/react/ssr";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { Icon: Smiley, label: "Customizable design" },
  { Icon: Lightning, label: "Instant discounts" },
  { Icon: Prohibit, label: "No hidden fees" },
  { Icon: ShieldCheck, label: "FDIC insurance*" },
];

// Écran 1.9 — Meet the Cash App Card. Cf. design-refs/01-onboarding/16-card-intro-top.png,
// 17-card-intro-scrolled.png
// Illustration de carte simplifiée (placeholder dégradé) en attendant l'export
// de l'asset réel depuis Figma — cf. INVENTAIRE.md.
export default function CardIntroPage() {
  const router = useRouter();

  return (
    <OnboardingShell
      footer={
        <>
          <Button variant="secondary" onClick={() => router.push("/onboarding/sync-contacts")}>
            Skip
          </Button>
          <Button onClick={() => router.push("/onboarding/sync-contacts")}>Next</Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-8">
        <div
          className="h-40 w-64 -rotate-6 rounded-2xl shadow-lg"
          style={{ backgroundColor: "var(--color-accent-card-lime)" }}
        />
        <h1 className="text-center text-3xl font-extrabold text-text-primary">Meet the Cash App Card</h1>
        <div className="flex w-full flex-col gap-6">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex items-center gap-4">
              <f.Icon size={26} className="text-text-primary" />
              <span className="text-lg font-semibold text-text-primary">{f.label}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-secondary">
          *With a Cash App Card, your balance is eligible for FDIC pass-through insurance through
          our Program Banks Wells Fargo Bank, N.A. and/or Sutton Bank, Members FDIC for up to
          $250,000 per customer when aggregated with all other deposits held in the same legal
          capacity at each Program Bank above, if certain conditions are met.
        </p>
        <p className="text-sm text-text-secondary">
          Cash App is a financial services platform, and not an FDIC-insured bank. Prepaid debit
          cards issued by Sutton Bank, Member FDIC.{" "}
          <button type="button" className="underline">
            See terms and conditions.
          </button>
        </p>
      </div>
    </OnboardingShell>
  );
}
