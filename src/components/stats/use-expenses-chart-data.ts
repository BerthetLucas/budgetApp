import { Folder } from "lucide-react";
import { Transaction } from "@/types";
import { CATEGORY_ICON } from "@/constants/categories";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export function useExpensesChartData(
  transactions: Transaction[],
  year: number,
  month: number
) {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
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
      icon: CATEGORY_ICON[category] ?? Folder,
    }));

  const totalExpenses = chartData.reduce((sum, d) => sum + d.value, 0);

  return { chartData, totalExpenses };
}
