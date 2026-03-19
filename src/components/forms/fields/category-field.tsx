import { Label } from "@/components/ui/label";
import { useFormContext, useWatch } from "react-hook-form";
import { FieldError } from "@/components/ui/field-error";
import type { TransactionFormValues } from "@/components/drawer/add-transaction-form/form-schema";
import type { RecurringFormValues } from "@/components/settings/recurring-transaction-form/form-schema";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/constants/categories";
import { ChangeEvent } from "react";

interface CategoryFieldProps {
  customCategories?: string[];
}

export function CategoryField({ customCategories = [] }: CategoryFieldProps) {
  const { setValue, formState, control } =
    useFormContext<TransactionFormValues | RecurringFormValues>();
  const type = useWatch({ control, name: "type" });
  const defaults = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const categories = [...defaults, ...customCategories.filter((c) => !defaults.includes(c as never))];
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
            {cat}
          </option>
        ))}
      </select>
      <FieldError message={formState.errors.category?.message} />
    </div>
  );
}
