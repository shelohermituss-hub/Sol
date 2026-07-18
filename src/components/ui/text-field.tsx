"use client"

import * as React from "react"
import { Eye, EyeSlash, X } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

type TextFieldProps = Omit<React.ComponentProps<"input">, "placeholder"> & {
  label: string
  /** Bouton "Change"/lien affiché à droite du label, à la place d'un input éditable (ex: Contact info). */
  trailingAction?: React.ReactNode
  /** Affiche un bouton "X" pour vider le champ quand il a une valeur (ex: montant, date). */
  clearable?: boolean
  onClear?: () => void
}

// Champ de saisie à label flottant (vide -> placeholder centré, rempli/focus
// -> légende réduite au-dessus de la valeur), pattern observé sur tous les
// formulaires de l'app (téléphone, email, mot de passe, nom de compte...).
function TextField({
  className,
  id,
  label,
  type = "text",
  trailingAction,
  clearable,
  onClear,
  disabled,
  ...props
}: TextFieldProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const isPassword = type === "password"
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <input
        id={inputId}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder=" "
        disabled={disabled}
        className={cn(
          "peer h-14 w-full rounded-input border border-neutral-200 bg-transparent px-4 pt-4 text-base text-ink outline-none transition-colors focus:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50",
          (isPassword || clearable || trailingAction) && "pr-12",
          className
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-base text-neutral-500 transition-all peer-focus:top-3.5 peer-focus:translate-y-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>

      {trailingAction && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2">{trailingAction}</div>
      )}

      {isPassword && !trailingAction && (
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-ink"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeSlash className="size-5" /> : <Eye className="size-5" />}
        </button>
      )}

      {clearable && !isPassword && !trailingAction && (
        <button
          type="button"
          onClick={onClear}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-ink"
          aria-label="Clear"
        >
          <X className="size-5" />
        </button>
      )}
    </div>
  )
}

export { TextField }
