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

import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Laptop,
  TrendingUp,
  Home,
  ShoppingCart,
  Car,
  Film,
  Pill,
  Smartphone,
  Folder,
  Tag,
} from "lucide-react";

export { Tag as DEFAULT_CATEGORY_ICON };

export const CATEGORY_ICON: Record<string, LucideIcon> = {
  Salaire: Briefcase,
  Freelance: Laptop,
  Investissements: TrendingUp,
  Loyer: Home,
  Alimentation: ShoppingCart,
  Transport: Car,
  Loisirs: Film,
  Santé: Pill,
  Abonnements: Smartphone,
  Autres: Folder,
};

export const CATEGORY_COLOR: Record<string, string> = {
  Salaire: "bg-teal-100 text-teal-700",
  Freelance: "bg-blue-100 text-blue-700",
  Investissements: "bg-green-100 text-green-700",
  Loyer: "bg-orange-100 text-orange-700",
  Alimentation: "bg-amber-100 text-amber-700",
  Transport: "bg-sky-100 text-sky-700",
  Loisirs: "bg-violet-100 text-violet-700",
  Santé: "bg-rose-100 text-rose-700",
  Abonnements: "bg-indigo-100 text-indigo-700",
  Autres: "bg-gray-100 text-gray-600",
};
