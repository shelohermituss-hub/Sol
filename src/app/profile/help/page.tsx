"use client";

import { useRouter } from "next/navigation";
import { CenteredPage } from "@/components/layout/centered-page";
import { Header } from "@/components/ui/header";
import { Card } from "@/components/ui/card";
import { ListRow } from "@/components/ui/list-row";
import { DocumentIcon } from "@/components/sections/profile/icons";

const ARTICLES = [
  "Can't Access Old Account",
  "Security & Privacy",
  "View Your Limits",
  "Provide Requested Documentation",
  "Sponsored Accounts",
  "$Cashtags",
  "Cash for Business",
  "Loyalty Points and Rewards",
  "FDIC Insurance",
];

// Écran 7.5 — Account & Settings (aide). Cf. design-refs/07-profile-settings/account-settings-help.png
export default function AccountSettingsHelpPage() {
  const router = useRouter();

  return (
    <CenteredPage>
      <Header onBack={() => router.back()} onClose={() => router.push("/profile")} />

      <h1 className="mt-6 text-3xl font-extrabold text-text-primary">Account &amp; Settings</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Learn how to manage your info, profile, and security settings.
      </p>

      <Card className="mt-6 p-0">
        <div className="px-5">
          {ARTICLES.map((article) => (
            <ListRow key={article} icon={<DocumentIcon />} label={article} right={<></>} />
          ))}
        </div>
      </Card>
    </CenteredPage>
  );
}
