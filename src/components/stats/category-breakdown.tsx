"use client";

import { motion } from "motion/react";
import { slideRow } from "@/lib/motion";
import { formatCurrency } from "@/lib/utils";

interface CategoryEntry {
  name: string;
  value: number;
  fill: string;
  icon: React.ElementType;
}

interface CategoryBreakdownProps {
  data: CategoryEntry[];
  total: number;
}

export function CategoryBreakdown({ data, total }: CategoryBreakdownProps) {
  return (
    <div className="bg-background divide-y overflow-hidden rounded-2xl border shadow-sm">
      {data.map((entry, index) => {
        const pct = total > 0 ? Math.round((entry.value / total) * 100) : 0;
        const Icon = entry.icon;
        return (
          <motion.div
            key={entry.name}
            {...slideRow(index * 0.05)}
            className="flex items-center gap-3 px-4 py-3.5"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: entry.fill }}
            />
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{entry.name}</p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {pct}% du total
              </p>
            </div>
            <span className="text-sm font-bold tabular-nums">
              {formatCurrency(entry.value)} €
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
