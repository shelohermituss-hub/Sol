// Mini-graphique en ligne (carte "Exchange Rate", Home). Cf. Cash App
// (cartes Bitcoin/Stocks) : un graphique de données, pas une illustration
// — construit en SVG inline comme la frise de progression de CircleCard,
// aucune génération IA nécessaire pour une courbe de points.
function Sparkline({ data, color, className }: { data: number[]; color: string; className?: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export { Sparkline }
