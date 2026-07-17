import { redirect } from "next/navigation"

// Racine de l'app : Dart est l'application principale, redirige vers son
// splash (/dart, qui enchaîne lui-même sur /dart/welcome). L'app Oportun
// reste accessible directement via /onboarding pour qui a le lien.
export default function RootPage() {
  redirect("/dart")
}
