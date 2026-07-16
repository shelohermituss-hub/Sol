"use client";

import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/layout/onboarding-shell";
import { Header } from "@/components/ui/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Écran 1.11 — Invite Friends, Get $5 Each. Cf. design-refs/01-onboarding/19-invite-friends.png
export default function InviteFriendsPage() {
  const router = useRouter();
  const goNext = () => router.push("/onboarding/welcome");

  return (
    <OnboardingShell
      header={<Header onClose={goNext} onHelp={() => {}} />}
      title="Invite Friends, Get $5 Each"
      subtitle="By inviting friends, you confirm that recipients have given consent to receive this message."
      footer={<Button onClick={goNext}>Share link</Button>}
    >
      <div className="flex flex-col gap-6">
        <input
          placeholder="Search phone or email"
          className="h-14 w-full rounded-full bg-bg-page px-5 text-lg text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
        <Card className="border border-bg-page-alt text-center">
          <p className="text-lg font-bold text-text-primary">Sync your contacts</p>
          <p className="mt-3 text-text-secondary">
            We&apos;ll use your contacts to help you find friends, verify your identity, and
            prevent fraud.
          </p>
          <button type="button" className="mt-3 font-semibold underline">
            Sync contacts
          </button>
        </Card>
      </div>
    </OnboardingShell>
  );
}
