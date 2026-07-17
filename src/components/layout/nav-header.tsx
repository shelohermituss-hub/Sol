import * as React from "react"
import Link from "next/link"
import { ArrowLeft, X } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

// En-tête de navigation : trois variantes observées dans les captures —
// flèche retour (+ titre centré optionnel), croix de fermeture (modales
// plein écran), et emplacement trailing libre (lien "Cancel", icône
// réglages, icône aide "?"). Purement présentationnel : la navigation
// (href/onClick) est fournie par la page appelante.
//
// Fixe en haut d'écran (sticky) pendant le scroll — cf. demande explicite
// "fixe le header". `-mx-6 px-6` casse le padding horizontal du
// conteneur page (px-6, appliqué de façon constante sur tous les écrans
// utilisant NavHeader) pour un fond plein écran ; `pt-3` est porté par le
// header lui-même plutôt que par le conteneur parent, pour garder une
// respiration correcte une fois "collé" en haut (un padding parent
// disparaît visuellement une fois l'élément sticky).
function NavHeader({
  leading,
  title,
  trailing,
  className,
}: {
  leading?: React.ReactNode
  title?: React.ReactNode
  trailing?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("sticky top-0 z-20 -mx-6 flex min-h-14 items-center justify-between bg-canvas px-6 pt-3 pb-1", className)}>
      <div className="flex w-14 items-center">{leading}</div>
      {title && <div className="flex-1 text-center font-heading text-[17px] font-bold text-ink">{title}</div>}
      {!title && <div className="flex-1" />}
      <div className="flex w-14 items-center justify-end">{trailing}</div>
    </div>
  )
}

function NavBackButton({ href }: { href: string }) {
  return (
    <Link href={href} aria-label="Back" className="text-ink">
      <ArrowLeft className="size-6" />
    </Link>
  )
}

function NavCloseButton({ href }: { href: string }) {
  return (
    <Link href={href} aria-label="Close" className="text-ink">
      <X className="size-6" />
    </Link>
  )
}

function CancelLink({ href }: { href: string }) {
  return (
    <Link href={href} className="text-[17px] font-medium text-brand-green">
      Cancel
    </Link>
  )
}

export { NavHeader, NavBackButton, NavCloseButton, CancelLink }
