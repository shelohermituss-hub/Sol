import { redirect } from "next/navigation"

// Racine de l'app : redirige vers l'Onboarding (splash), pour reproduire
// fidèlement un vrai premier lancement — pas d'accès direct à Home sans
// passer par Onboarding/Login. Le Home réel vit sur /home (cf.
// src/app/home/page.tsx).
export default function RootPage() {
  redirect("/onboarding")
}
