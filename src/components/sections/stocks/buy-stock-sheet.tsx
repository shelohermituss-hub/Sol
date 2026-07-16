"use client";

import { CaretDown } from "@phosphor-icons/react/ssr";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { cn } from "@/lib/cn";

const QUICK_AMOUNTS = ["1", "10", "20", "50", "100"];

interface BuyStockSheetProps {
  open: boolean;
  onClose: () => void;
  stockName: string;
}

// Écran 6.1 — Buy stock (bottom sheet). Cf. design-refs/06-stocks/buy-stock-bottomsheet.png
// Note : pas de capture pour la suite du flow (PIN / confirmation d'achat) —
// "Add" ferme simplement la feuille, cf. INVENTAIRE.md.
export function BuyStockSheet({ open, onClose, stockName }: BuyStockSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <p className="text-center text-lg font-bold text-text-primary">Buy {stockName}</p>
      <p className="mt-1 text-center text-text-secondary">One-Time Order</p>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm font-semibold"
          style={{ borderColor: "var(--color-accent-blue)", color: "var(--color-accent-blue)" }}
        >
          Change Order Type
          <CaretDown size={12} />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {QUICK_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={onClose}
            className={cn("rounded-2xl bg-bg-page py-4 text-lg font-semibold text-text-primary")}
          >
            ${amount}
          </button>
        ))}
        <button type="button" onClick={onClose} className="rounded-2xl bg-bg-page py-4 text-lg font-semibold text-text-primary">
          …
        </button>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 h-14 w-full rounded-full text-lg font-semibold text-white"
        style={{ backgroundColor: "var(--color-accent-blue)" }}
      >
        Add
      </button>
    </BottomSheet>
  );
}
