import Link from "next/link"
import { CirclesThree, House, Plus, UserCircle, Wallet } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"

const TABS = [
  { href: "/dart/home", label: "Home", icon: House },
  { href: "/dart/circles", label: "Circles", icon: CirclesThree },
  { href: "/dart/payment", label: "Payment", icon: Wallet },
  { href: "/dart/profile", label: "Profile", icon: UserCircle },
] as const

// Barre d'onglets à 4 entrées + FAB central (flux Join). Même structure
// que BottomTabBar (app 1), étendue avec un bouton central — l'app 1 n'a
// que 2 onglets sans FAB, mais l'app 2 a réellement un point d'entrée
// central pour "Join" : fonctionnalité à conserver, habillée dans le
// style app 1 (cercle plein ink, icône Plus paper).
function DartTabBar({ active }: { active: (typeof TABS)[number]["href"] }) {
  const leftTabs = TABS.slice(0, 2)
  const rightTabs = TABS.slice(2)

  return (
    <nav className="relative flex items-center justify-around border-t border-neutral-200 bg-paper py-3">
      {leftTabs.map((tab) => (
        <DartTab key={tab.href} tab={tab} isActive={tab.href === active} />
      ))}

      <Link
        href="/dart/join"
        aria-label="Join a circle"
        className="absolute left-1/2 -top-6 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-ink text-paper shadow-lg"
      >
        <Plus className="size-6" />
      </Link>

      {rightTabs.map((tab) => (
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
