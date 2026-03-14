import { Label } from "@/components/ui/label";
import { useFormContext, useWatch } from "react-hook-form";
import type { TransactionFormValues } from "@/components/drawer/AddTransactionForm/form-schema";
import type { RecurringFormValues } from "@/components/settings/RecurringTransactionForm/form-schema";
import {
  CATEGORY_EMOJI,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/constants/categories";
import { ChangeEvent } from "react";

export function CategoryField() {
  const { setValue, formState, getValues, control } =
    useFormContext<TransactionFormValues | RecurringFormValues>();
  const type = getValues("type");
  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const category = useWatch({ control, name: "category" });

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue("category", e.target.value, { shouldValidate: true });
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-muted-foreground text-xs">Catégorie</Label>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 text-md h-12 w-full rounded-xl border bg-transparent px-5 outline-none focus-visible:ring-3 disabled:opacity-50"
      >
        <option value="" disabled>
          Choisir une catégorie
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {CATEGORY_EMOJI[cat]} {cat}
          </option>
        ))}
      </select>
      {formState.errors.category ? (
        <p className="text-destructive text-xs">
          {formState.errors.category.message}
        </p>
      ) : null}
    </div>
  );
}
