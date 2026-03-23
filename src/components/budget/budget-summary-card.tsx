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
  const spentPercent = totalIncome > 0 ? Math.min(Math.round((totalExpenses / totalIncome) * 100), 100) : 0;

  return (
    <motion.div
      {...fadeUp()}
      className="bg-card text-foreground rounded-2xl border border-[#191d17] p-6 shadow-[4px_4px_0_0_#191d17]"
    >
      <p className="text-muted-foreground mb-2 text-sm font-medium">Solde restant ce mois</p>
      <p className="mb-1 text-4xl font-bold tracking-tight">
        {formatCurrency(remaining)} €
      </p>
      <p className="text-muted-foreground mb-4 text-xs">
        {daysLeft} jour{daysLeft > 1 ? "s" : ""} restant{daysLeft > 1 ? "s" : ""}
      </p>
      <div className="bg-muted mb-4 h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500"
          style={{ width: `${spentPercent}%` }}
        />
      </div>
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
