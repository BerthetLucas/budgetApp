import { formatCurrency } from "@/lib/utils";

interface TransactionAmountProps {
  type: "income" | "expense";
  amount: number;
}

export function TransactionAmount({ type, amount }: TransactionAmountProps) {
  const isIncome = type === "income";

  return (
    <span
      className={`text-sm font-bold tabular-nums ${isIncome ? "text-green-600" : "text-foreground"}`}
    >
      {isIncome ? "+" : "-"}
      {formatCurrency(amount)} €
    </span>
  );
}
