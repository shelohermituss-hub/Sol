import { Bell, Fire } from "@phosphor-icons/react/ssr"

// En-tête commun aux 4 onglets du reskin Dart. Wordmark "Dart" recomposé
// dans la typographie de l'app 1 (font-heading/Poppins, encre noire) —
// jamais le script cursif bleu de l'app 2, cf. RÈGLE D'OR.
function DartHeader() {
  return (
    <div className="flex items-center justify-between">
      <span className="font-heading text-[24px] font-bold text-ink">Sòlid</span>
      <div className="flex items-center gap-4">
        <Fire className="size-6 text-ink" />
        <Bell className="size-6 text-ink" />
      </div>
    </div>
  )
}

export { DartHeader }
