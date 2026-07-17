import { Bell, Fire } from "@phosphor-icons/react/ssr"

// En-tête commun aux 4 onglets du reskin Dart. Wordmark "Dart" recomposé
// dans la typographie de l'app 1 (font-heading/Poppins, encre noire) —
// jamais le script cursif bleu de l'app 2, cf. RÈGLE D'OR.
//
// Fixe en haut d'écran (sticky) pendant le scroll — cf. demande explicite
// "fixe le header". Même logique que NavHeader : `-mx-6 px-6` casse le
// padding horizontal du conteneur (px-6, constant sur les 4 onglets),
// `pt-3 pb-2` porté par le header pour une respiration correcte une fois
// "collé" en haut.
function DartHeader() {
  return (
    <div className="sticky top-0 z-20 -mx-6 flex items-center justify-between bg-canvas px-6 pt-3 pb-2">
      <span className="font-heading text-[24px] font-bold text-ink">Sòlid</span>
      <div className="flex items-center gap-4">
        <Fire className="size-6 text-ink" />
        <Bell className="size-6 text-ink" />
      </div>
    </div>
  )
}

export { DartHeader }
