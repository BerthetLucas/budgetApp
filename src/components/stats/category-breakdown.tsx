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
    <div className="bg-card overflow-hidden rounded-2xl border border-border shadow-[3px_3px_0_0_var(--shadow-hard)]">
      {data.map((entry, index) => {
        const pct = total > 0 ? Math.round((entry.value / total) * 100) : 0;
        const Icon = entry.icon;
        return (
          <motion.div
            key={entry.name}
            {...slideRow(index * 0.05)}
            className="flex items-center gap-3 border-b border-muted/60 px-4 py-3.5 last:border-b-0"
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
              <div className="mt-1.5 flex items-center gap-2">
                <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: entry.fill }}
                  />
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">{pct}%</span>
              </div>
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
