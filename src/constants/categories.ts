export const INCOME_CATEGORIES = [
  "Salaire",
  "Freelance",
  "Investissements",
  "Autres",
] as const;

export const EXPENSE_CATEGORIES = [
  "Loyer",
  "Alimentation",
  "Transport",
  "Loisirs",
  "Santé",
  "Abonnements",
  "Autres",
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const CATEGORY_EMOJI: Record<string, string> = {
  Salaire: "💼",
  Freelance: "💻",
  Investissements: "📈",
  Loyer: "🏠",
  Alimentation: "🛒",
  Transport: "🚗",
  Loisirs: "🎬",
  Santé: "💊",
  Abonnements: "📱",
  Autres: "📂",
};
