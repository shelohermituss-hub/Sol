import type { ReactNode } from "react";

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
      {right ?? <ChevronRightIcon />}
    </Tag>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" className="text-border-input">
      <path d="M1 1l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
