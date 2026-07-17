import * as React from "react"
import Link from "next/link"
import { CaretRight } from "@phosphor-icons/react/ssr"

// Vignette catégorie cliquable (app 2 "Popular Goals" -> grille façon
// Cash App, Home). Carte blanche + chevron + zone "couverture" (icône,
// illustration ou graphique) plutôt que le précédent bloc plein-couleur
// non cliquable — chaque carte ouvre désormais un écran détail dédié.
function CategoryCard({
  href,
  title,
  subtitle,
  graphic,
}: {
  href: string
  title: string
  subtitle?: string
  graphic: React.ReactNode
}) {
  return (
    <Link href={href} className="flex h-40 flex-col justify-between rounded-card border border-neutral-200 bg-paper p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-heading text-[15px] font-bold text-ink">{title}</p>
          {subtitle && <p className="mt-0.5 text-[13px] text-neutral-500">{subtitle}</p>}
        </div>
        <CaretRight className="size-4 shrink-0 text-ink" />
      </div>
      <div className="flex flex-1 items-end justify-center overflow-hidden">{graphic}</div>
    </Link>
  )
}

export { CategoryCard }
