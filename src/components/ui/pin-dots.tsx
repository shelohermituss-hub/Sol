import { cn } from "@/lib/cn";

interface PinDotsProps {
  length?: number;
  filled: number;
}

export function PinDots({ length = 4, filled }: PinDotsProps) {
  return (
    <div className="flex gap-4" role="status" aria-label={`${filled} of ${length} digits entered`}>
      {Array.from({ length }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-4 w-4 rounded-full border-2",
            i < filled ? "border-cta-black bg-cta-black" : "border-border-input bg-transparent",
          )}
        />
      ))}
    </div>
  );
}
