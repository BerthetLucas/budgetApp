"use client";

import { motion } from "motion/react";
import { Trash2, Folder } from "lucide-react";
import { CATEGORY_ICON } from "@/constants/categories";
import { TransactionRowProps } from "./types";
import { TransactionDescription } from "./transactionDescription";
import { TransactionAmount } from "./transaction-amount";

export function TransactionRow({
  transaction,
  delay,
  isPending,
  onDelete,
}: TransactionRowProps) {
  const { category, description, type, amount, id } = transaction;
  const Icon = CATEGORY_ICON[category] ?? Folder;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0 }}
      transition={{ duration: 0.25, delay, ease: "easeOut" }}
      className="flex items-center gap-3 px-4 py-3.5"
    >
      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
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
