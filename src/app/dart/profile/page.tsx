"use client"

import * as React from "react"
import Link from "next/link"
import {
  CaretRight,
  Fingerprint,
  Folder,
  LockKey,
  Question,
  SignOut,
  Translate,
  UserCircle,
  UsersThree,
} from "@phosphor-icons/react/ssr"

import { DartHeader } from "@/components/layout/dart-header"
import { DartTabBar } from "@/components/layout/dart-tab-bar"
import { ListRow } from "@/components/ui/list-row"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatCurrency } from "@/lib/currency"
import { CURRENT_USER } from "@/lib/dart-data"

// Onglet Profile (hub). Cf. app-cible/Profile.png. Suit quasi 1:1 la mise
// en page du /profile de l'app 1 (sections de lignes de réglages).
// Langue : Kreyòl par défaut, Français en option (cf. CLAUDE.md — retire
// toute référence anglais/arabe du sélecteur).
export default function DartProfilePage() {
  const [biometrics, setBiometrics] = React.useState(false)
  const [languageSheetOpen, setLanguageSheetOpen] = React.useState(false)
  const [language, setLanguage] = React.useState<"ht" | "fr">("ht")
  const [pendingLanguage, setPendingLanguage] = React.useState<"ht" | "fr">("ht")

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex-1 px-6 pt-4">
        <DartHeader />

        <div className="mt-6 flex items-center gap-3">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-200/50">
            <UserCircle className="size-8 text-neutral-500" />
          </span>
          <div>
            <p className="font-heading text-[17px] font-bold text-ink">
              {CURRENT_USER.firstName} {CURRENT_USER.lastName}
            </p>
            <p className="text-[15px] text-neutral-500">
              +509 {CURRENT_USER.phone.slice(0, 4)} {CURRENT_USER.phone.slice(4)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-card bg-ink px-5 py-5">
          <div>
            <p className="text-[13px] text-paper/70">Monthly Pay-in Limit</p>
            <p className="mt-1 font-heading text-[20px] font-bold text-paper">{formatCurrency(3000)}</p>
          </div>
          <CaretRight className="size-5 text-paper" />
        </div>

        <h2 className="mt-8 font-heading text-[20px] font-bold text-ink">Account</h2>
        <div className="divide-y divide-neutral-200">
          <ListRow
            icon={<UserCircle className="size-6 text-ink" />}
            title="Personal Information"
            showChevron
            render={<Link href="/dart/profile/personal-info" />}
          />
          <ListRow
            icon={<Folder className="size-6 text-ink" />}
            title="My Documents"
            showChevron
            render={<Link href="/dart/profile/documents" />}
          />
          <ListRow
            icon={<UsersThree className="size-6 text-ink" />}
            title="Invite Friends"
            showChevron
            render={<Link href="/dart/profile/invite-friends" />}
          />
        </div>

        <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Security</h2>
        <div className="divide-y divide-neutral-200">
          <ListRow icon={<LockKey className="size-6 text-ink" />} title="Change Passcode" showChevron />
          <ListRow
            icon={<Fingerprint className="size-6 text-ink" />}
            title="Enable Biometrics"
            trailing={<Switch checked={biometrics} onCheckedChange={(c) => setBiometrics(c)} />}
          />
        </div>

        <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Settings</h2>
        <div className="divide-y divide-neutral-200">
          <button
            type="button"
            onClick={() => {
              setPendingLanguage(language)
              setLanguageSheetOpen(true)
            }}
            className="w-full"
          >
            <ListRow
              icon={<Translate className="size-6 text-ink" />}
              title="Language"
              subtitle={language === "ht" ? "Kreyòl" : "Français"}
              showChevron
            />
          </button>
        </div>

        <h2 className="mt-6 font-heading text-[20px] font-bold text-ink">Support</h2>
        <div className="divide-y divide-neutral-200">
          <ListRow icon={<Question className="size-6 text-ink" />} title="Get Help" showChevron />
        </div>

        <Button variant="secondary" className="mt-6 w-full">
          <SignOut className="size-5" />
          Log out
        </Button>
      </div>

      <Sheet open={languageSheetOpen} onOpenChange={setLanguageSheetOpen}>
        <SheetContent>
          <SheetTitle>Change Language</SheetTitle>
          <RadioGroup value={pendingLanguage} onValueChange={(v) => setPendingLanguage(v as "ht" | "fr")} className="gap-4">
            <label className="flex items-center gap-3">
              <RadioGroupItem value="ht" />
              <span className="text-[17px] text-ink">Kreyòl</span>
            </label>
            <label className="flex items-center gap-3">
              <RadioGroupItem value="fr" />
              <span className="text-[17px] text-ink">Français</span>
            </label>
          </RadioGroup>
          <Button
            className="w-full"
            disabled={pendingLanguage === language}
            onClick={() => {
              setLanguage(pendingLanguage)
              setLanguageSheetOpen(false)
            }}
          >
            Save
          </Button>
        </SheetContent>
      </Sheet>

      <DartTabBar active="/dart/profile" />
    </div>
  )
}
