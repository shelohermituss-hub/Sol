import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { CaretRight } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

type ListRowProps = useRender.ComponentProps<"div"> & {
  icon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  trailing?: React.ReactNode
  /** Affiche un chevron de navigation à droite (ligne cliquable menant à un sous-écran). */
  showChevron?: boolean
  /** "circle" (défaut, buts/comptes) ou "square" (badges colorés, articles "More from Oportun"). */
  iconVariant?: "circle" | "square"
}

// Ligne de liste récurrente : icône circulaire + titre/sous-titre + élément
// trailing (valeur, badge, chevron). Utilisée pour les buts d'épargne, les
// comptes connectés, les transactions, les menus de réglages... Rendue par
// défaut en <div>, passer `render={<Link href="..." />}` pour une ligne
// cliquable/navigable.
function ListRow({
  className,
  icon,
  title,
  subtitle,
  trailing,
  showChevron,
  iconVariant = "circle",
  render,
  ...props
}: ListRowProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn("flex w-full items-center gap-3 py-4 text-left", className),
        children: (
          <>
            {icon && (
              <span
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center overflow-hidden",
                  iconVariant === "circle" ? "rounded-full border border-neutral-200" : "rounded-2xl"
                )}
              >
                {icon}
              </span>
            )}
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-heading text-[17px] font-bold text-ink">{title}</span>
              {subtitle && <span className="text-[15px] text-neutral-500">{subtitle}</span>}
            </span>
            {trailing && <span className="shrink-0 font-heading text-[17px] font-bold text-ink">{trailing}</span>}
            {showChevron && <CaretRight className="size-4 shrink-0 text-ink" />}
          </>
        ),
      },
      props
    ),
    state: { slot: "list-row" },
  })
}

export { ListRow }
