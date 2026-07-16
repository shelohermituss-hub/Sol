"use client"

import Link from "next/link"
import { FileText } from "@phosphor-icons/react/ssr"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { ListRow } from "@/components/ui/list-row"
import { Badge } from "@/components/ui/badge"
import { DOCUMENT_ITEMS } from "@/lib/dart-data"

// Liste des documents à fournir. Cf. app-cible/Profile/My Documents.png.
export default function DartDocumentsPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/dart/profile" />} title="My Documents" />

      <p className="mt-4 text-[15px] text-neutral-500">Upload your documents to complete your account information.</p>

      <div className="mt-4 divide-y divide-neutral-200">
        {DOCUMENT_ITEMS.map((doc) => (
          <ListRow
            key={doc.id}
            icon={<FileText className="size-6 text-ink" />}
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
            subtitle={doc.description}
            showChevron={Boolean(doc.href)}
            {...(doc.href ? { render: <Link href={doc.href} /> } : {})}
          />
        ))}
      </div>
    </div>
  )
}
