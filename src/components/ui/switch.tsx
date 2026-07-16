"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full border border-transparent transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring data-checked:bg-brand-green data-unchecked:bg-neutral-200 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-[27px] translate-x-0.5 rounded-full bg-paper shadow transition-transform data-checked:translate-x-[22px]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
