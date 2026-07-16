"use client";

import { useState } from "react";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { Sparkline } from "@/components/ui/sparkline";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { BalanceCard } from "@/components/sections/home/balance-card";
import { ShortcutCard } from "@/components/sections/home/shortcut-card";
import { AddCashSheet } from "@/components/sections/add-cash/add-cash-sheet";

// Écran 3.1 — Money home. Cf. design-refs/03-home/money-home-populated-state.png
// (et money-home-empty-state.png pour la variante solde $0 / pas de position
// Bitcoin ou Stocks — même structure, données à zéro).
export default function Home() {
  const [addCashOpen, setAddCashOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-page">
      <div className="flex-1 px-6 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-text-primary">Money</h1>
          <AvatarCircle size={40} />
        </div>

        <div className="mt-6">
          <BalanceCard balance="$88.44" onAddCash={() => setAddCashOpen(true)} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <ShortcutCard label="Savings">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-savings-green)" }}
            >
              <TargetIcon />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-text-primary">$0.00</p>
              <p className="text-sm text-text-secondary">Save for a goal</p>
            </div>
          </ShortcutCard>

          <ShortcutCard label="Bitcoin">
            <p className="text-2xl font-extrabold text-text-primary">$92.05</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: "var(--color-brand-green)" }}>
                ↑ 0.50% today
              </p>
              <Sparkline points={[10, 14, 9, 16, 13, 18, 20]} color="var(--color-accent-blue)" />
            </div>
          </ShortcutCard>

          <ShortcutCard label="Stocks">
            <p className="text-2xl font-extrabold text-text-primary">$2,995.85</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-secondary">↓ 0.80% today</p>
              <Sparkline points={[18, 12, 15, 8, 11, 9, 7]} color="var(--color-accent-purple)" />
            </div>
          </ShortcutCard>

          <ShortcutCard label="Free tax filing">
            <div className="flex h-11 w-11 items-center justify-center">
              <FolderIcon />
            </div>
          </ShortcutCard>
        </div>
      </div>

      <BottomTabBar />
      <AddCashSheet open={addCashOpen} onClose={() => setAddCashOpen(false)} />
    </div>
  );
}

function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="9" stroke="white" strokeWidth="1.6" />
      <circle cx="11" cy="11" r="4" stroke="white" strokeWidth="1.6" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="32" height="26" viewBox="0 0 32 26" fill="none" aria-hidden="true">
      <path
        d="M1 5a2 2 0 012-2h8l3 3h15a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"
        fill="var(--color-accent-card-lime)"
        stroke="var(--color-cta-black)"
        strokeWidth="1"
      />
    </svg>
  );
}
