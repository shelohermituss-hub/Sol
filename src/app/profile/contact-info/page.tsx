"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { SuccessBanner } from "@/components/ui/success-banner"
import { useProfile } from "@/lib/profile-context"

// Détail des infos de contact. Cf. design-refs/
// Oportun_iOS_Contact_information/Oportun iOS Contact information 1.png et
// Oportun_iOS_Changing_an_email_/Oportun iOS Changing an email  4-5.png
// (bandeau de succès après changement d'email, ?updated=1). "Change" sur
// Phone n'a pas d'écran cible construit (pas de flux "Changing a phone"
// documenté), reste décoratif.
function ContactInfoContent() {
  const params = useSearchParams()
  const updated = params.get("updated") === "1"
  const { fullName, phone, email } = useProfile()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/profile" />} title="Contact info" />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">Contact info</h1>

      {updated && <SuccessBanner className="mt-4">Your email has been successfully updated</SuccessBanner>}

      <div className="mt-6 border-b border-neutral-200 pb-4">
        <p className="text-[15px] text-neutral-500">Full Name</p>
        <p className="mt-1 text-[17px] text-ink">{fullName}</p>
      </div>

      <div className="flex items-center justify-between border-b border-neutral-200 py-4">
        <span>
          <span className="block text-[15px] text-neutral-500">Phone</span>
          <span className="mt-1 block text-[17px] text-ink">{phone}</span>
        </span>
        <span className="text-[17px] font-bold text-brand-green">Change</span>
      </div>

      <div className="flex items-center justify-between border-b border-neutral-200 py-4">
        <span>
          <span className="block text-[15px] text-neutral-500">Email</span>
          <span className="mt-1 block text-[17px] text-ink">{email}</span>
        </span>
        <Link href="/profile/contact-info/change-email" className="text-[17px] font-bold text-brand-green">
          Change
        </Link>
      </div>

      <p className="mt-6 text-[15px] text-neutral-500">
        If you misspelled your name, need to update it or are having issues changing your phone or email, please
        reach out to our support team.
      </p>
      <p className="mt-4 text-[15px] font-bold text-brand-green">help@oportun.com</p>
    </div>
  )
}

export default function ContactInfoPage() {
  return (
    <Suspense fallback={null}>
      <ContactInfoContent />
    </Suspense>
  )
}
