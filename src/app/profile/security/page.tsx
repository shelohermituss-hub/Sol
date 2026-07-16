"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/header";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneIcon } from "@/components/sections/profile/icons";

// Écran 7.3 — Security & Privacy. Cf. design-refs/07-profile-settings/security-privacy.png
export default function SecurityPrivacyPage() {
  const router = useRouter();
  const [securityLock, setSecurityLock] = useState(true);
  const [moveMoney, setMoveMoney] = useState(true);
  const [unlockApp, setUnlockApp] = useState(false);

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-page px-6 pt-4">
      <Header title="Security & Privacy" onBack={() => router.back()} />

      <p className="mt-6 text-sm font-bold uppercase text-text-secondary">Security</p>
      <div className="mt-2 rounded-2xl bg-bg-card px-5">
        <div className="flex items-center justify-between border-b border-bg-page-alt py-4">
          <span className="text-lg font-bold text-text-primary">Security Lock</span>
          <Switch checked={securityLock} onChange={setSecurityLock} />
        </div>
        <p className="py-3 text-text-secondary">
          Require a PIN to move money or unlock the app after 5 min of inactivity
        </p>
        <div className="border-t border-bg-page-alt">
          <Checkbox checked={moveMoney} onChange={setMoveMoney} label="Move money" />
        </div>
        <div className="border-t border-bg-page-alt">
          <Checkbox checked={unlockApp} onChange={setUnlockApp} label="Unlock the app" />
        </div>
        <button
          type="button"
          className="w-full border-t border-bg-page-alt py-4 text-center font-semibold"
          style={{ color: "var(--color-brand-green)" }}
        >
          Change Cash PIN
        </button>
      </div>

      <p className="mt-6 text-xl font-extrabold text-text-primary">Your Devices (1)</p>
      <p className="mt-2 text-text-secondary">These are devices that are signed in to your Cash App account</p>

      <div className="mt-4 flex items-center gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--color-brand-green)" }}
        >
          <PhoneIcon />
        </div>
        <div>
          <p className="font-semibold text-text-primary">iPhone (this device)</p>
          <p className="text-text-secondary">CA, United States · Active now</p>
        </div>
      </div>

      <button type="button" className="mt-6 pb-8 text-center font-semibold underline">
        View all
      </button>
    </div>
  );
}
