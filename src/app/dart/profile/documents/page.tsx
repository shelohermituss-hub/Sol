"use client"

import Link from "next/link"
import { Bell, Car, FileText, Globe, IdentificationBadge, IdentificationCard, ShieldCheck } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { ListRow } from "@/components/ui/list-row"
import { Badge } from "@/components/ui/badge"
import { DOCUMENT_ITEMS, type DocumentItem } from "@/lib/dart-data"

const DOCUMENT_ICONS: Record<string, typeof FileText> = {
  "national-id": IdentificationCard,
  "proof-of-income": FileText,
  "utility-bill": ShieldCheck,
  "car-license": Car,
  "club-id": Globe,
  "syndicate-id": IdentificationBadge,
}

// Liste des documents à fournir. Cf. app-cible/Profile/My Documents.png.
// Icône dédiée par document (la capture en distingue 6, pas d'icône
// unique répétée) et ligne d'accroche verte sous la description pour
// National ID / Proof of Income (cf. `hint` dans dart-data.ts).
export default function DartDocumentsPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader
        leading={<NavBackButton href="/dart/profile" />}
        title="My Documents"
        trailing={<Bell className="size-6 text-ink" />}
      />

      <p className="mt-4 text-[15px] text-neutral-500">Upload your documents to complete your account information.</p>

      <div className="mt-4 divide-y divide-neutral-200">
        {DOCUMENT_ITEMS.map((doc: DocumentItem) => {
          const Icon = DOCUMENT_ICONS[doc.id] ?? FileText
          return (
            <ListRow
              key={doc.id}
              icon={<Icon className="size-6 text-ink" />}
              title={
                doc.isNew ? (
                  <span className="flex items-center gap-2">
                    {doc.label}
                    <Badge variant="new">New</Badge>
                  </span>
                ) : (
                  doc.label
                )
              }
              subtitle={
                doc.hint ? (
                  <>
                    {doc.description}
                    <br />
                    <span className="font-bold text-brand-green">{doc.hint}</span>
                  </>
                ) : (
                  doc.description
                )
              }
              showChevron={Boolean(doc.href)}
              {...(doc.href ? { render: <Link href={doc.href} /> } : {})}
            />
          )
        })}
      </div>
    </div>
  )
}
