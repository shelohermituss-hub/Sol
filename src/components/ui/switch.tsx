interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

// Toggle "On/Off" en pilule bordée — cf. design-refs/07-profile-settings/security-privacy.png
// (Security Lock), différent d'un switch iOS classique.
export function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="rounded-full border px-4 py-1 text-sm font-semibold"
      style={
        checked
          ? { borderColor: "var(--color-brand-green)", color: "var(--color-brand-green)" }
          : { borderColor: "var(--color-border-input)", color: "var(--color-text-secondary)" }
      }
    >
      {checked ? "On" : "Off"}
    </button>
  );
}
