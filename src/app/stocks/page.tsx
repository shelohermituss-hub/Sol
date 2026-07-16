"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/header";
import { Sparkline } from "@/components/ui/sparkline";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { STOCKS } from "@/lib/stocks-data";

const FEATURED = ["nike", "ge", "coca-cola", "walmart"];

const CATEGORIES = [
  { label: "Banking & Finance", bg: "#C1622D" },
  { label: "Business Services", bg: "#C79A5B" },
];

// Écran 6.3/6.4 — Onglet Stocks (une seule page scrollable).
// Cf. design-refs/06-stocks/stocks-tab-top.png, stocks-tab-scrolled.png
export default function StocksPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-card px-6 pt-4">
      <Header title="Stocks" onBack={() => router.push("/")} />
      <div className="mt-2 flex justify-end">
        <BellIcon />
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
            <BriefcaseIcon />
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

      <div className="flex-1" />
      <BottomTabBar />
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" style={{ color: "var(--color-accent-purple)" }}>
      <path
        d="M11 2a5 5 0 00-5 5v3.5L4 14h14l-2-3.5V7a5 5 0 00-5-5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 17a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="12" rx="2" stroke="white" strokeWidth="1.6" />
      <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke="white" strokeWidth="1.6" />
    </svg>
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
