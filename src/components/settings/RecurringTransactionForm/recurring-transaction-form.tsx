"use client";

import { useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addRecurringTransaction } from "@/actions/recurring";
import { RecurringFormValues } from "./form-schema";
import { useRecurringTransactionForm } from "./useRecurringTransactionForm";
import { TypeToggleField } from "@/components/forms/fields/TypeToggleField";
import { AmountField } from "@/components/forms/fields/AmountField";
import { CategoryField } from "@/components/forms/fields/CategoryField";
import { DescriptionAndDayField } from "./fields/DescriptionAndDayField";

interface RecurringTransactionFormProps {
  onSuccess: () => void;
}

export function RecurringTransactionForm({
  onSuccess,
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
        <CategoryField />
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
