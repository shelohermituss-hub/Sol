import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-heading text-[17px] font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink/90 disabled:bg-neutral-200 disabled:text-paper",
        secondary: "border border-ink bg-paper text-ink hover:bg-neutral-200/40 disabled:border-neutral-200 disabled:text-neutral-500",
        ghost: "text-ink hover:bg-neutral-200/40",
      },
      size: {
        default: "h-14 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
