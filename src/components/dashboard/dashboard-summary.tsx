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
      className="bg-foreground text-background mb-4 rounded-3xl p-6 shadow-lg"
    >
      <p className="mb-2 text-sm font-medium opacity-60">Solde actuel</p>
      <p className="mb-6 text-4xl font-bold tracking-tight">
        {balance >= 0 ? "+" : ""}
        {formatCurrency(balance)} €
      </p>
      <div className="flex gap-4">
        <div className="bg-background/10 flex-1 rounded-2xl px-4 py-3">
          <p className="mb-0.5 text-xs opacity-60">Revenus</p>
          <p className="text-sm font-semibold text-green-400">
            +{formatCurrency(totalIncome)} €
          </p>
        </div>
        <div className="bg-background/10 flex-1 rounded-2xl px-4 py-3">
          <p className="mb-0.5 text-xs opacity-60">Dépenses</p>
          <p className="text-sm font-semibold text-red-400">
            -{formatCurrency(totalExpenses)} €
          </p>
        </div>
      </div>
    </motion.div>
  );
}
