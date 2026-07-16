import type { ReactNode } from "react";
import { CaretRight } from "@phosphor-icons/react/ssr";

interface ListRowProps {
  icon?: ReactNode;
  label: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
}

export function ListRow({ icon, label, right, onClick }: ListRowProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-bg-page-alt py-4 text-left"
    >
      {icon && <span className="text-text-primary">{icon}</span>}
      <span className="flex-1 text-lg font-semibold text-text-primary">{label}</span>
      {right ?? <CaretRight size={18} className="text-border-input" />}
    </Tag>
  );
}
