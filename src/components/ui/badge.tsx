import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-6 w-fit shrink-0 items-center justify-center rounded-full px-3 text-xs font-bold whitespace-nowrap",
  {
    variants: {
      variant: {
        // Vert (pas bleu) — cf. CLAUDE.md, exception #5 : reproduit le
        // badge "New" réel de Cash App (Frame 30.png, menu compte).
        new: "bg-accent-mint text-brand-green",
        neutral: "bg-neutral-200 text-ink",
        success: "bg-accent-mint text-brand-green",
      },
    },
    defaultVariants: {
      variant: "new",
    },
  }
)

function Badge({
  className,
  variant = "new",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
