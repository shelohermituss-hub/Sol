"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type OtpInputProps = {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

// Saisie de code OTP : 6 cases individuelles, la case active a une bordure
// noire, les autres restent gris clair (écrans "Enter code").
function OtpInput({ length = 6, value, onChange, disabled }: OtpInputProps) {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])
  const digits = React.useMemo(
    () => Array.from({ length }, (_, i) => value[i] ?? ""),
    [value, length]
  )

  function setDigit(index: number, digit: string) {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join(""))
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1)
    setDigit(index, digit)
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    if (!pasted) return
    e.preventDefault()
    onChange(pasted)
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className="flex gap-2">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          inputMode="numeric"
          maxLength={1}
          className={cn(
            "size-12 rounded-input border text-center text-xl font-semibold text-ink outline-none transition-colors",
            digit ? "border-brand-primary" : "border-neutral-200",
            "focus:border-brand-primary disabled:opacity-50"
          )}
        />
      ))}
    </div>
  )
}

export { OtpInput }
