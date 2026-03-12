"use client";

import { useOptimistic, useTransition } from "react";
import { deleteTransaction } from "@/actions/transactions";
import { Transaction } from "@/types";
import { TransactionGroup } from "./transaction-group";
import { TransactionEmpty } from "./transaction-empty";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [isPending, startTransition] = useTransition();
  const [transactionList, removeFromList] = useOptimistic(
    transactions,
    (current, idToRemove: string) =>
      current.filter((transaction) => transaction.id !== idToRemove)
  );

  const grouped: Record<string, Transaction[]> = {};
  for (const tx of transactionList) {
    if (!grouped[tx.date]) grouped[tx.date] = [];
    grouped[tx.date].push(tx);
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      removeFromList(id);
      await deleteTransaction(id);
    });
  }

  if (transactionList.length === 0) {
    return <TransactionEmpty />;
  }

  return (
    <div className="space-y-5">
      {Object.entries(grouped).map(([date, transactions], index) => (
        <TransactionGroup
          key={date}
          date={date}
          transactions={transactions}
          baseDelay={index * 0.06}
          isPending={isPending}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
