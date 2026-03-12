"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Transaction } from "@/types";
import { CATEGORY_EMOJI } from "@/constants/categories";
import { formatCurrency, cn } from "@/lib/utils";

interface ExpensesChartProps {
  transactions: Transaction[];
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

function formatMonthLabel(year: number, month: number): string {
  const label = new Date(year, month, 1).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function ExpensesChart({ transactions }: ExpensesChartProps) {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());

  const isCurrentMonth =
    selectedYear === now.getFullYear() && selectedMonth === now.getMonth();

  function goToPrevMonth() {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (isCurrentMonth) return;
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  }

  const monthStr = String(selectedMonth + 1).padStart(2, "0");
  const prefix = `${selectedYear}-${monthStr}`;
  const grouped: Record<string, number> = {};
  for (const tx of transactions) {
    if (tx.type !== "expense") continue;
    if (!tx.date.startsWith(prefix)) continue;
    grouped[tx.category] = (grouped[tx.category] ?? 0) + tx.amount;
  }
  const chartData = Object.entries(grouped)
    .sort(([, a], [, b]) => b - a)
    .map(([category, value], index) => ({
      name: category,
      value,
      fill: CHART_COLORS[index % CHART_COLORS.length],
      emoji: CATEGORY_EMOJI[category] ?? "📂",
    }));

  const totalExpenses = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-base font-semibold tracking-tight">
          {formatMonthLabel(selectedYear, selectedMonth)}
        </h2>
        <button
          onClick={goToNextMonth}
          disabled={isCurrentMonth}
          className={cn(
            "p-2 rounded-xl transition-colors",
            isCurrentMonth
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label="Mois suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
      {chartData.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-20"
        >
          <p className="text-3xl mb-2">📊</p>
          <p className="text-sm text-muted-foreground">
            Aucune dépense ce mois-ci
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="chart"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Donut chart */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={108}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${formatCurrency(value)} €`, "Dépenses"]}
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    color: "var(--card-foreground)",
                    fontSize: "0.8rem",
                  }}
                  labelStyle={{ fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-muted-foreground font-medium">Total</p>
              <p className="text-xl font-bold tracking-tight">
                {formatCurrency(totalExpenses)} €
              </p>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="bg-background rounded-2xl overflow-hidden divide-y border shadow-sm">
            {chartData.map((entry, index) => {
              const pct = totalExpenses > 0
                ? Math.round((entry.value / totalExpenses) * 100)
                : 0;
              return (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
                  className="flex items-center gap-3 px-4 py-3.5"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: entry.fill }}
                  />
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-lg shrink-0">
                    {entry.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{entry.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pct}% du total</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums">
                    {formatCurrency(entry.value)} €
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
