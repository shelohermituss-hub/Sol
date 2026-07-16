"use client";

import { useRouter } from "next/navigation";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const QUICK_AMOUNTS = ["1", "10", "20", "50", "100"];

interface AddCashSheetProps {
  open: boolean;
  onClose: () => void;
}

// Écran 5.1 — Add Cash (bottom sheet). Cf. design-refs/05-add-cash/add-cash-bottomsheet.png
export function AddCashSheet({ open, onClose }: AddCashSheetProps) {
  const router = useRouter();

  return (
    <BottomSheet open={open} onClose={onClose}>
      <p className="text-center text-lg font-bold text-text-primary">Add Cash</p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {QUICK_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => router.push(`/add-cash/pin?amount=${amount}`)}
            className={cn("rounded-2xl bg-bg-page py-4 text-lg font-semibold text-text-primary")}
          >
            ${amount}
          </button>
        ))}
        <button
          type="button"
          onClick={() => router.push("/add-cash")}
          className="rounded-2xl bg-bg-page py-4 text-lg font-semibold text-text-primary"
        >
          …
        </button>
      </div>
      <div className="mt-6">
        <Button onClick={() => router.push("/add-cash")}>Add</Button>
      </div>
    </BottomSheet>
  );
}
