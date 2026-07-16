import type { ReactNode } from "react";
import { CaretLeft, Question, X } from "@phosphor-icons/react/ssr";

interface HeaderProps {
  title?: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  onHelp?: () => void;
}

export function Header({ title, onBack, onClose, onHelp }: HeaderProps) {
  return (
    <div className="flex h-14 items-center justify-between">
      <div className="flex items-center gap-4">
        {onBack && (
          <button type="button" onClick={onBack} aria-label="Back" className="text-text-primary">
            <CaretLeft size={22} weight="bold" />
          </button>
        )}
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close" className="text-text-primary">
            <X size={20} weight="bold" />
          </button>
        )}
      </div>
      {title && <div className="text-lg font-bold text-text-primary">{title}</div>}
      <div>
        {onHelp && (
          <button type="button" onClick={onHelp} aria-label="Help" className="text-text-primary">
            <Question size={22} weight="bold" />
          </button>
        )}
      </div>
    </div>
  );
}
