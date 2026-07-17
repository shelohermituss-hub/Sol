import * as React from "react"
import Link from "next/link"
import { CaretRight } from "@phosphor-icons/react/ssr"

// Vignette catégorie cliquable (app 2 "Popular Goals" -> grille façon
// Cash App, Home). Carte blanche + chevron + zone "couverture" (icône,
// illustration ou graphique) plutôt que le précédent bloc plein-couleur
// non cliquable — chaque carte ouvre désormais un écran détail dédié.
// Titre seul (pas de sous-titre) et zone illustration agrandie sans
// overflow-hidden — corrige un rognage de l'illustration signalé par
// l'utilisateur (le sous-titre + une zone graphique trop petite/coupée
// laissaient à peine dépasser l'illustration). Bordure remplacée par une
// ombre, cohérent avec Card (ui/card.tsx) depuis le passage au fond gris.
function CategoryCard({
  href,
  title,
  graphic,
}: {
  href: string
  title: string
  graphic: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex h-48 flex-col rounded-card bg-paper p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-heading text-[15px] font-bold text-ink">{title}</p>
        <CaretRight className="size-4 shrink-0 text-ink" />
      </div>
      <div className="flex flex-1 items-center justify-center">{graphic}</div>
    </Link>
  )
}

export { CategoryCard }
