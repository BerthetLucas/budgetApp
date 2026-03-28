"use client";

import { motion, AnimatePresence } from "motion/react";
import { fadeUpSm } from "@/lib/motion";
import { TransactionRow } from "./transaction-row";
import { TransactionGroupProps } from "./types";

export function TransactionGroup({
  date,
  transactions,
  baseDelay,
  isPending,
  onDelete,
}: TransactionGroupProps) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const label =
    date === fmt(today)
      ? "Aujourd'hui"
      : date === fmt(yesterday)
      ? "Hier"
      : new Date(date + "T00:00:00").toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });

  return (
    <motion.div {...fadeUpSm(baseDelay)}>
      <p className="text-muted-foreground mb-2 px-1 text-xs font-semibold tracking-wide uppercase">
        {label}
      </p>
      <div className="bg-card overflow-hidden rounded-2xl border border-border shadow-[3px_3px_0_0_var(--shadow-hard)]">
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
