"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AvatarCircle } from "@/components/ui/avatar-circle";
import { ListRow } from "@/components/ui/list-row";
import {
  PersonIcon,
  LinkIcon,
  ShieldIcon,
  StarIcon,
  PeopleIcon,
  LimitsIcon,
  BellIconOutline,
  DocumentIcon,
  HelpIcon,
} from "@/components/sections/profile/icons";

// Écran 7.1/7.2 — Your Account (une seule page scrollable).
// Cf. design-refs/07-profile-settings/account-profile-top.png,
// account-profile-scrolled.png
export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-page px-6 pt-4">
      <Header title="Your Account" onClose={() => router.push("/")} />

      <div className="mt-4">
        <Card className="flex flex-col items-center text-center">
          <AvatarCircle size={72} />
          <p className="mt-3 text-lg font-bold text-text-primary">Judy Smith</p>
          <p className="text-text-secondary">$JudySmith</p>
          <div className="mt-4 w-full">
            <Button variant="secondary">Edit Profile</Button>
          </div>
        </Card>
      </div>

      <Card className="mt-4 flex items-center gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white"
          style={{ backgroundColor: "var(--color-brand-green)" }}
        >
          +
        </div>
        <div>
          <p className="font-bold text-text-primary">Invite friends</p>
          <p className="text-text-secondary">Get $5</p>
        </div>
      </Card>

      <p className="mt-6 text-sm font-bold uppercase text-text-secondary">Account &amp; Settings</p>
      <Card className="mt-2 p-0">
        <div className="px-5">
          <ListRow icon={<PersonIcon />} label="Personal" />
          <ListRow icon={<LinkIcon />} label="Linked Banks" />
          <ListRow icon={<ShieldIcon />} label="Security & Privacy" onClick={() => router.push("/profile/security")} />
          <ListRow
            icon={<StarIcon />}
            label="Favorites"
            right={
              <div className="flex items-center">
                <Badge />
                <ChevronRightIcon />
              </div>
            }
          />
          <ListRow icon={<PeopleIcon />} label="Family" />
          <ListRow icon={<LimitsIcon />} label="Limits" />
          <ListRow
            icon={<BellIconOutline />}
            label="Notifications"
            onClick={() => router.push("/profile/notifications")}
          />
          <ListRow icon={<DocumentIcon />} label="Documents" />
          <ListRow icon={<HelpIcon />} label="Support" onClick={() => router.push("/profile/help")} />
        </div>
      </Card>

      <button type="button" className="mt-6 py-4 text-center font-bold" style={{ color: "#E0463C" }}>
        Sign Out
      </button>

      <div className="mt-4 flex flex-col items-center gap-4 pb-8 text-center text-sm text-text-secondary">
        <p>
          Cash App&apos;s <span className="underline">Privacy Notice</span>,{" "}
          <span className="underline">Terms of Service</span>, and{" "}
          <span className="underline">Open Source Software</span>
        </p>
        <p>Version 4.7.1 (4071001)</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <span
      className="mr-2 rounded-full px-2.5 py-0.5 text-xs font-bold"
      style={{ backgroundColor: "#DFF7E6", color: "var(--color-brand-green)" }}
    >
      New
    </span>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" className="text-border-input">
      <path d="M1 1l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
