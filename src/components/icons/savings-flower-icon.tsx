// Icône "Savvier savings" (upsell Set & Save en fin d'onboarding) : une
// tige unique portant une pièce dollar, avec une feuille menthe et une
// feuille noire. Pas d'équivalent Phosphor fidèle (voir design-tokens.md,
// section Icônes) — recréée à la main à partir de la capture d'écran
// (Oportun iOS Onboarding 13.png).
function SavingsFlowerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 10.5V20"
        stroke="#000000"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d="M12 15.5c0-1.9-1.5-2.6-3.4-3.4C7.2 11.6 6.3 11 6 10c1.3-.2 2.7.1 3.8.9 1.1.8 1.9 2 2.2 3.4v1.2Z"
        fill="#8FD9AC"
        stroke="#000000"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <path
        d="M12 15.5c0-1.9 1.5-2.6 3.4-3.4C16.8 11.6 17.7 11 18 10c-1.3-.2-2.7.1-3.8.9-1.1.8-1.9 2-2.2 3.4v1.2Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="3.4" fill="#F4A672" stroke="#000000" strokeWidth={1.1} />
      <circle cx="12" cy="7" r="2" fill="#FFCF1E" stroke="#000000" strokeWidth={1.1} />
      <text x="12" y="8.1" textAnchor="middle" fontSize="2.6" fontWeight="700" fill="#000000" stroke="none">
        $
      </text>
    </svg>
  )
}

export { SavingsFlowerIcon }
