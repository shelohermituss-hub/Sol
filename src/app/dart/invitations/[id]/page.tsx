"use client"

import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, UsersThree } from "@phosphor-icons/react/ssr"

import { NavHeader } from "@/components/layout/nav-header"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/currency"
import { useDart } from "@/lib/dart-context"
import { findInvitedCircleById } from "@/lib/dart-data"

// Étape intercalée entre CircleCard "Invited to you" et
// /dart/join/game-ya (cf. audit repo, point 5 : le modèle Dart
// marketplace n'avait qu'un "Join now" direct, aucune séparation entre
// consulter l'invitation et s'engager financièrement — incompatible avec
// le modèle fermé sur invitation, CLAUDE.md). "Accept" ne fait qu'ouvrir
// le flux de configuration du Sòl (aucune écriture financière ici :
// memberships/contributions ne sont créés qu'à la confirmation finale de
// Review, comme pour un join classique). "Decline" retire l'invitation
// sans jamais toucher au groupe lui-même (pas de table invitations côté
// schéma réel — cf. supabase/migrations, un membre non accepté n'a
// simplement pas de ligne memberships).
export default function InvitationDecisionPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { declineInvitation } = useDart()
  const circle = findInvitedCircleById(params.id)

  if (!circle) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
        <NavHeader
          leading={
            <button type="button" onClick={() => router.back()} aria-label="Back" className="text-ink">
              <ArrowLeft className="size-6" />
            </button>
          }
          title="Invitation"
        />
        <p className="mt-8 text-center text-[15px] text-neutral-500">
          This invitation is no longer available.
        </p>
        <div className="mt-auto pb-6">
          <Button className="w-full" variant="secondary" onClick={() => router.push("/dart/circles")}>
            Back to Circles
          </Button>
        </div>
      </div>
    )
  }

  function handleDecline() {
    declineInvitation(circle!.id)
    router.push("/dart/circles")
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={
          <button type="button" onClick={() => router.back()} aria-label="Back" className="text-ink">
            <ArrowLeft className="size-6" />
          </button>
        }
        title="Invitation"
      />

      <div className="mt-6 flex justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent-mint">
          <UsersThree className="size-8 text-brand-green" weight="fill" />
        </span>
      </div>

      <h1 className="mt-4 text-center font-heading text-[24px] font-bold text-ink">
        {circle.name ?? "Sòl Invitation"}
      </h1>
      {circle.organizerName && (
        <p className="mt-1 text-center text-[15px] text-neutral-500">
          Invited by <span className="font-bold text-ink">{circle.organizerName}</span>
        </p>
      )}

      <div className="mt-6 rounded-card border border-neutral-200 px-5">
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-[15px] text-neutral-500">Sòl amount</span>
          <span className="text-[15px] font-bold text-ink">{formatCurrency(circle.amount)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-[15px] text-neutral-500">Monthly pay-in</span>
          <span className="text-[15px] font-bold text-ink">{formatCurrency(circle.monthly)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-neutral-200 py-4">
          <span className="text-[15px] text-neutral-500">Duration</span>
          <span className="text-[15px] font-bold text-ink">{circle.totalMonths} months</span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-[15px] text-neutral-500">Admin fees</span>
          <span className="text-[15px] font-bold text-ink">{formatCurrency(circle.adminFees)}</span>
        </div>
      </div>

      <p className="mt-6 text-[13px] text-neutral-500">
        Reviewing this invitation does not commit you to anything. Accepting takes you to choose your payout amount
        and monthly pay-in — you are not charged until you confirm on the Review step.
      </p>

      <div className="mt-auto flex flex-col gap-3 pb-6">
        <Button
          className="w-full"
          nativeButton={false}
          render={<Link href={`/dart/join/game-ya?amount=${circle.amount}`} />}
        >
          Accept &amp; continue
        </Button>
        <Button className="w-full" variant="secondary" onClick={handleDecline}>
          Decline invitation
        </Button>
      </div>
    </div>
  )
}
