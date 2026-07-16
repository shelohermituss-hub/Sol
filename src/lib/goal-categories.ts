import type { GoalIconKey } from "@/lib/goals-data"

export interface GoalCategory {
  id: string
  name: string
  icon: GoalIconKey
  iconColor: string
}

// Catégories de facture proposées à la création d'un but "Smart bill". Cf.
// design-refs/Oportun_iOS_Creating_a_goal_home/
// Oportun iOS Creating a goal (home) 2.png. Couleurs approximées par icône
// Phosphor unie (pas les illustrations plates multicolores de la capture).
export const GOAL_CATEGORIES: GoalCategory[] = [
  { id: "housing", name: "Housing", icon: "house", iconColor: "#D9A566" },
  { id: "utilities", name: "Utilities", icon: "lightbulb", iconColor: "#F5C518" },
  { id: "cell-phone", name: "Cell phone", icon: "device-mobile", iconColor: "#4A90D9" },
  { id: "personal-loan", name: "Personal loan", icon: "bank", iconColor: "#8C97A6" },
  { id: "car-insurance", name: "Car insurance", icon: "car", iconColor: "#E5484D" },
]

export const UNIQUE_GOAL_CATEGORY: GoalCategory = {
  id: "unique",
  name: "Create a unique goal",
  icon: "pencil",
  iconColor: "#D9A566",
}
