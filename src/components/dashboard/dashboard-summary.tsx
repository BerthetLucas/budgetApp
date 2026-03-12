"use client";

import { motion } from "motion/react";
import { Transaction } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface DashboardSummaryProps {
  transactions: Transaction[];
}

export function DashboardSummary({ transactions }: DashboardSummaryProps) {
  const { totalIncome, totalExpenses } = transactions.reduce(
    (acc, t) => {
      if (t.type === "income") acc.totalIncome += t.amount;
      else acc.totalExpenses += t.amount;
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  const balance = totalIncome - totalExpenses;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-3xl bg-foreground text-background p-6 mb-4 shadow-lg"
    >
      <p className="text-sm font-medium opacity-60 mb-2">Solde actuel</p>
      <p className="text-4xl font-bold tracking-tight mb-6">
        {balance >= 0 ? "+" : ""}
        {formatCurrency(balance)} €
      </p>
      <div className="flex gap-4">
        <div className="flex-1 bg-background/10 rounded-2xl px-4 py-3">
          <p className="text-xs opacity-60 mb-0.5">Revenus</p>
          <p className="text-sm font-semibold text-green-400">
            +{formatCurrency(totalIncome)} €
          </p>
        </div>
        <div className="flex-1 bg-background/10 rounded-2xl px-4 py-3">
          <p className="text-xs opacity-60 mb-0.5">Dépenses</p>
          <p className="text-sm font-semibold text-red-400">
            -{formatCurrency(totalExpenses)} €
          </p>
        </div>
      </div>
    </motion.div>
  );
}
