import { Transaction } from "@/types";

export type BudgetData = {
  totalIncome: number;
  totalExpenses: number;
  remaining: number;
  daysLeft: number;
  lastDay: number;
  progressPercent: number;
  perDay: number;
  perWeek: number;
};

export function computeBudget(transactions: Transaction[]): BudgetData {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const { totalIncome, totalExpenses } = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .reduce(
      (acc, t) => {
        if (t.type === "income") acc.totalIncome += t.amount;
        else acc.totalExpenses += t.amount;
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0 }
    );

  const remaining = Math.max(0, totalIncome - totalExpenses);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const daysLeft = Math.max(1, lastDay - today + 1);
  const perDay = remaining / daysLeft;

  return {
    totalIncome,
    totalExpenses,
    remaining,
    daysLeft,
    lastDay,
    progressPercent: Math.round(((today - 1) / lastDay) * 100),
    perDay,
    perWeek: perDay * 7,
  };
}
