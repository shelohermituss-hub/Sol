// Page de démonstration temporaire — sert uniquement à valider visuellement
// les composants de l'Étape 4 face aux captures avant de construire les
// vraies pages (Étape 5, qui remplacera ce fichier par l'écran Home réel).
"use client"

import * as React from "react"
import { Umbrella, CloudLightning, Bank } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TextField } from "@/components/ui/text-field"
import { OtpInput } from "@/components/ui/otp-input"
import { ListRow } from "@/components/ui/list-row"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { SuccessBanner } from "@/components/ui/success-banner"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { NavHeader, NavBackButton, CancelLink } from "@/components/layout/nav-header"
import { BottomTabBar } from "@/components/layout/bottom-tab-bar"

export default function ComponentShowcase() {
  const [otp, setOtp] = React.useState("3169")
  const [checked, setChecked] = React.useState(true)
  const [switchOn, setSwitchOn] = React.useState(true)

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col">
      <div className="flex-1 space-y-8 px-6 py-6">
        <NavHeader leading={<NavBackButton href="#" />} title="Composants" trailing={<CancelLink href="#" />} />

        <section className="space-y-3">
          <h2 className="font-heading text-sm font-bold text-neutral-500">Boutons</h2>
          <Button className="w-full">Sign up</Button>
          <Button variant="secondary" className="w-full">Log in</Button>
          <Button className="w-full" disabled>Next</Button>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-sm font-bold text-neutral-500">Champs de saisie</h2>
          <TextField label="Mobile phone number" />
          <TextField label="Email address" defaultValue="alexsmith.mobbin@gmail.com" />
          <TextField label="Password" type="password" defaultValue="hunter2" />
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-sm font-bold text-neutral-500">Code OTP</h2>
          <OtpInput value={otp} onChange={setOtp} />
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-sm font-bold text-neutral-500">Checkbox / Switch / Radio</h2>
          <div className="flex items-center gap-3">
            <Checkbox checked={checked} onCheckedChange={(v) => setChecked(!!v)} />
            <span className="text-[15px]">I have read and agree...</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            <span className="text-[15px]">Log in with Face ID</span>
          </div>
          <RadioGroup defaultValue="month" className="gap-3">
            <label className="flex items-center justify-between">
              <span className="text-[15px]">Every 2 weeks</span>
              <RadioGroupItem value="2weeks" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-[15px]">Every month</span>
              <RadioGroupItem value="month" />
            </label>
          </RadioGroup>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-sm font-bold text-neutral-500">Success banner</h2>
          <SuccessBanner>Your email has been successfully updated</SuccessBanner>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-sm font-bold text-neutral-500">Card + List rows</h2>
          <Card>
            <div className="flex items-center justify-between">
              <CardTitle>Set & Save™</CardTitle>
            </div>
            <div className="flex gap-3">
              <Button size="default" className="h-11 flex-1 text-[15px]">Create goal</Button>
              <Button variant="secondary" size="default" className="h-11 flex-1 text-[15px]">Transfer money</Button>
            </div>
            <div className="divide-y divide-neutral-200">
              <ListRow icon={<Umbrella className="size-6" />} title="Rainy Day" trailing="$0.00" />
              <ListRow
                icon={<CloudLightning className="size-6" />}
                title="Emergency cushion"
                subtitle="Aug 10, 2026"
                trailing={<Badge>NEW</Badge>}
              />
            </div>
            <CardDescription>Connected account</CardDescription>
            <ListRow
              icon={<Bank className="size-6" />}
              title="Bank of America"
              subtitle="Checking"
              trailing="$7,741.33"
            />
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-sm font-bold text-neutral-500">Accordion</h2>
          <Accordion>
            <AccordionItem value="invites">
              <AccordionTrigger>Invites (0)</AccordionTrigger>
              <AccordionContent>Rien pour l&apos;instant.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="how">
              <AccordionTrigger>How it works</AccordionTrigger>
              <AccordionContent>Invite your friends and family...</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>

      <BottomTabBar active="/" />
    </div>
  )
}
