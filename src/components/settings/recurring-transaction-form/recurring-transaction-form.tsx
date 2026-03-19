"use client";

import { useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addRecurringTransaction } from "@/actions/recurring";
import { RecurringFormValues } from "./form-schema";
import { useRecurringTransactionForm } from "./useRecurringTransactionForm";
import { TypeToggleField } from "@/components/forms/fields/type-toggle-field";
import { AmountField } from "@/components/forms/fields/amount-field";
import { CategoryField } from "@/components/forms/fields/category-field";
import { DescriptionAndDayField } from "./fields/description-and-day-field";

interface RecurringTransactionFormProps {
  onSuccess: () => void;
  customCategories?: string[];
}

export function RecurringTransactionForm({
  onSuccess,
  customCategories,
}: RecurringTransactionFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useRecurringTransactionForm();

  function onSubmit(values: RecurringFormValues) {
    startTransition(async () => {
      try {
        await addRecurringTransaction({
          type: values.type,
          category: values.category,
          amount: values.amount,
          description: values.description ?? null,
          day_of_month: values.day_of_month,
        });
        form.reset();
        onSuccess();
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <TypeToggleField />
        <AmountField />
        <CategoryField customCategories={customCategories} />
        <DescriptionAndDayField />
        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-base font-semibold"
          disabled={isPending}
        >
          {isPending ? "Enregistrement..." : "Ajouter"}
        </Button>
      </form>
    </FormProvider>
  );
}
