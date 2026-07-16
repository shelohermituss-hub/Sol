"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Carrousel promo (app 2 "Latest Offers", Home). Nouveau composant :
// scroll-snap horizontal natif (même pattern que DateWheelPicker, pas de
// librairie tierce), dots calculés depuis la position de scroll.
function PromoCarousel({ children }: { children: React.ReactNode[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)

  function handleScroll() {
    const el = containerRef.current
    if (!el) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIndex(index)
  }

  return (
    <div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className="w-full shrink-0 snap-center">
            {child}
          </div>
        ))}
      </div>
      {children.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {children.map((_, i) => (
            <span
              key={i}
              className={cn("size-1.5 rounded-full transition-colors", i === activeIndex ? "bg-ink" : "bg-neutral-200")}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { PromoCarousel }
