"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";

interface BudgetProgressProps {
  progressPercent: number;
  lastDay: number;
}

export function BudgetProgress({ progressPercent, lastDay }: BudgetProgressProps) {
  return (
    <motion.div
      {...fadeUp(0.2)}
      className="bg-card rounded-3xl p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-muted-foreground text-xs font-medium">Avancement du mois</p>
        <p className="text-xs font-semibold">{progressPercent}%</p>
      </div>
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="bg-foreground h-full rounded-full"
        />
      </div>
      <div className="text-muted-foreground mt-2 flex justify-between text-xs">
        <span>1</span>
        <span>{lastDay}</span>
      </div>
    </motion.div>
  );
}
