"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Écran 1.1 — Splash. Cf. design-refs/01-onboarding/00-splash.png
export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/onboarding/phone-email"), 1200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="flex min-h-dvh items-center justify-center"
      style={{ backgroundColor: "var(--color-brand-green-splash)" }}
    >
      <div className="flex h-32 w-32 items-center justify-center rounded-[28px] bg-cta-black">
        <span
          className="text-6xl font-extrabold"
          style={{ color: "var(--color-brand-green-splash)" }}
        >
          $
        </span>
      </div>
    </div>
  );
}
