import type { ReactNode } from "react"

// Fondu d'entrée à chaque navigation entre écrans /dart/* — demande
// explicite ("ajoute des animations et des transitions pour fluidifier
// l'application"). `template.tsx` (contrairement à layout.tsx) remonte à
// chaque changement de route, ce qui rejoue l'animation à chaque
// navigation plutôt qu'une seule fois au premier chargement — c'est le
// mécanisme prévu par Next.js pour ce cas d'usage, appliqué ici une seule
// fois plutôt que sur chacun des ~30 écrans individuellement.
export default function DartTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-in fade-in duration-300">{children}</div>
}
