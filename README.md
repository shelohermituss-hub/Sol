# Sol — reproduction pixel-perfect (Figma)

Reproduction en Next.js d'une application, à partir de screenshots de
référence et/ou d'un fichier Figma. Voir `CLAUDE.md` pour les règles et le
workflow du projet.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                  # routes (App Router) — un dossier par module
  components/
    ui/                 # composants de base (Button, Card, Input...)
    layout/              # Header/nav globaux
    sections/            # composants spécifiques à un module/écran
  lib/                   # utilitaires
  styles/
    design-tokens.md     # documentation des tokens de couleur/typo/espacement
design-refs/              # screenshots de référence (NE PAS MODIFIER)
INVENTAIRE.md              # inventaire des écrans + avancement (créé au démarrage du projet)
```

## Stack
Next.js (App Router), TypeScript strict, Tailwind CSS.
