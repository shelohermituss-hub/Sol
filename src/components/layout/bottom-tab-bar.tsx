"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/card", label: "Card", icon: CardIcon },
  { href: "/pay", label: "Pay", icon: DollarIcon },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/activity", label: "Activity", icon: ActivityIcon },
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
        "flex h-16 items-center justify-around border-t",
        isGreen ? "border-white/20" : "border-bg-page-alt bg-bg-card",
      )}
      style={isGreen ? { backgroundColor: "var(--color-brand-green-surface)" } : undefined}
    >
      {TABS.map(({ href, label, icon: Icon }) => {
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
            <Icon />
          </Link>
        );
      })}
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-9z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <text x="12" y="18" textAnchor="middle" fontSize="18" fontWeight="700" fill="currentColor">
        $
      </text>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
