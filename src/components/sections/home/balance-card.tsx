import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BalanceCardProps {
  balance: string;
  onAddCash?: () => void;
  onCashOut?: () => void;
}

export function BalanceCard({ balance, onAddCash, onCashOut }: BalanceCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-text-primary">Cash Balance</span>
        <button type="button" className="flex items-center gap-1 text-text-secondary">
          Account &amp; Routing
          <ChevronRightIcon />
        </button>
      </div>
      <p className="mt-2 text-5xl font-extrabold text-text-primary">{balance}</p>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" fullWidth={false} className="flex-1" onClick={onAddCash}>
          Add Cash
        </Button>
        <Button variant="secondary" fullWidth={false} className="flex-1" onClick={onCashOut}>
          Cash Out
        </Button>
      </div>
    </Card>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
