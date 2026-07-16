import type { ReactNode } from "react";

interface OnboardingShellProps {
  header?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
}

// Structure commune à tous les écrans du module Onboarding : header optionnel
// (back/close/help), titre, contenu scrollable, CTA ancrés en bas.
export function OnboardingShell({
  header,
  title,
  subtitle,
  children,
  footer,
  contentClassName,
}: OnboardingShellProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-card px-6 pt-4">
      {header}
      {(title || subtitle) && (
        <div className="mt-6">
          {title && <h1 className="text-3xl font-extrabold leading-tight text-text-primary">{title}</h1>}
          {subtitle && <p className="mt-3 text-lg text-text-secondary">{subtitle}</p>}
        </div>
      )}
      <div className={`mt-6 flex-1 ${contentClassName ?? ""}`}>{children}</div>
      {footer && <div className="flex flex-col gap-3 py-6">{footer}</div>}
    </div>
  );
}
