"use client";

import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import { CATEGORY_EMOJI } from "@/constants/categories";
import { formatCurrency } from "@/lib/utils";
import { TransactionRowProps } from "./types";

export function TransactionRow({ tx, delay, isPending, onDelete }: TransactionRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0 }}
      transition={{ duration: 0.25, delay, ease: "easeOut" }}
      className="flex items-center gap-3 px-4 py-3.5"
    >
      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-lg shrink-0">
        {CATEGORY_EMOJI[tx.category] ?? "📂"}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight">{tx.category}</p>
        {tx.description ? (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {tx.description}
          </p>
        ) : null}
      </div>

      <span
        className={`text-sm font-bold tabular-nums ${
          tx.type === "income" ? "text-green-600" : "text-foreground"
        }`}
      >
        {tx.type === "income" ? "+" : "-"}
        {formatCurrency(tx.amount)} €
      </span>

      <button
        disabled={isPending}
        onClick={() => onDelete(tx.id)}
        className="text-muted-foreground/40 hover:text-destructive transition-colors disabled:opacity-30 p-1"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
