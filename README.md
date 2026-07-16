# Sol — reproduction Cash App (pixel-perfect)

Reproduction en Next.js d'une application de type Cash App, à partir de
screenshots de référence et d'un fichier Figma. Voir `CLAUDE.md` pour les
règles du projet, `INVENTAIRE.md` pour l'état d'avancement écran par écran, et
`AUDIT.md` pour l'historique des audits/correctifs.

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
    layout/              # Header/nav globaux (BottomTabBar, OnboardingShell)
    sections/            # composants spécifiques à un module (Home, Stocks...)
  lib/                   # utilitaires (cn, hooks de saisie, données de démo)
  styles/
    design-tokens.md     # documentation des tokens de couleur/typo/espacement
design-refs/              # screenshots de référence (NE PAS MODIFIER)
```

## Modules construits
Onboarding, Home, Pay, Add Cash, Stocks, Profile/Settings — voir
`INVENTAIRE.md` pour le détail écran par écran et les écarts connus.

## Stack
Next.js (App Router), TypeScript strict, Tailwind CSS, `@phosphor-icons/react`.
