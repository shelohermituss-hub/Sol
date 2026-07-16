import type { ReactNode } from "react";
import { CheckCircle } from "@phosphor-icons/react/ssr";

interface SuccessStateProps {
  title: ReactNode;
  children?: ReactNode;
}

export function SuccessState({ title, children }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <CheckCircle size={64} weight="light" style={{ color: "var(--color-brand-green)" }} />
      <p className="text-2xl font-bold text-text-primary">{title}</p>
      {children}
    </div>
  );
}
