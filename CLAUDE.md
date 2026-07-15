# CLAUDE.md — Règles du projet (reproduction Figma pixel-perfect)

## Objectif
Reproduire fidèlement l'application dont le design se trouve dans :
- Le fichier Figma lié (via MCP Figma)
- Les screenshots de référence dans `./design-refs/`

La fidélité visuelle est LA priorité n°1. Chaque écart de couleur, d'espacement
ou de typographie est un bug.

## Stack imposée
- Next.js 15+ (App Router, `src/` directory)
- TypeScript strict
- Tailwind CSS (tokens personnalisés extraits du Figma)
- Aucune librairie de composants UI externe (pas de MUI/AntD/Chakra)
- lucide-react autorisé UNIQUEMENT si les icônes du design correspondent ;
  sinon exporter les vraies icônes SVG depuis Figma

## Structure du projet
```
src/
  app/                  # routes (App Router)
  components/
    ui/                 # composants de base réutilisables (Button, Card, Input...)
    layout/             # Navbar, Footer, Sidebar...
    sections/           # sections spécifiques aux pages
  lib/                  # utilitaires
  styles/
    design-tokens.md    # documentation des tokens extraits du Figma
design-refs/            # screenshots de référence (NE PAS MODIFIER)
INVENTAIRE.md           # inventaire des écrans et composants + avancement
```

## Workflow obligatoire
1. Toujours extraire les valeurs exactes du Figma (MCP) avant de coder — jamais d'approximation.
2. Un composant/une page à la fois. Comparer visuellement avec la référence avant de continuer.
3. Mettre à jour `INVENTAIRE.md` (statut : ⬜ à faire / 🟡 en cours / ✅ validé) après chaque étape.
4. Commit git après chaque page validée, message clair en français.
5. `npm run build` doit passer avant tout commit.

## Règles visuelles
- Couleurs : uniquement celles définies dans les tokens Tailwind (jamais de hex en dur dans les composants).
- Espacements : utiliser l'échelle extraite du Figma.
- Polices : charger via `next/font` les familles exactes du design.
- Images/assets : télécharger depuis Figma (`download_assets`) dans `public/`, optimiser avec `next/image`.
- Responsive : mobile-first ; vérifier 375px / 768px / 1440px.

## Règles de code
- Composants fonctionnels, props typées, pas de `any`.
- Composants serveur par défaut ; `"use client"` seulement si nécessaire (état, événements).
- Nommage des fichiers : kebab-case ; composants : PascalCase.
- Pas de logique métier dans les composants UI — présentation uniquement.

## En cas de doute
- Info manquante dans le Figma → vérifier les screenshots.
- Manquante dans les deux → POSER LA QUESTION à l'utilisateur, ne pas inventer.
