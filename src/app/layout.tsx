import type { Metadata } from "next";
import "./globals.css";

// Police : pile système en attendant la confirmation de la police exacte via
// Figma (get_variable_defs / inspection des text nodes) — voir
// src/styles/design-tokens.md, section Typographie.

export const metadata: Metadata = {
  title: "Cash App (reproduction)",
  description: "Reproduction pixel-perfect à partir du design Figma / des screenshots de référence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
