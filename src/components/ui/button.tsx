import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-cta-black text-white",
  secondary: "bg-pill-secondary-bg text-text-primary",
};

export function Button({
  variant = "primary",
  fullWidth = true,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "h-14 rounded-full px-6 text-lg font-semibold transition-opacity",
        fullWidth ? "w-full" : "",
        disabled ? "bg-disabled-bg text-white/70" : VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
