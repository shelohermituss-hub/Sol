"use client"

import Link from "next/link"
import { Bell, CheckCircle, FilePlus } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { ListRow } from "@/components/ui/list-row"
import { ELIGIBILITY_ITEMS } from "@/lib/dart-data"

// Checklist des prérequis avant paiement. Cf. app-cible/
// Payment/Payment Eligibility.png. Réutilise ListRow étendu avec le prop
// `status` (cf. FONCTIONNEL.md, Étape 2) — pas de rouge, cohérent avec la
// règle déjà actée sur l'app 1. "Due Payments" a une mise en page propre
// dans la capture source (icône dédiée à gauche, coche verte à droite,
// pas le pattern `status` des autres lignes), reconstruite ici à la main.
export default function PaymentEligibilityPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/payment" />}
        title="Payment Eligibility"
        trailing={<Bell className="size-6 text-ink" />}
      />

      <h1 className="mt-4 font-heading text-[20px] font-bold text-ink">Make sure to correct the following:</h1>

      <div className="mt-4 flex flex-col gap-2">
        {ELIGIBILITY_ITEMS.map((item) => (
          <ListRow
            key={item.id}
            status={item.status}
            title={item.label}
            subtitle={item.description}
            showChevron={Boolean(item.href)}
            className="rounded-card border border-neutral-200 px-4"
            {...(item.href ? { render: <Link href={item.href} /> } : {})}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-neutral-200 pt-4">
        <FilePlus className="size-6 shrink-0 text-ink" />
        <span className="flex-1 font-heading text-[17px] font-bold text-ink">Due Payments</span>
        <CheckCircle className="size-6 shrink-0 text-brand-green" weight="fill" />
      </div>
    </div>
  )
}
