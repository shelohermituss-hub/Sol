import * as React from "react"
import { Check } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

// Bandeau de succès inline (pas un toast flottant) : pousse le contenu de la
// page, ne se superpose pas. Vu après une mutation réussie (email modifié,
// compte supprimé, but créé...).
function SuccessBanner({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-3 rounded-card bg-ink px-4 py-4 text-paper",
        className
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-paper">
        <Check className="size-4" weight="bold" />
      </span>
      <span className="text-[15px] font-medium">{children}</span>
    </div>
  )
}

export { SuccessBanner }
