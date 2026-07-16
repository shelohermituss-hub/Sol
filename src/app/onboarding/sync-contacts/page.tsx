"use client";

import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";

// Écran 1.10 — Sync your contacts. Cf. design-refs/01-onboarding/18-sync-contacts-prompt.png
export default function SyncContactsPage() {
  const router = useRouter();
  const goNext = () => router.push("/onboarding/invite-friends");

  return (
    <OnboardingShell
      header={<Header onClose={goNext} />}
      title="Sync your contacts to find them on Cash App"
      subtitle="This helps you find, invite, and securely pay friends. You can manage syncing anytime in your Security & privacy settings."
      footer={
        <>
          <button type="button" className="mb-2 text-center text-base font-semibold underline">
            How Cash App uses your contacts
          </button>
          <Button variant="secondary" onClick={goNext}>
            Not now
          </Button>
          <Button onClick={goNext}>Sync contacts</Button>
        </>
      }
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-brand-green)" }}
      >
        <span className="text-2xl text-white">👥</span>
      </div>
    </OnboardingShell>
  );
}
