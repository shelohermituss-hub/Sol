"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredPage } from "@/components/layout/centered-page";
import { Header } from "@/components/ui/header";
import { Checkbox } from "@/components/ui/checkbox";

// Écran 7.4 — Notifications. Cf. design-refs/07-profile-settings/notifications.png
// Les libellés des lignes floutées dans la capture (2 lignes de la 1ère section)
// sont approximés — à confirmer contre la vraie capture Figma.
export default function NotificationsPage() {
  const router = useRouter();
  const [push, setPush] = useState(false);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [cashTeam, setCashTeam] = useState(false);
  const [offers, setOffers] = useState(false);
  const [stock, setStock] = useState(true);
  const [bitcoin, setBitcoin] = useState(false);

  return (
    <CenteredPage>
      <Header title="Notifications" onBack={() => router.back()} />

      <div className="mt-4 rounded-2xl bg-bg-card px-5">
        <div className="border-b border-bg-page-alt">
          <Checkbox checked={push} onChange={setPush} label="Push Notifications" />
        </div>
        <div className="border-b border-bg-page-alt">
          <Checkbox checked={email} onChange={setEmail} label="Email Notifications" />
        </div>
        <Checkbox checked={sms} onChange={setSms} label="SMS Notifications" />
      </div>

      <div className="mt-4 rounded-2xl bg-bg-card px-5">
        <div className="border-b border-bg-page-alt">
          <Checkbox checked={cashTeam} onChange={setCashTeam} label="Cash Team Notifications" />
        </div>
        <div className="border-b border-bg-page-alt">
          <Checkbox checked={offers} onChange={setOffers} label="Square Offers and Rewards" />
        </div>
        <div className="flex items-center justify-between border-b border-bg-page-alt">
          <Checkbox checked={stock} onChange={setStock} label="Stock" />
          <button type="button" className="font-semibold" style={{ color: "var(--color-brand-green)" }}>
            Manage
          </button>
        </div>
        <div className="flex items-center justify-between">
          <Checkbox checked={bitcoin} onChange={setBitcoin} label="Bitcoin" />
          <span className="font-semibold text-text-secondary">Manage</span>
        </div>
      </div>
    </CenteredPage>
  );
}
