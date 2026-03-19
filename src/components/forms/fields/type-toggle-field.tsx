"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { TransactionFormValues } from "@/components/drawer/add-transaction-form/form-schema";
import type { RecurringFormValues } from "@/components/settings/recurring-transaction-form/form-schema";

export function TypeToggleField() {
  const { setValue, control } = useFormContext<TransactionFormValues | RecurringFormValues>();
  const type = useWatch({ control, name: "type" });

  function handleChange(newType: "income" | "expense") {
    setValue("type", newType);
    setValue("category", "");
  }

  return (
    <div className="bg-muted grid grid-cols-2 gap-2 rounded-2xl p-1">
      <button
        type="button"
        onClick={() => handleChange("expense")}
        className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-all ${
          type === "expense"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground"
        }`}
      >
        <TrendingDown className="h-4 w-4" />
        Dépense
      </button>
      <button
        type="button"
        onClick={() => handleChange("income")}
        className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-all ${
          type === "income"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground"
        }`}
      >
        <TrendingUp className="h-4 w-4" />
        Revenu
      </button>
    </div>
  );
}
