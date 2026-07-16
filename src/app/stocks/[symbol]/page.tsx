"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/header";
import { Sparkline } from "@/components/ui/sparkline";
import { BuyStockSheet } from "@/components/sections/stocks/buy-stock-sheet";
import { STOCKS } from "@/lib/stocks-data";
import { cn } from "@/lib/cn";

const RANGES = ["1D", "1W", "1M", "1Y", "ALL"];

// Écran 6.2 — Détail action. Cf. design-refs/06-stocks/stock-details-meta.png
// Seul le symbole "meta" a des données de référence complètes.
export default function StockDetailPage() {
  const router = useRouter();
  const params = useParams<{ symbol: string }>();
  const stock = STOCKS[params.symbol];
  const [range, setRange] = useState("1D");
  const [buyOpen, setBuyOpen] = useState(false);

  if (!stock) notFound();

  const isDown = stock.changePercent < 0;

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg-card px-6 pt-4">
      <Header onBack={() => router.back()} />

      <div
        className="mt-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold"
        style={{ backgroundColor: stock.logoBg }}
      >
        {stock.name.charAt(0)}
      </div>
      <p className="mt-3 text-2xl font-extrabold text-text-primary">{stock.name}</p>
      <p className="mt-1 text-lg font-semibold" style={{ color: "var(--color-accent-blue)" }}>
        {isDown ? "↓" : "↑"} {Math.abs(stock.changePercent)}%
      </p>

      <div className="mt-4">
        <Sparkline points={stock.points} color="var(--color-accent-blue)" width={330} height={140} />
      </div>

      <div className="mt-4 flex gap-4">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-semibold",
              r === range ? "bg-bg-page-alt text-text-primary" : "text-text-secondary",
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setBuyOpen(true)}
          className="h-12 flex-1 rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent-blue)" }}
        >
          Buy
        </button>
        <button
          type="button"
          className="h-12 flex-1 rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent-blue)" }}
        >
          Follow
        </button>
        <button
          type="button"
          className="h-12 flex-1 rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent-blue)" }}
        >
          Gift
        </button>
      </div>

      <div className="mt-8 flex flex-1 gap-4 overflow-x-auto pb-6">
        <NewsCard source="CNBC" time="8H AGO" headline="Top Wall Street analysts weigh in" />
        <NewsCard source="MarketWatch" time="8H AGO" headline="Expectations for the next earnings report" />
      </div>

      <BuyStockSheet open={buyOpen} onClose={() => setBuyOpen(false)} stockName={stock.name} />
    </div>
  );
}

function NewsCard({ source, time, headline }: { source: string; time: string; headline: string }) {
  return (
    <div className="w-48 shrink-0 rounded-2xl bg-bg-page p-4">
      <p className="text-sm font-semibold text-text-secondary">
        {source} · {time}
      </p>
      <p className="mt-2 font-semibold text-text-primary">{headline}</p>
    </div>
  );
}
