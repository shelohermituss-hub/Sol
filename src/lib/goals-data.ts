// Données de démonstration pour les buts d'épargne Set & Save — partagées
// entre l'onglet Home et l'onglet Set & Save (même compte, même liste).
// Cf. design-refs/Oportun_iOS_Home/, Oportun_iOS_Set__save/
export type GoalIconKey =
  | "umbrella"
  | "cloud-lightning"
  | "device-mobile"
  | "house"
  | "lightbulb"
  | "car"
  | "bank"
  | "pencil"

export interface Goal {
  id: string
  name: string
  icon: GoalIconKey
  iconColor: string
  amount: number
  dueDate?: string
  isNew?: boolean
  recurring?: boolean
}

// Graine initiale de la liste de buts, partagée entre l'onglet Home et
// l'onglet Set & Save via GoalsProvider (src/lib/goals-context.tsx), qui
// tient l'état réel (ajout de but depuis le flux "Creating a goal").
export const GOALS: Goal[] = [
  { id: "rainy-day", name: "Rainy Day", icon: "umbrella", iconColor: "#8C81FF", amount: 1 },
  {
    id: "emergency-cushion",
    name: "Emergency cushion",
    icon: "cloud-lightning",
    iconColor: "#F5A623",
    amount: 0,
    dueDate: "Aug 10, 2026",
    isNew: true,
  },
  {
    id: "cell-phone",
    name: "Cell phone",
    icon: "device-mobile",
    iconColor: "#7FC1E1",
    amount: 2,
    dueDate: "Jun 15, 2026",
    isNew: true,
    recurring: true,
  },
]
