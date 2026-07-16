import { Umbrella, CloudLightning, DeviceMobile } from "@phosphor-icons/react/ssr"
import type { Goal } from "@/lib/goals-data"

// Icônes de but colorées — approximation Phosphor en attendant la
// recréation en SVG illustratif fidèle (voir design-tokens.md, section
// Icônes, et INVENTAIRE.md).
const ICONS = {
  umbrella: Umbrella,
  "cloud-lightning": CloudLightning,
  "device-mobile": DeviceMobile,
} as const

function GoalIcon({ goal, className }: { goal: Pick<Goal, "icon" | "iconColor">; className?: string }) {
  const Icon = ICONS[goal.icon]
  return <Icon className={className} weight="fill" style={{ color: goal.iconColor }} />
}

export { GoalIcon }
