"use client";

import { motion } from "motion/react";
import { slideRow } from "@/lib/motion";
import { Trash2 } from "lucide-react";
import { CATEGORY_ICON, DEFAULT_CATEGORY_ICON } from "@/constants/categories";
import { Category } from "@/types";

interface CategoryRowProps {
  category: Category;
  isPending: boolean;
  onDelete: (id: string) => void;
}

export function CategoryRow({ category, isPending, onDelete }: CategoryRowProps) {
  const { id, name, type } = category;
  const Icon = CATEGORY_ICON[name] ?? DEFAULT_CATEGORY_ICON;
  const isIncome = type === "income";

  return (
    <motion.div
      {...slideRow()}
      className="flex items-center gap-3 px-4 py-3.5"
    >
      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-medium">{name}</p>
        <p className="text-muted-foreground text-xs">
          {isIncome ? "Revenu" : "Dépense"}
        </p>
      </div>
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
