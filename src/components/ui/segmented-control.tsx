"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

// Toggle segmenté pill (2+ options mutuellement exclusives). Nouveau
// composant (app 2 "Active/Finished", "Payments/Payouts") — même logique
// visuelle que Button : actif = fond ink + texte paper, inactif =
// transparent + texte neutral-500.
function SegmentedControl({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="segmented-control" className={cn("w-full", className)} {...props} />
}

function SegmentedControlList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="segmented-control-list"
      className={cn("flex w-full gap-2 rounded-full bg-neutral-200/40 p-1", className)}
      {...props}
    />
  )
}

function SegmentedControlTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="segmented-control-tab"
      className={cn(
        "flex-1 rounded-full py-2.5 text-center font-heading text-[15px] font-semibold text-neutral-500 outline-none transition-colors data-active:bg-ink data-active:text-paper",
        className
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlList, SegmentedControlTab }
