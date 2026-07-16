"use client";

import { useState } from "react";
import Link from "next/link";
import { Target, FolderSimple } from "@phosphor-icons/react/ssr";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { Sparkline } from "@/components/ui/sparkline";
import { AppShell } from "@/components/layout/app-shell";
import { BalanceCard } from "@/components/sections/home/balance-card";
import { ShortcutCard } from "@/components/sections/home/shortcut-card";
import { AddCashSheet } from "@/components/sections/add-cash/add-cash-sheet";

// Écran 3.1 — Money home. Cf. design-refs/03-home/money-home-populated-state.png
// (et money-home-empty-state.png pour la variante solde $0 / pas de position
// Bitcoin ou Stocks — même structure, données à zéro).
export default function Home() {
  const [addCashOpen, setAddCashOpen] = useState(false);

  return (
    <AppShell>
      <div className="px-6 pt-4 md:px-0 md:pt-0">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-text-primary">Money</h1>
          <Link href="/profile">
            <AvatarCircle size={40} />
          </Link>
        </div>

        <div className="mt-6">
          {/* onCashOut : pas de capture de référence pour ce flow (cf. AUDIT.md) — bouton
              volontairement inerte, comme "Request" (Pay) et "Buy stocks" (Stocks). */}
          <BalanceCard balance="$88.44" onAddCash={() => setAddCashOpen(true)} onCashOut={() => {}} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <ShortcutCard label="Savings">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-savings-green)" }}
            >
              <Target size={22} color="white" />
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

          <ShortcutCard label="Stocks" href="/stocks">
            <p className="text-2xl font-extrabold text-text-primary">$2,995.85</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-secondary">↓ 0.80% today</p>
              <Sparkline points={[18, 12, 15, 8, 11, 9, 7]} color="var(--color-accent-purple)" />
            </div>
          </ShortcutCard>

          <ShortcutCard label="Free tax filing">
            <div className="flex h-11 w-11 items-center justify-center">
              <FolderSimple size={30} weight="fill" style={{ color: "var(--color-accent-card-lime)" }} />
            </div>
          </ShortcutCard>
        </div>
      </div>

      <AddCashSheet open={addCashOpen} onClose={() => setAddCashOpen(false)} />
    </AppShell>
  );
}
