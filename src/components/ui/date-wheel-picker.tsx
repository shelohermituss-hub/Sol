"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const ITEM_HEIGHT = 44
const VISIBLE_ROWS = 5
const PAD_ROWS = Math.floor(VISIBLE_ROWS / 2)

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function WheelColumn({
  values,
  index,
  onSelect,
}: {
  values: string[]
  index: number
  onSelect: (index: number) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const scrollTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const didInit = React.useRef(false)

  React.useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    ref.current?.scrollTo({ top: index * ITEM_HEIGHT })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleScroll() {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const i = Math.min(Math.max(Math.round(el.scrollTop / ITEM_HEIGHT), 0), values.length - 1)
      onSelect(i)
      el.scrollTo({ top: i * ITEM_HEIGHT, behavior: "smooth" })
    }, 120)
  }

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className="scrollbar-none flex-1 snap-y snap-mandatory overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        height: ITEM_HEIGHT * VISIBLE_ROWS,
        maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
      }}
    >
      <div style={{ height: ITEM_HEIGHT * PAD_ROWS }} />
      {values.map((v, i) => (
        <div
          key={i}
          className={cn(
            "flex snap-center items-center justify-center font-heading transition-colors",
            i === index ? "text-[22px] text-ink" : "text-[19px] text-neutral-300"
          )}
          style={{ height: ITEM_HEIGHT }}
        >
          {v}
        </div>
      ))}
      <div style={{ height: ITEM_HEIGHT * PAD_ROWS }} />
    </div>
  )
}

// Sélecteur de date façon roue iOS native (3 colonnes Mois/Jour/Année),
// scroll-snap natif + estompage des bords via mask-image. Cf. design-refs/
// Oportun_iOS_Creating_a_goal_home/Oportun iOS Creating a goal (home) 6-7.png.
// Pas d'équivalent composant natif sur le web — recréation avec du scroll
// CSS, pas une librairie de wheel-picker tierce.
function DateWheelPicker({
  value,
  onChange,
}: {
  value: { month: number; day: number; year: number }
  onChange: (value: { month: number; day: number; year: number }) => void
}) {
  const years = React.useMemo(() => Array.from({ length: 12 }, (_, i) => 2023 + i), [])
  const days = React.useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1)), [])

  return (
    <div className="relative flex select-none" style={{ height: ITEM_HEIGHT * VISIBLE_ROWS }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 rounded-lg bg-neutral-200/40"
        style={{ top: ITEM_HEIGHT * PAD_ROWS, height: ITEM_HEIGHT }}
      />
      <WheelColumn values={MONTHS} index={value.month} onSelect={(month) => onChange({ ...value, month })} />
      <WheelColumn values={days} index={value.day} onSelect={(day) => onChange({ ...value, day })} />
      <WheelColumn
        values={years.map(String)}
        index={value.year}
        onSelect={(year) => onChange({ ...value, year })}
      />
    </div>
  )
}

function formatWheelDate(value: { month: number; day: number; year: number }) {
  const years = 2023 + value.year
  const monthShort = MONTHS[value.month].slice(0, 3)
  return `${monthShort} ${value.day + 1}, ${years}`
}

export { DateWheelPicker, formatWheelDate, MONTHS }
