"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, CreditCard, CurrencyDollar, MagnifyingGlass, ClockCounterClockwise } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/", label: "Home", Icon: House },
  { href: "/card", label: "Card", Icon: CreditCard },
  { href: "/pay", label: "Pay", Icon: CurrencyDollar },
  { href: "/search", label: "Search", Icon: MagnifyingGlass },
  { href: "/activity", label: "Activity", Icon: ClockCounterClockwise },
] as const;

interface BottomTabBarProps {
  theme?: "light" | "green";
}

export function BottomTabBar({ theme = "light" }: BottomTabBarProps) {
  const pathname = usePathname();
  const isGreen = theme === "green";

  return (
    <nav
      className={cn(
        "flex h-16 items-center justify-around border-t md:h-full md:w-20 md:flex-col md:justify-start md:gap-8 md:border-t-0 md:border-r md:pt-8",
        isGreen ? "border-white/20" : "border-bg-page-alt bg-bg-card",
      )}
      style={isGreen ? { backgroundColor: "var(--color-brand-green-surface)" } : undefined}
    >
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center justify-center",
              isGreen
                ? active
                  ? "text-white"
                  : "text-white/60"
                : active
                  ? "text-text-primary"
                  : "text-border-input",
            )}
          >
            <Icon size={24} weight={active ? "fill" : "regular"} />
          </Link>
        );
      })}
    </nav>
  );
}
