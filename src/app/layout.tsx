import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { DartProvider } from "@/lib/dart-context";

// Police unifiée sur Inter (titres et corps) — cf. CLAUDE.md, exception #2
// et src/styles/design-tokens.md, section Typographie : Poppins retiré,
// rendu plus proche de Cash Sans (police Cash App, non disponible
// publiquement) et moins "gros" en graisse bold.
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
    <html lang="en" className={cn("h-full antialiased", inter.variable)}>
      <body className="min-h-full flex flex-col">
        <DartProvider>{children}</DartProvider>
      </body>
    </html>
  );
}
