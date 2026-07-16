import * as React from "react"

/**
 * Icône "Set & Save" (onglet du bas) : trois pousses en éventail au-dessus
 * d'un dollar cerclé, reliés par une tige. Pas d'équivalent Phosphor fidèle
 * (voir design-tokens.md, section Icônes) — recréée à la main en SVG à
 * partir des captures.
 */
function SetAndSaveIcon({ className, weight = "regular" }: { className?: string; weight?: "regular" | "fill" }) {
  const filled = weight === "fill"
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* trois pousses en éventail */}
      <circle cx="12" cy="2.6" r="1.4" fill="currentColor" />
      <circle cx="8.8" cy="4.6" r="1.4" fill="currentColor" />
      <circle cx="15.2" cy="4.6" r="1.4" fill="currentColor" />
      <path
        d="M12 4V13.5M8.8 6v.5a3.2 3.2 0 0 0 3.2 3.2M15.2 6v.5A3.2 3.2 0 0 1 12 9.7"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* pièce dollar */}
      <circle
        cx="12"
        cy="18"
        r="4.3"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <text
        x="12"
        y="19.2"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="700"
        fill={filled ? "var(--color-paper)" : "currentColor"}
        stroke="none"
      >
        $
      </text>
    </svg>
  )
}

export { SetAndSaveIcon }
