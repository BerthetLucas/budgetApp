"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { TransactionFormValues } from "@/components/drawer/AddTransactionForm/form-schema";
import type { RecurringFormValues } from "@/components/settings/RecurringTransactionForm/form-schema";

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
        className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
          type === "expense"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground"
        }`}
      >
        💸 Dépense
      </button>
      <button
        type="button"
        onClick={() => handleChange("income")}
        className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
          type === "income"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground"
        }`}
      >
        💰 Revenu
      </button>
    </div>
  );
}
