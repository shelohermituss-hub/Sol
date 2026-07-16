import * as React from "react"

// Vignette catégorie (app 2 "Popular Goals", Home). Nouveau composant,
// fond uni tiré de la palette d'illustration déjà définie dans
// design-tokens.md (jamais une nouvelle couleur), titre blanc en overlay.
function CategoryCard({
  title,
  subtitle,
  bgColor,
  icon,
}: {
  title: string
  subtitle: string
  bgColor: string
  icon?: React.ReactNode
}) {
  return (
    <div
      className="flex h-28 w-40 shrink-0 flex-col justify-between rounded-card p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-heading text-[17px] font-bold text-paper">{title}</p>
          <p className="mt-1 text-[13px] text-paper/80">{subtitle}</p>
        </div>
        {icon && <span className="text-paper">{icon}</span>}
      </div>
    </div>
  )
}

export { CategoryCard }
