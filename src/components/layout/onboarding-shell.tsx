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
//
// Desktop (md+) : pas de référence design pour ces largeurs (toutes les
// captures sont des écrans iPhone) — traitement standard "carte centrée sur
// fond neutre" (comme la plupart des flows d'inscription/paiement sur le
// web), plutôt qu'une mise en page inventée à partir de rien.
export function OnboardingShell({
  header,
  title,
  subtitle,
  children,
  footer,
  contentClassName,
}: OnboardingShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-card md:items-center md:justify-center md:bg-bg-page md:py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-4 md:flex-none md:rounded-3xl md:bg-bg-card md:px-10 md:py-8 md:shadow-sm">
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
    </div>
  );
}
