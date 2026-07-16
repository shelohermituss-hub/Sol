import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-14 w-full min-w-0 rounded-input border border-neutral-200 bg-transparent px-4 text-base text-ink transition-colors outline-none placeholder:text-neutral-500 focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
