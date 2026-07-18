import Link from "next/link"
import { Bell, UserCircle } from "@phosphor-icons/react/ssr"

// En-tête commun aux onglets du reskin Sòlid. Wordmark à gauche + cloche de
// notifications et avatar (placeholder générique, pas de photo inventée) à
// droite — cf. design-refs/2023-community/Home.png (wordmark + avatar rond).
function DartHeader() {
  return (
    <div className="flex items-center justify-between">
      <span className="font-heading text-[24px] font-bold text-ink">Sòlid</span>
      <div className="flex items-center gap-4">
        <Bell className="size-6 text-ink" />
        <Link href="/dart/profile" aria-label="Profile" className="text-ink">
          <UserCircle className="size-8" />
        </Link>
      </div>
    </div>
  )
}

export { DartHeader }
