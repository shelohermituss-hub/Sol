import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface ShortcutCardProps {
  label: string;
  href?: string;
  children: ReactNode;
}

export function ShortcutCard({ label, href, children }: ShortcutCardProps) {
  const content = (
    <Card className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-text-primary">{label}</span>
        <ChevronRightIcon />
      </div>
      {children}
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true" className="text-border-input">
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
