"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

// Curseur à poignée unique (montant, plage de valeurs). Nouveau composant
// (app 2 "Payout Amount"), même logique visuelle que le reste : piste
// neutral-200, portion active + poignée en ink.
function Slider({ className, ...props }: SliderPrimitive.Root.Props) {
  return (
    <SliderPrimitive.Root data-slot="slider" className={cn("w-full", className)} {...props}>
      <SliderPrimitive.Control className="flex w-full items-center py-3">
        <SliderPrimitive.Track className="relative h-1 w-full rounded-full bg-neutral-200">
          <SliderPrimitive.Indicator className="absolute h-full rounded-full bg-ink" />
          <SliderPrimitive.Thumb className="size-5 rounded-full border-2 border-ink bg-paper outline-none focus-visible:ring-3 focus-visible:ring-ring" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
