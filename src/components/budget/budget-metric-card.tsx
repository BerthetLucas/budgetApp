"use client";

import { motion } from "motion/react";
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-card rounded-3xl p-5"
    >
      <p className="text-muted-foreground mb-3 text-xs font-medium">{label}</p>
      <p className="text-2xl font-bold tracking-tight">
        {formatCurrency(amount)} €
      </p>
      <p className="text-muted-foreground mt-1 text-xs">{sublabel}</p>
    </motion.div>
  );
}
