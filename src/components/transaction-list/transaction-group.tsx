"use client";

import { motion, AnimatePresence } from "motion/react";
import { TransactionRow } from "./transaction-row";
import { TransactionGroupProps } from "./types";

export function TransactionGroup({ date, txs, baseDelay, isPending, onDelete }: TransactionGroupProps) {
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
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">
        {label}
      </p>
      <div className="bg-background rounded-2xl overflow-hidden divide-y shadow-sm border">
        <AnimatePresence initial={false}>
          {txs.map((tx, i) => (
            <TransactionRow
              key={tx.id}
              tx={tx}
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
