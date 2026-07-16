// Données de démonstration pour les buts d'épargne Set & Save — partagées
// entre l'onglet Home et l'onglet Set & Save (même compte, même liste).
// Cf. design-refs/Oportun_iOS_Home/, Oportun_iOS_Set__save/
export interface Goal {
  id: string
  name: string
  icon: "umbrella" | "cloud-lightning" | "device-mobile"
  iconColor: string
  amount: number
  dueDate?: string
  isNew?: boolean
  recurring?: boolean
}

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

export const TOTAL_SAVED = GOALS.reduce((sum, g) => sum + g.amount, 0)
