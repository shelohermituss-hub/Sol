"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Briefcase } from "@phosphor-icons/react/ssr";
import { Header } from "@/components/ui/header";
import { Sparkline } from "@/components/ui/sparkline";
import { AppShell } from "@/components/layout/app-shell";
import { STOCKS } from "@/lib/stocks-data";

const FEATURED = ["nike", "ge", "coca-cola", "walmart"];

const CATEGORIES = [
  { label: "Banking & Finance", bg: "var(--color-category-banking)" },
  { label: "Business Services", bg: "var(--color-category-business)" },
];

// Écran 6.3/6.4 — Onglet Stocks (une seule page scrollable).
// Cf. design-refs/06-stocks/stocks-tab-top.png, stocks-tab-scrolled.png
export default function StocksPage() {
  const router = useRouter();

  return (
    <AppShell bgClassName="bg-bg-card">
      <div className="px-6 pt-4 md:px-0 md:pt-0">
      <Header title="Stocks" onBack={() => router.push("/")} />
      <div className="mt-2 flex justify-end">
        <Bell size={22} style={{ color: "var(--color-accent-purple)" }} />
      </div>

      <input
        placeholder="Search Stocks and Categories"
        className="mt-4 h-12 w-full rounded-full bg-bg-page px-5 text-text-primary placeholder:text-text-secondary focus:outline-none"
      />

      <h2 className="mt-8 text-center text-3xl font-extrabold text-text-primary">
        Start investing with just $1
      </h2>
      <p className="mt-3 text-center text-text-secondary">
        Buy stocks in your favorite companies to give your money a chance to grow.
      </p>

      <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
        {FEATURED.map((symbol) => {
          const stock = STOCKS[symbol];
          return (
            <Link
              key={symbol}
              href={`/stocks/${symbol}`}
              className="flex h-32 w-24 shrink-0 flex-col justify-between rounded-2xl p-3"
              style={{ backgroundColor: stock.logoBg }}
            >
              <span className="text-sm font-bold text-white mix-blend-difference">{stock.name}</span>
              <Sparkline points={stock.points} color="white" width={70} height={24} />
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-6 h-14 w-full rounded-full text-lg font-semibold text-white"
        style={{ backgroundColor: "var(--color-accent-purple)" }}
      >
        Buy stocks
      </button>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        <NewsCard source="MarketWatch" headline="Expectations for Nvidia's earnings. Will they even matter?" />
        <NewsCard source="CNBC" headline="Top Wall Street analysts pound the table on these stocks" />
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {CATEGORIES.map((c) => (
          <div
            key={c.label}
            className="flex h-28 w-32 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl text-center text-white"
            style={{ backgroundColor: c.bg }}
          >
            <Briefcase size={24} color="white" />
            <span className="text-sm font-semibold">{c.label}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-extrabold text-text-primary">Most Traded Monthly</h2>
      <p className="mt-2 text-text-secondary">
        These stocks were bought and sold more over the last 30 days than any other stocks available on Cash App.
      </p>

      <Link href="/stocks/meta" className="mt-4 flex items-center gap-4 border-b border-bg-page-alt py-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
          style={{ backgroundColor: STOCKS.meta.logoBg }}
        >
          M
        </div>
        <span className="flex-1 font-semibold text-text-primary">Meta</span>
        <span className="text-text-secondary">↓ 1.70%</span>
      </Link>

      </div>
    </AppShell>
  );
}

function NewsCard({ source, headline }: { source: string; headline: string }) {
  return (
    <div className="w-48 shrink-0 rounded-2xl bg-bg-page p-4">
      <p className="text-sm font-semibold text-text-secondary">{source}</p>
      <p className="mt-2 text-sm font-semibold text-text-primary">{headline}</p>
    </div>
  );
}
