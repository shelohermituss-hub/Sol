import { CaretRight } from "@phosphor-icons/react/ssr";
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
      <div className="flex items-center justify-between gap-2">
        <span className="whitespace-nowrap text-base font-bold text-text-primary sm:text-lg">Cash Balance</span>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm text-text-secondary sm:text-base"
        >
          Account &amp; Routing
          <CaretRight size={12} />
        </button>
      </div>
      <p className="mt-2 text-4xl font-extrabold text-text-primary sm:text-5xl">{balance}</p>
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
