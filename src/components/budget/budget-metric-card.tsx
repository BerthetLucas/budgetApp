"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { formatCurrency } from "@/lib/utils";

interface BudgetMetricCardProps {
  label: string;
  amount: number;
  sublabel: string;
  delay: number;
}

export function BudgetMetricCard({
  label,
  amount,
  sublabel,
  delay,
}: BudgetMetricCardProps) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="bg-card rounded-2xl border border-border p-5 shadow-[4px_4px_0_0_var(--shadow-hard)]"
    >
      <p className="text-muted-foreground mb-3 text-xs font-medium">{label}</p>
      <p className="text-2xl font-bold tracking-tight">
        {formatCurrency(amount)} €
      </p>
      <p className="text-muted-foreground mt-1 text-xs">{sublabel}</p>
    </motion.div>
  );
}
