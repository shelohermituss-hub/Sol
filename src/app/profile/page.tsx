"use client"

import Link from "next/link"
import { CaretRight } from "@phosphor-icons/react/ssr"

import { NavHeader, NavCloseButton } from "@/components/layout/nav-header"

function SettingsRow({ label, href }: { label: string; href?: string }) {
  const content = (
    <>
      <span className="text-[17px] text-ink">{label}</span>
      <CaretRight className="size-5 shrink-0 text-ink" />
    </>
  )
  const className = "flex items-center justify-between border-b border-neutral-200 py-4"
  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}

// Menu profil & réglages, point d'entrée des flux "Contact information" et
// "Connected account detail"/"Removing an account". Cf. design-refs/
// Oportun_iOS_Contact_information/Oportun iOS Contact information 0.png.
// Seuls "Contact information" et "Connected accounts" mènent à un écran
// construit — le reste (Subscription, Notifications, Security, Link my
// loan, Set & Save statements, ACH & autopay agreements, Legal notices)
// n'est pas dans les 15 flows documentés, reste décoratif.
export default function ProfilePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4 pb-6">
      <NavHeader leading={<NavCloseButton href="/home" />} />

      <h1 className="mt-4 font-heading text-[32px] font-bold text-ink">Profile &amp; settings</h1>

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Settings</h2>
      <SettingsRow label="Contact information" href="/profile/contact-info" />
      <SettingsRow label="Subscription" />
      <SettingsRow label="Notifications" />
      <SettingsRow label="Security" />
      <SettingsRow label="Link my loan" />

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Funding &amp; payment</h2>
      <SettingsRow label="Connected accounts" href="/profile/connected-accounts" />

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Documents</h2>
      <SettingsRow label="Set & Save statements" />
      <SettingsRow label="ACH & autopay agreements" />
      <SettingsRow label="Legal notices" />

      <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Policies, terms &amp; disclosures</h2>
    </div>
  )
}
