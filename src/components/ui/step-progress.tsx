import { cn } from "@/lib/utils"

// Barre d'étapes (flux "Join a Game'ya" : Payout Amount → Monthly Pay-in
// → Slot → Review). Nouveau composant, même esprit que le texte "Step X
// of Y" de l'Onboarding mais visuel — l'app 2 montre une vraie frise de
// progression, repère fonctionnel utile à conserver.
function StepProgress({ steps, current, className }: { steps: number; current: number; className?: string }) {
  return (
    <div className={cn("flex gap-2", className)} role="progressbar" aria-valuenow={current} aria-valuemax={steps}>
      {Array.from({ length: steps }, (_, i) => (
        <span
          key={i}
          className={cn("h-1.5 flex-1 rounded-full", i < current ? "bg-brand-primary" : "bg-neutral-200")}
        />
      ))}
    </div>
  )
}

export { StepProgress }
