import type { ReactNode } from "react";

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
          <button type="button" onClick={onBack} aria-label="Back" className="text-2xl text-text-primary">
            <ChevronLeftIcon />
          </button>
        )}
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close" className="text-2xl text-text-primary">
            <CloseIcon />
          </button>
        )}
      </div>
      {title && <div className="text-lg font-bold text-text-primary">{title}</div>}
      <div>
        {onHelp && (
          <button type="button" onClick={onHelp} aria-label="Help" className="text-2xl font-bold text-text-primary">
            ?
          </button>
        )}
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 12l10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
