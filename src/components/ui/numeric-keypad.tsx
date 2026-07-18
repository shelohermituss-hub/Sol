"use client"

import { Backspace } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"] as const

// Clavier numérique pour la saisie de montant. Cf. design-refs/
// 2023-community/Pay amount.png (fond coloré plein écran) et
// Add cash.png (fond blanc, bottom sheet) — chiffres en graisse normale
// (pas bold), `text-current` pour hériter la couleur du fond (blanc sur
// primary, ink sur blanc).
function NumericKeypad({
  onPress,
  className,
}: {
  onPress: (key: (typeof KEYS)[number]) => void
  className?: string
}) {
  return (
    <div className={cn("grid grid-cols-3 gap-y-6", className)}>
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onPress(key)}
          className="flex h-14 items-center justify-center font-heading text-[32px] font-normal text-current"
        >
          {key === "backspace" ? <Backspace className="size-7" /> : key}
        </button>
      ))}
    </div>
  )
}

export { NumericKeypad }
