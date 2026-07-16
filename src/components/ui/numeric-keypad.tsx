import { cn } from "@/lib/cn";

interface NumericKeypadProps {
  theme?: "light" | "green";
  showDecimal?: boolean;
  onDigit: (digit: string) => void;
  onBackspace: () => void;
}

const ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export function NumericKeypad({ theme = "light", showDecimal = false, onDigit, onBackspace }: NumericKeypadProps) {
  const textClass = theme === "green" ? "text-white" : "text-text-primary";

  return (
    <div className="grid grid-cols-3 gap-y-4 text-center">
      {ROWS.flat().map((digit) => (
        <button
          key={digit}
          type="button"
          onClick={() => onDigit(digit)}
          className={cn("py-3 text-3xl font-medium", textClass)}
        >
          {digit}
        </button>
      ))}
      <button
        type="button"
        onClick={() => showDecimal && onDigit(".")}
        className={cn("py-3 text-3xl font-medium", textClass, !showDecimal && "invisible")}
      >
        .
      </button>
      <button type="button" onClick={() => onDigit("0")} className={cn("py-3 text-3xl font-medium", textClass)}>
        0
      </button>
      <button
        type="button"
        onClick={onBackspace}
        aria-label="Backspace"
        className={cn("flex items-center justify-center py-3", textClass)}
      >
        <BackspaceIcon />
      </button>
    </div>
  );
}

function BackspaceIcon() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
      <path
        d="M9 1H24a1 1 0 011 1v16a1 1 0 01-1 1H9L1 10l8-9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13 6l7 8M20 6l-7 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
