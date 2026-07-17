"use client"

import Link from "next/link"
import Image from "next/image"
import { CaretRight, PiggyBank } from "@phosphor-icons/react/ssr"

import { DartHeader } from "@/components/layout/dart-header"
import { DartTabBar } from "@/components/layout/dart-tab-bar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircleCard } from "@/components/sections/circle-card"
import { CategoryCard } from "@/components/sections/category-card"
import { Sparkline } from "@/components/sections/sparkline"
import { formatCurrency } from "@/lib/currency"
import { useDart } from "@/lib/dart-context"
import { EXCHANGE_RATE, INVITED_CIRCLES } from "@/lib/dart-data"

// Onglet Home, restylé façon Cash App (style visuel demandé
// explicitement par l'utilisateur — cf. la carte Cash Balance ci-dessous
// et la grille 4 cartes, à la place du carrousel "Latest Offers" + de la
// bannière "Send an invitation" et des 2 cartes "Popular Goals"
// d'origine). "Invited to you" reste juste après le solde, inchangé sur
// le fond (source de données/contenu) — seul repositionné.
export default function DartHomePage() {
  const { declinedInvitationIds, walletBalance } = useDart()
  const invitedCircles = INVITED_CIRCLES.filter((circle) => !declinedInvitationIds.includes(circle.id))

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex-1 px-6 pt-4">
        <DartHeader />

        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-[15px] text-neutral-500">Cash Balance</p>
            <Link href="/dart/profile/personal-info" className="flex items-center gap-1 text-[13px] text-neutral-500">
              MonCash Number <CaretRight className="size-3" />
            </Link>
          </div>
          <p className="font-heading text-[32px] font-bold text-ink">{formatCurrency(walletBalance)}</p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" nativeButton={false} render={<Link href="/dart/wallet/add-cash" />}>
              Add Cash
            </Button>
            <Button variant="secondary" className="flex-1" nativeButton={false} render={<Link href="/dart/wallet/cash-out" />}>
              Cash Out
            </Button>
          </div>
        </Card>

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Invited to you</h2>
        <div className="mt-3 flex flex-col gap-3">
          {invitedCircles.map((circle) => (
            <CircleCard key={circle.id} circle={circle} joinHref={`/dart/invitations/${circle.id}`} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <CategoryCard
            href="/dart/join/saving-program"
            title="Savings"
            subtitle="Up to 25% cashback"
            graphic={
              <span className="flex size-16 items-center justify-center rounded-full bg-accent-mint">
                <PiggyBank className="size-8 text-brand-green" weight="fill" />
              </span>
            }
          />
          <CategoryCard
            href="/dart/exchange-rate"
            title="Exchange Rate"
            subtitle={`1 USD = ${EXCHANGE_RATE.rate} HTG`}
            graphic={<Sparkline data={EXCHANGE_RATE.history} color="#7fc1e1" className="h-14 w-full" />}
          />
          <CategoryCard
            href="/dart/payment/settings/saved-cards"
            title="MonCash Card"
            subtitle="Manage your cards"
            graphic={
              <Image
                src="/images/illustrations/dart-debit-card-cover.svg"
                alt=""
                width={200}
                height={200}
                className="size-20"
              />
            }
          />
          <CategoryCard
            href="/dart/fees"
            title="Fees"
            subtitle="From 0.5%"
            graphic={
              <Image
                src="/images/illustrations/dart-fees-cover.svg"
                alt=""
                width={200}
                height={200}
                className="size-20"
              />
            }
          />
        </div>
      </div>

      <DartTabBar active="/dart/home" />
    </div>
  )
}
