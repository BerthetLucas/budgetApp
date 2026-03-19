"use client";

import { motion } from "motion/react";
import { Trash2, Folder } from "lucide-react";
import { CATEGORY_ICON } from "@/constants/categories";
import { formatCurrency } from "@/lib/utils";
import { RecurringTransaction } from "@/types";

interface RecurringTransactionRowProps {
  recurring: RecurringTransaction;
  isPending: boolean;
  onDelete: (id: string) => void;
}

export function RecurringTransactionRow({
  recurring,
  isPending,
  onDelete,
}: RecurringTransactionRowProps) {
  const { id, category, description, type, amount, day_of_month } = recurring;
  const isIncome = type === "income";
  const Icon = CATEGORY_ICON[category] ?? Folder;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center gap-3 px-4 py-3.5"
    >
      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-medium">
          {description || category}
        </p>
        <p className="text-muted-foreground text-xs">
          le {day_of_month === 1 ? "1er" : `${day_of_month}`} du mois
        </p>
      </div>
      <span
        className={`text-sm font-bold tabular-nums ${isIncome ? "text-green-600" : "text-foreground"}`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(amount)} €
      </span>
      <button
        disabled={isPending}
        onClick={() => onDelete(id)}
        className="text-muted-foreground/40 hover:text-destructive p-1 transition-colors disabled:opacity-30"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
