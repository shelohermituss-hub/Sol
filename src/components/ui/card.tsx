import * as React from "react"

import { cn } from "@/lib/utils"

// Bordure remplacée par une ombre légère (flotte sur le fond gris
// --color-canvas) — cf. CLAUDE.md, exception #2, décision produit. Ombre
// affinée (quasi imperceptible) après audit visuel de captures Cash App
// réelles (Lot D1, design-tokens.md, section Ombres) : Cash App ne
// montre aucune ombre portée sur ses cartes, la profondeur vient
// uniquement du contraste de couleur blanc/gris.
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-4 rounded-card bg-paper p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-[17px] font-bold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[15px] text-neutral-500", className)}
      {...props}
    />
  )
}

export { Card, CardTitle, CardDescription }
