"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { PinDots } from "@/components/ui/pin-dots";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { SuccessState } from "@/components/ui/success-state";
import { ListRow } from "@/components/ui/list-row";
import { NumericKeypad } from "@/components/ui/numeric-keypad";
import { BottomSheet } from "@/components/ui/bottom-sheet";

// Page temporaire de vérification visuelle des composants de base
// (Étape 1) — pas un écran du produit. À supprimer une fois les
// composants validés visuellement contre design-refs/.
export default function StyleguidePage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-10 p-6">
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">Header</h2>
        <div className="rounded-2xl bg-bg-card p-2">
          <Header onBack={() => {}} onHelp={() => {}} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">Button</h2>
        <div className="flex flex-col gap-3">
          <Button variant="primary">Next</Button>
          <Button variant="secondary">Use Email</Button>
          <Button disabled>Next</Button>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">TextInput</h2>
        <div className="flex flex-col gap-4">
          <TextInput placeholder="Phone Number" />
          <TextInput label="ZIP Code" placeholder="ZIP Code" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">PinDots</h2>
        <PinDots filled={3} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">Card</h2>
        <Card>
          <p className="text-sm text-text-secondary">Cash Balance</p>
          <p className="text-4xl font-bold">$0.00</p>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">ListRow</h2>
        <Card className="p-0">
          <div className="px-5">
            <ListRow label="Security & Privacy" />
            <ListRow label="Notifications" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">SuccessState</h2>
        <SuccessState title="Welcome to Cash App!" />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">NumericKeypad — light</h2>
        <NumericKeypad theme="light" onDigit={() => {}} onBackspace={() => {}} />
      </section>

      <section className="rounded-2xl bg-brand-green-surface p-4">
        <h2 className="mb-3 text-sm font-bold uppercase text-white/80">NumericKeypad — green</h2>
        <NumericKeypad theme="green" showDecimal onDigit={() => {}} onBackspace={() => {}} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase text-text-secondary">BottomSheet</h2>
        <Button variant="secondary" onClick={() => setSheetOpen(true)}>
          Open bottom sheet
        </Button>
        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
          <p className="text-center text-lg font-semibold">Add Cash</p>
        </BottomSheet>
      </section>
    </div>
  );
}
