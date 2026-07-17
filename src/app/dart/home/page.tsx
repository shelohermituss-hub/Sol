"use client"

import Link from "next/link"
import { Backpack, Envelope, PiggyBank, Sparkle } from "@phosphor-icons/react/ssr"

import { DartHeader } from "@/components/layout/dart-header"
import { DartTabBar } from "@/components/layout/dart-tab-bar"
import { PromoCarousel } from "@/components/sections/promo-carousel"
import { CircleCard } from "@/components/sections/circle-card"
import { CategoryCard } from "@/components/sections/category-card"
import { formatCurrency } from "@/lib/currency"
import { useDart } from "@/lib/dart-context"
import { INVITED_CIRCLES } from "@/lib/dart-data"

// Onglet Home du reskin Sòlid. Cf. app-cible/Home.png (= Join.png, même
// écran). Bannière "Latest Offers" en carte pleine largeur (illustration
// en attente de génération Higgsfield, cf. ASSETS-A-REMPLACER.md — texte +
// fond marque en attendant). Catégorie "Popular Goals" #3 illisible sur la
// capture source, non reproduite (règle "ne pas inventer"). "Ramadan"
// remplacé par "Back to School" (cf. CLAUDE.md, modèle de confiance —
// choix documenté dans le résumé de la tâche, 2 autres options proposées).
export default function DartHomePage() {
  const { declinedInvitationIds } = useDart()
  const invitedCircles = INVITED_CIRCLES.filter((circle) => !declinedInvitationIds.includes(circle.id))

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex-1 px-6 pt-4">
        <DartHeader />

        <div className="mt-6">
          <PromoCarousel>
            {[
              <div key="offers" className="flex h-28 items-center justify-between rounded-card bg-accent-peach px-5">
                <div>
                  <p className="text-[13px] text-ink">Check Out Our</p>
                  <p className="font-heading text-[20px] font-bold text-ink">LATEST OFFERS</p>
                </div>
                <Sparkle className="size-10 text-ink" weight="fill" />
              </div>,
            ]}
          </PromoCarousel>
        </div>

        <Link
          href="/dart/profile/invite-friends"
          className="mt-4 flex items-center gap-3 rounded-card bg-brand-blue-tint px-4 py-4"
        >
          <Envelope className="size-6 shrink-0 text-ink" />
          <p className="flex-1 text-[15px] text-ink">
            Send an invitation to your friends and you&apos;ll both get a{" "}
            <span className="font-bold">{formatCurrency(150)}</span> discount.
          </p>
        </Link>

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Invited to you</h2>
        <div className="mt-3 flex flex-col gap-3">
          {invitedCircles.map((circle) => (
            <CircleCard key={circle.id} circle={circle} joinHref={`/dart/invitations/${circle.id}`} />
          ))}
        </div>

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Popular Goals</h2>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          <CategoryCard title="Savings" subtitle="20% Cashback" bgColor="#7fc1e1" icon={<PiggyBank className="size-6" weight="fill" />} />
          <CategoryCard title="Back to School" subtitle="Upto 25% Discount" bgColor="#ff8f75" icon={<Backpack className="size-6" weight="fill" />} />
        </div>
      </div>

      <DartTabBar active="/dart/home" />
    </div>
  )
}
