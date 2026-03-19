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
