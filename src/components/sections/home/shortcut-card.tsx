import type { ReactNode } from "react";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/ssr";
import { Card } from "@/components/ui/card";

interface ShortcutCardProps {
  label: string;
  href?: string;
  children: ReactNode;
}

export function ShortcutCard({ label, href, children }: ShortcutCardProps) {
  const content = (
    <Card className="flex h-full flex-col gap-3">
      <div className="flex items-start justify-between gap-1">
        <span className="text-base font-bold text-text-primary sm:text-lg">{label}</span>
        <CaretRight size={16} className="mt-1 shrink-0 text-border-input" />
      </div>
      {children}
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
