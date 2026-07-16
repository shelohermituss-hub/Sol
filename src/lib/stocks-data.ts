export interface Stock {
  symbol: string;
  name: string;
  changePercent: number;
  points: number[];
  logoBg: string;
}

// Données de démonstration — seul "meta" a une référence complète
// (design-refs/06-stocks/stock-details-meta.png). Les autres n'illustrent que
// le carousel de la page /stocks (design-refs/06-stocks/stocks-tab-top.png).
export const STOCKS: Record<string, Stock> = {
  meta: {
    symbol: "meta",
    name: "Meta",
    changePercent: -0.56,
    points: [20, 8, 32, 18, 34, 22, 40, 30, 46, 42, 52],
    logoBg: "#E7EDFB",
  },
  nike: { symbol: "nike", name: "Nike", changePercent: 0, points: [10, 14, 9, 16, 13], logoBg: "#0A0A0A" },
  ge: { symbol: "ge", name: "GE", changePercent: 0, points: [8, 12, 10, 15, 11], logoBg: "#3B5B99" },
  "coca-cola": {
    symbol: "coca-cola",
    name: "Coca-Cola",
    changePercent: 0,
    points: [12, 9, 14, 10, 16],
    logoBg: "#DA291C",
  },
  walmart: { symbol: "walmart", name: "Walmart", changePercent: 0, points: [9, 13, 8, 15, 12], logoBg: "#0071CE" },
};
