"use client"

import Link from "next/link"
import { CreditCard, PencilSimple, Plus, Trash, Wallet } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDart } from "@/lib/dart-context"

// Gestion des cartes enregistrées. Cf. app-cible/Payment/Payment Settings/
// Saved Cards.png et Saved Cards(Empty).png. Logos de marque (Visa,
// Mastercard) non reproduits (marques déposées, même règle que le logo
// Bank of America côté Oportun) — icône générique + libellé texte.
export default function SavedCardsPage() {
  const { savedCards, removeSavedCard, setDefaultCard } = useDart()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/payment/settings" />} title="Saved Cards" />

      {savedCards.length > 0 ? (
        <>
          <h1 className="mt-4 font-heading text-[20px] font-bold text-ink">Save Cards</h1>
          <RadioGroup value={savedCards.find((c) => c.isDefault)?.id} onValueChange={(v) => setDefaultCard(v as string)} className="mt-3">
            {savedCards.map((card) => (
              <div key={card.id} className="flex items-center gap-3 border-b border-neutral-200 py-4">
                <RadioGroupItem value={card.id} />
                <CreditCard className="size-6 shrink-0 text-ink" />
                <span className="flex-1 text-[15px] text-ink">
                  <span className="font-bold capitalize">{card.brand}</span> •••• {card.last4}
                </span>
                <button type="button" aria-label="Edit card" className="text-ink">
                  <PencilSimple className="size-5" />
                </button>
                <button type="button" aria-label="Delete card" onClick={() => removeSavedCard(card.id)} className="text-ink">
                  <Trash className="size-5" />
                </button>
              </div>
            ))}
          </RadioGroup>
        </>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-neutral-200/50">
            <Wallet className="size-10 text-ink" />
          </span>
          <p className="mt-4 font-heading text-[17px] font-bold text-ink">There are no saved cards</p>
          <p className="mt-1 text-[15px] text-neutral-500">
            You can add new cards now or save your card information for future payments.
          </p>
        </div>
      )}

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Add New</h2>
      <Link
        href="/dart/payment/settings/saved-cards/add"
        className="mt-3 flex items-center gap-3 border-b border-neutral-200 py-4"
      >
        <Plus className="size-5 text-ink" />
        <span className="flex-1 text-[15px] font-bold text-ink">Add Card</span>
        <span className="text-[13px] text-neutral-500">Visa, Mastercard, Amex</span>
      </Link>
    </div>
  )
}
