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
