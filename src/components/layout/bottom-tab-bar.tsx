import * as React from "react"
import Link from "next/link"
import { House } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { SetAndSaveIcon } from "@/components/icons/set-and-save-icon"

const TABS = [
  { href: "/home", label: "Home" },
  { href: "/set-and-save", label: "Set & Save" },
] as const

function BottomTabBar({ active }: { active: "/home" | "/set-and-save" }) {
  return (
    <nav className="flex items-center justify-around border-t border-neutral-200 bg-paper py-3">
      {TABS.map((tab) => {
        const isActive = tab.href === active
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center gap-1 px-6 py-1",
              isActive ? "text-ink" : "text-neutral-500"
            )}
          >
            {tab.href === "/home" ? (
              <House className="size-6" weight={isActive ? "fill" : "regular"} />
            ) : (
              <SetAndSaveIcon className="size-6" weight={isActive ? "fill" : "regular"} />
            )}
            <span className={cn("text-xs", isActive && "font-bold")}>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export { BottomTabBar }
