"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { NavHeader, NavBackButton } from "@/components/layout/nav-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAccount } from "@/lib/account-context"

// Édition du nom du compte connecté. Cf. design-refs/
// Oportun_iOS_Editing_an_account_name/Oportun iOS Editing an account name
// 1-2.png (deux comptes en exemple dans les captures, un seul compte réel
// dans cette reproduction — le champ part de la valeur courante).
export default function EditAccountNamePage() {
  const router = useRouter()
  const { accountName, setAccountName } = useAccount()
  const [name, setName] = React.useState(accountName)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-4">
      <NavHeader leading={<NavBackButton href="/connected-account" />} title="Account name" />

      <h1 className="mt-4 font-heading text-[28px] font-bold text-ink">Account name</h1>

      <Input className="mt-6" value={name} onChange={(e) => setName(e.target.value)} />

      <div className="mt-auto pb-6">
        <Button
          className="w-full"
          disabled={name.trim() === ""}
          onClick={() => {
            setAccountName(name.trim())
            router.push("/connected-account")
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
