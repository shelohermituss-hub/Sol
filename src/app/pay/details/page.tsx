"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, CaretDown, Check } from "@phosphor-icons/react/ssr";
import { CenteredPage } from "@/components/layout/centered-page";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { cn } from "@/lib/cn";

const SUGGESTED_CONTACTS = [
  { name: "Jay Z", cashtag: "$sc" },
  { name: "Diego", cashtag: "$dm" },
  { name: "Sandy G.", cashtag: "$sandy" },
];

const SEND_AS_OPTIONS = ["Cash", "Gift Card", "Stock"] as const;

// Écran 4.2 — Détails paiement. Cf. design-refs/04-pay/payment-details-recipient.png
// Note : aucune capture de référence pour l'écran "paiement envoyé" — le bouton
// "Pay" en haut à droite reste donc un no-op documenté dans INVENTAIRE.md.
function PaymentDetailsForm() {
  const router = useRouter();
  const amount = useSearchParams().get("amount") ?? "0";
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [sendAs, setSendAs] = useState<(typeof SEND_AS_OPTIONS)[number]>("Cash");
  const [selectedContact, setSelectedContact] = useState(SUGGESTED_CONTACTS[0].cashtag);

  return (
    <CenteredPage bgClassName="bg-bg-card">
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={() => router.back()} aria-label="Close" className="shrink-0 text-text-primary">
          <X size={20} weight="bold" />
        </button>
        <span className="flex items-center gap-1 whitespace-nowrap text-base font-bold text-text-primary sm:text-lg">
          ${amount} Bank of America
          <CaretDown size={14} />
        </span>
        <button
          type="button"
          className="shrink-0 rounded-full bg-cta-black px-4 py-1.5 text-sm font-bold text-white"
        >
          Pay
        </button>
      </div>

      <div className="mt-6 border-b border-bg-page-alt pb-3">
        <label className="flex items-center gap-3 text-lg">
          <span className="text-text-secondary">To</span>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Name, $Cashtag, Phone, Email"
            className="flex-1 text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </label>
      </div>

      <div className="border-b border-bg-page-alt py-3">
        <label className="flex items-center gap-3 text-lg">
          <span className="text-text-secondary">For</span>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note"
            className="flex-1 text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 py-4">
        <span className="text-lg text-text-secondary">Send as</span>
        {SEND_AS_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSendAs(option)}
            className={cn(
              "flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold",
              sendAs === option ? "text-white" : "bg-bg-page text-text-primary",
            )}
            style={sendAs === option ? { backgroundColor: "var(--color-brand-green)" } : undefined}
          >
            {option}
            {option !== "Cash" && <CaretDown size={12} />}
          </button>
        ))}
      </div>

      <p className="mt-2 text-sm font-bold uppercase text-text-secondary">Suggested</p>
      <div className="mt-2 flex flex-col">
        {SUGGESTED_CONTACTS.map((contact) => {
          const selected = selectedContact === contact.cashtag;
          return (
            <button
              key={contact.cashtag}
              type="button"
              onClick={() => setSelectedContact(contact.cashtag)}
              className="flex items-center gap-4 border-b border-bg-page-alt py-3 text-left"
            >
              <AvatarCircle size={40} />
              <div className="flex-1">
                <p className="font-semibold text-text-primary">{contact.name}</p>
                <p className="text-sm text-text-secondary">{contact.cashtag}</p>
              </div>
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border",
                  selected ? "border-transparent text-white" : "border-border-input",
                )}
                style={selected ? { backgroundColor: "var(--color-brand-green)" } : undefined}
              >
                {selected && <Check size={14} weight="bold" color="white" />}
              </span>
            </button>
          );
        })}
      </div>
    </CenteredPage>
  );
}

export default function PaymentDetailsPage() {
  return (
    <Suspense>
      <PaymentDetailsForm />
    </Suspense>
  );
}
