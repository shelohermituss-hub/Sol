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

  // Montant "propre" (sans point final orphelin) et validité (> 0).
  const cleanBuffer = buffer.endsWith(".") ? buffer.slice(0, -1) : buffer;
  const numericValue = parseFloat(cleanBuffer || "0");
  const isValid = numericValue > 0;

  return { buffer: cleanBuffer, display: `$${buffer || "0"}`, isValid, onDigit, onBackspace };
}
