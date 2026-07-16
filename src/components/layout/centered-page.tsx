import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CenteredPageProps {
  children: ReactNode;
  bgClassName?: string;
}

// Coquille pour les écrans "détail"/formulaire hors flow Onboarding (Profile,
// Add Cash, Pay details) : pleine largeur en mobile, carte centrée sur fond
// neutre à partir de md — même traitement que OnboardingShell, faute de
// référence desktop (cf. AUDIT.md).
export function CenteredPage({ children, bgClassName = "bg-bg-page" }: CenteredPageProps) {
  return (
    <div className={cn("flex min-h-dvh flex-col md:items-center md:justify-center md:bg-bg-page md:py-10", bgClassName)}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-4 md:flex-none md:rounded-3xl md:px-10 md:py-8 md:shadow-sm",
          bgClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
