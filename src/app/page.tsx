import { redirect } from "next/navigation"

// Racine de l'app : redirige vers le splash (/dart, qui enchaîne
// lui-même sur /dart/welcome).
export default function RootPage() {
  redirect("/dart")
}
