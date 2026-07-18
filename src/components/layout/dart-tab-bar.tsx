import Link from "next/link"
import { CirclesThree, House, PlusCircle, UserCircle, Wallet } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"

const TABS = [
  { href: "/dart/home", label: "Home", icon: House },
  { href: "/dart/circles", label: "Circles", icon: CirclesThree },
  { href: "/dart/join", label: "Join", icon: PlusCircle },
  { href: "/dart/payment", label: "Payment", icon: Wallet },
  { href: "/dart/profile", label: "Profile", icon: UserCircle },
] as const

// Barre d'onglets à 5 entrées, icônes plates (pas de FAB surélevé) — pattern
// design-refs/2023-community/Home.png (tab bar Cash App : 5 icônes à plat,
// active en ink plein, inactive en neutral-500). "Join" (rejoindre/créer un
// cercle) devient un onglet normal plutôt qu'un FAB flottant.
function DartTabBar({ active }: { active: (typeof TABS)[number]["href"] }) {
  return (
    <nav className="flex items-center justify-around border-t border-neutral-200 bg-paper py-3">
      {TABS.map((tab) => (
        <DartTab key={tab.href} tab={tab} isActive={tab.href === active} />
      ))}
    </nav>
  )
}

function DartTab({ tab, isActive }: { tab: (typeof TABS)[number]; isActive: boolean }) {
  const Icon = tab.icon
  return (
    <Link
      href={tab.href}
      className={cn("flex flex-col items-center gap-1 px-6 py-1", isActive ? "text-ink" : "text-neutral-500")}
    >
      <Icon className="size-6" weight={isActive ? "fill" : "regular"} />
      <span className={cn("text-xs", isActive && "font-bold")}>{tab.label}</span>
    </Link>
  )
}

export { DartTabBar }
