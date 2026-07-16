"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SuccessState } from "@/components/ui/success-state";

// Écran 1.12 — Welcome to Cash App! Cf. design-refs/01-onboarding/20-welcome-success.png
// Redirige ensuite vers Home (module 3, pas encore construit).
export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-card px-6">
      <SuccessState title="Welcome to Cash App!" />
    </div>
  );
}
