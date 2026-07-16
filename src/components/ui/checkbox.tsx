interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-4 py-3 text-left">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
        style={
          checked
            ? { backgroundColor: "var(--color-brand-green)", borderColor: "var(--color-brand-green)" }
            : { borderColor: "var(--color-border-input)" }
        }
      >
        {checked && (
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true">
            <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-lg font-semibold text-text-primary">{label}</span>
    </button>
  );
}
