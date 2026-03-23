"use client";

import { motion } from "motion/react";
import { slideRow } from "@/lib/motion";
import { Trash2, Folder } from "lucide-react";
import { CATEGORY_ICON, CATEGORY_COLOR } from "@/constants/categories";
import { TransactionRowProps } from "./types";
import { TransactionDescription } from "./transaction-description";
import { TransactionAmount } from "./transaction-amount";

export function TransactionRow({
  transaction,
  delay,
  isPending,
  onDelete,
}: TransactionRowProps) {
  const { category, description, type, amount, id } = transaction;
  const Icon = CATEGORY_ICON[category] ?? Folder;
  const colorClass = CATEGORY_COLOR[category] ?? "bg-gray-100 text-gray-600";

  return (
    <motion.div
      {...slideRow(delay)}
      className="flex items-center gap-3 border-b border-muted/60 px-4 py-3.5 last:border-b-0"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <TransactionDescription category={category} description={description} />
      <TransactionAmount type={type} amount={amount} />
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
