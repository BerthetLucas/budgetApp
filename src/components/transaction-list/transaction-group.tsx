"use client";

import { motion, AnimatePresence } from "motion/react";
import { TransactionRow } from "./transaction-row";
import { TransactionGroupProps } from "./types";

export function TransactionGroup({
  date,
  transactions,
  baseDelay,
  isPending,
  onDelete,
}: TransactionGroupProps) {
  const label = new Date(date + "T00:00:00").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: baseDelay, ease: "easeOut" }}
    >
      <p className="text-muted-foreground mb-2 px-1 text-xs font-semibold tracking-wide uppercase">
        {label}
      </p>
      <div className="bg-background divide-y overflow-hidden rounded-2xl border shadow-sm">
        <AnimatePresence initial={false}>
          {transactions.map((transaction, i) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              delay={baseDelay + i * 0.04}
              isPending={isPending}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
