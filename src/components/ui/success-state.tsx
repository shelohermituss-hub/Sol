import type { ReactNode } from "react";

interface SuccessStateProps {
  title: ReactNode;
  children?: ReactNode;
}

export function SuccessState({ title, children }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <CheckCircleIcon />
      <p className="text-2xl font-bold text-text-primary">{title}</p>
      {children}
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="var(--color-brand-green)" strokeWidth="3" />
      <path
        d="M20 33l8 8 16-18"
        stroke="var(--color-brand-green)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
