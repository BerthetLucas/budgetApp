"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, formatMonthLabel } from "@/lib/utils";

interface MonthNavigatorProps {
  year: number;
  month: number;
  isCurrentMonth: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function MonthNavigator({
  year,
  month,
  isCurrentMonth,
  onPrev,
  onNext,
}: MonthNavigatorProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrev}
        className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl p-2 transition-colors"
        aria-label="Mois précédent"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <h2 className="text-base font-semibold tracking-tight">
        {formatMonthLabel(year, month)}
      </h2>

      <button
        onClick={onNext}
        disabled={isCurrentMonth}
        className={cn(
          "rounded-xl p-2 transition-colors",
          isCurrentMonth
            ? "cursor-not-allowed text-muted-foreground/30"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        aria-label="Mois suivant"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
