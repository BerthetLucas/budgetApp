"use client";

import { useOptimistic, useTransition, useMemo } from "react";
import { motion } from "motion/react";
import { deleteTransaction } from "@/actions/transactions";
import { Transaction } from "@/types";
import { TransactionGroup } from "./transaction-group";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticList, removeOptimistic] = useOptimistic(
    transactions,
    (current, idToRemove: string) => current.filter((t) => t.id !== idToRemove)
  );

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

  if (optimisticList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-3xl mb-2">💸</p>
        <p className="text-sm text-muted-foreground">Aucune transaction</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {Object.entries(grouped).map(([date, txs], groupIndex) => (
        <TransactionGroup
          key={date}
          date={date}
          txs={txs}
          baseDelay={groupIndex * 0.06}
          isPending={isPending}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
