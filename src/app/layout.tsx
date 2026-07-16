import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoalsProvider } from "@/lib/goals-context";

// Police : diagnostic visuel à partir des screenshots (pas de fichier de
// police fourni) — Poppins pour les titres, Inter pour le corps de texte.
// Voir src/styles/design-tokens.md, section Typographie, pour le détail du
// diagnostic et les instructions de remplacement si un brand book officiel
// devient disponible.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sol",
  description: "Reproduction pixel-perfect à partir du design Figma / des screenshots de référence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", poppins.variable, inter.variable)}>
      <body className="min-h-full flex flex-col">
        <GoalsProvider>{children}</GoalsProvider>
      </body>
    </html>
  );
}
