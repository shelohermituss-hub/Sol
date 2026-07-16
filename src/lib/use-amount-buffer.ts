"use client";

import { useState } from "react";

// Buffer de saisie pour les écrans "montant" (Pay, Add Cash) : accumule des
// chiffres et au plus un point décimal, affichés préfixés par "$".
export function useAmountBuffer(initial = "") {
  const [buffer, setBuffer] = useState(initial);

  function onDigit(digit: string) {
    if (digit === "." && buffer.includes(".")) return;
    setBuffer((b) => b + digit);
  }

  function onBackspace() {
    setBuffer((b) => b.slice(0, -1));
  }

  return { buffer, display: `$${buffer || "0"}`, onDigit, onBackspace };
}
