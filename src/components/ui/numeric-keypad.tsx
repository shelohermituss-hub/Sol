"use client"

import { Backspace } from "@phosphor-icons/react/ssr"

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"] as const

// Clavier numérique pour la saisie de montant. Cf. design-refs/
// Oportun_iOS_Transferring_money/Oportun iOS Transferring money 3-4.png.
function NumericKeypad({ onPress }: { onPress: (key: (typeof KEYS)[number]) => void }) {
  return (
    <div className="grid grid-cols-3 gap-y-6">
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onPress(key)}
          className="flex h-14 items-center justify-center font-heading text-[32px] font-bold text-ink"
        >
          {key === "backspace" ? <Backspace className="size-7" /> : key}
        </button>
      ))}
    </div>
  )
}

export { NumericKeypad }
