"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { formatCurrency } from "@/lib/utils";

interface BudgetSummaryCardProps {
  remaining: number;
  totalIncome: number;
  totalExpenses: number;
  daysLeft: number;
}

export function BudgetSummaryCard({
  remaining,
  totalIncome,
  totalExpenses,
  daysLeft,
}: BudgetSummaryCardProps) {
  return (
    <motion.div
      {...fadeUp()}
      className="bg-foreground text-background rounded-3xl p-6 shadow-lg"
    >
      <p className="mb-2 text-sm font-medium opacity-60">Solde restant ce mois</p>
      <p className="mb-1 text-4xl font-bold tracking-tight">
        {formatCurrency(remaining)} €
      </p>
      <p className="mb-6 text-xs opacity-50">
        {daysLeft} jour{daysLeft > 1 ? "s" : ""} restant{daysLeft > 1 ? "s" : ""}
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
