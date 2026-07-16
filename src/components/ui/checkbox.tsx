import { Check } from "@phosphor-icons/react/ssr";

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
        {checked && <Check size={14} weight="bold" color="white" />}
      </span>
      <span className="text-lg font-semibold text-text-primary">{label}</span>
    </button>
  );
}
