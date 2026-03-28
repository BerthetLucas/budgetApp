"use client";

import { motion, AnimatePresence } from "motion/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart2 } from "lucide-react";
import { Transaction } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useMonthNavigation } from "@/components/stats/use-month-navigation";
import { useExpensesChartData } from "@/components/stats/use-expenses-chart-data";
import { MonthNavigator } from "@/components/stats/month-navigator";
import { CategoryBreakdown } from "@/components/stats/category-breakdown";

interface ExpensesChartProps {
  transactions: Transaction[];
}

export function ExpensesChart({ transactions }: ExpensesChartProps) {
  const {
    selectedYear,
    selectedMonth,
    isCurrentMonth,
    goToPrevMonth,
    goToNextMonth,
  } = useMonthNavigation();

  const { chartData, totalExpenses } = useExpensesChartData(
    transactions,
    selectedYear,
    selectedMonth
  );

  return (
    <div className="space-y-6">
      <MonthNavigator
        year={selectedYear}
        month={selectedMonth}
        isCurrentMonth={isCurrentMonth}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
      />

      <AnimatePresence mode="wait">
        {chartData.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 text-center"
          >
            <BarChart2 className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
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
            <div className="relative rounded-2xl border border-border bg-card shadow-[4px_4px_0_0_var(--shadow-hard)]">
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
                    formatter={(value) => [
                      `${formatCurrency(Number(value))} €`,
                      "Dépenses",
                    ]}
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
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-muted-foreground text-xs font-medium">
                  Total
                </p>
                <p className="text-xl font-bold tracking-tight">
                  {formatCurrency(totalExpenses)} €
                </p>
              </div>
            </div>

            <CategoryBreakdown data={chartData} total={totalExpenses} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
