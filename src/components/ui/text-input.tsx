import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextInput({ label, id, className, ...props }: TextInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-base font-semibold text-text-primary">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "h-16 w-full rounded-2xl border border-border-input bg-bg-card px-5 text-lg text-text-primary placeholder:text-text-secondary focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
