"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
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
      {...fadeUp()}
      className="bg-card text-foreground mb-4 rounded-2xl border border-border p-6 shadow-[4px_4px_0_0_var(--shadow-hard)]"
    >
      <p className="text-muted-foreground mb-2 text-sm font-medium">Solde actuel</p>
      <p className="mb-6 text-4xl font-bold tracking-tight">
        {balance >= 0 ? "+" : ""}
        {formatCurrency(balance)} €
      </p>
      <div className="flex gap-4">
        <div className="flex-1 rounded-2xl bg-emerald-50 px-4 py-3">
          <p className="mb-0.5 text-xs text-emerald-500">Revenus</p>
          <p className="text-sm font-bold text-emerald-600">
            +{formatCurrency(totalIncome)} €
          </p>
        </div>
        <div className="flex-1 rounded-2xl bg-red-50 px-4 py-3">
          <p className="mb-0.5 text-xs text-red-400">Dépenses</p>
          <p className="text-sm font-bold text-red-500">
            -{formatCurrency(totalExpenses)} €
          </p>
        </div>
      </div>
    </motion.div>
  );
}
