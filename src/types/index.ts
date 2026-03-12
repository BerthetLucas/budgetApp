// Shared TypeScript types for the financial app

export type Transaction = {
  id: string;
  amount: number;
  description: string | null;
  category: string;
  date: string;
  type: "income" | "expense";
  created_at: string;
};
