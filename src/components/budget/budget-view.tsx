"use client";

import { Transaction } from "@/types";
import { computeBudget } from "./compute-budget";
import { BudgetSummaryCard } from "./budget-summary-card";
import { BudgetMetricCard } from "./budget-metric-card";
import { BudgetProgress } from "./budget-progress";

interface BudgetViewProps {
  transactions: Transaction[];
}

export function BudgetView({ transactions }: BudgetViewProps) {
  const { totalIncome, totalExpenses, remaining, daysLeft, lastDay, progressPercent, perDay, perWeek } =
    computeBudget(transactions);

  return (
    <div className="space-y-4">
      <BudgetSummaryCard
        remaining={remaining}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        daysLeft={daysLeft}
      />
      <div className="grid grid-cols-2 gap-4">
        <BudgetMetricCard label="Par jour" amount={perDay} sublabel="/ jour restant" delay={0.08} />
        <BudgetMetricCard label="Par semaine" amount={perWeek} sublabel="/ semaine restante" delay={0.14} />
      </div>
      <BudgetProgress progressPercent={progressPercent} lastDay={lastDay} />
    </div>
  );
}
