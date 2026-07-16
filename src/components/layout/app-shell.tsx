import type { ReactNode } from "react";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { cn } from "@/lib/cn";

interface AppShellProps {
  children: ReactNode;
  tabBarTheme?: "light" | "green";
  bgClassName?: string;
  contentMaxWidth?: string;
}

// Coquille commune aux écrans "racine" (Home, Pay, Stocks, Profile) qui
// affichent la BottomTabBar. En dessous de md, comportement mobile inchangé
// (carte pleine largeur, tab bar en bas). À partir de md, la tab bar devient
// une barre latérale (cf. BottomTabBar) et le contenu s'élargit — traitement
// standard faute de référence desktop (cf. AUDIT.md).
export function AppShell({
  children,
  tabBarTheme = "light",
  bgClassName = "bg-bg-page",
  contentMaxWidth = "md:max-w-3xl",
}: AppShellProps) {
  return (
    <div className={cn("mx-auto flex min-h-dvh max-w-md flex-col md:max-w-none md:flex-row", bgClassName)}>
      <div className="flex-1 md:order-2 md:flex md:justify-center md:overflow-y-auto">
        <div className={cn("w-full md:px-10 md:py-8", contentMaxWidth)}>{children}</div>
      </div>
      <div className="order-last shrink-0 md:order-1">
        <BottomTabBar theme={tabBarTheme} />
      </div>
    </div>
  );
}
