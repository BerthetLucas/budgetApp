"use client";

import { useOptimistic, useTransition, useMemo } from "react";
import { Trash2 } from "lucide-react";
import { deleteTransaction } from "@/actions/transactions";
import { Transaction } from "@/types";
import { CATEGORY_EMOJI } from "@/constants/categories";
import { formatCurrency } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticList, removeOptimistic] = useOptimistic(
    transactions,
    (current, idToRemove: string) =>
      current.filter((t) => t.id !== idToRemove)
  );

  if (optimisticList.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-3xl mb-2">💸</p>
        <p className="text-sm text-muted-foreground">Aucune transaction</p>
      </div>
    );
  }

  const grouped = useMemo(
    () =>
      optimisticList.reduce<Record<string, Transaction[]>>((acc, tx) => {
        if (!acc[tx.date]) acc[tx.date] = [];
        acc[tx.date].push(tx);
        return acc;
      }, {}),
    [optimisticList]
  );

  function handleDelete(id: string) {
    startTransition(async () => {
      removeOptimistic(id);
      await deleteTransaction(id);
    });
  }

  return (
    <div className="space-y-5">
      {Object.entries(grouped).map(([date, txs]) => (
        <div key={date}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">
            {new Date(date + "T00:00:00").toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <div className="bg-background rounded-2xl overflow-hidden divide-y shadow-sm border">
            {txs.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3.5">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-lg shrink-0">
                  {CATEGORY_EMOJI[tx.category] ?? "📂"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    {tx.category}
                  </p>
                  {tx.description ? (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {tx.description}
                    </p>
                  ) : null}
                </div>
                <span
                  className={`text-sm font-bold tabular-nums ${
                    tx.type === "income" ? "text-green-600" : "text-foreground"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)} €
                </span>
                <button
                  disabled={isPending}
                  onClick={() => handleDelete(tx.id)}
                  className="text-muted-foreground/40 hover:text-destructive transition-colors disabled:opacity-30 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
