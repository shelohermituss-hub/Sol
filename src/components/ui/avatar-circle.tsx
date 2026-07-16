import Image from "next/image";
import { cn } from "@/lib/cn";

interface AvatarCircleProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function AvatarCircle({ src, alt = "", size = 40, className }: AvatarCircleProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-full bg-pill-secondary-bg", className)}
      style={{ width: size, height: size }}
    >
      {src && <Image src={src} alt={alt} width={size} height={size} className="h-full w-full object-cover" />}
    </div>
  );
}
