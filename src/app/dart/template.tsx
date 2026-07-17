import type { ReactNode } from "react"

// Fondu d'entrée à chaque navigation entre écrans /dart/* — demande
// explicite ("ajoute des animations et des transitions pour fluidifier
// l'application"). `template.tsx` (contrairement à layout.tsx) remonte à
// chaque changement de route, ce qui rejoue l'animation à chaque
// navigation plutôt qu'une seule fois au premier chargement — c'est le
// mécanisme prévu par Next.js pour ce cas d'usage, appliqué ici une seule
// fois plutôt que sur chacun des ~30 écrans individuellement.
//
// `animate-dart-fade-in` (keyframe opacity pure, cf. globals.css) plutôt
// que l'utilitaire `animate-in fade-in` de tw-animate-css : ce dernier
// s'appuie sur un unique keyframe partagé `enter` qui anime aussi
// `transform` (translate3d/scale3d), même figé à sa valeur identité
// quand seul `fade-in` est demandé. Un `transform` animé sur un ancêtre
// — même sans mouvement visible — crée un nouveau containing block et
// casse `position: sticky`/`fixed` sur tous ses descendants, ce qui
// désactivait le header et la tab bar fixés à chaque navigation.
export default function DartTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-dart-fade-in">{children}</div>
}
