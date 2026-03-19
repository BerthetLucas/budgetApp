"use client";

import { useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addTransaction } from "@/actions/transactions";
import { TransactionFormValues } from "./form-schema";
import { useTransactionForm } from "./useTransactionForm";
import { TypeToggleField } from "@/components/forms/fields/type-toggle-field";
import { AmountField } from "@/components/forms/fields/amount-field";
import { CategoryField } from "@/components/forms/fields/category-field";
import { DescriptionField } from "./fields/description-field";
import { DateField } from "./fields/date-field";

interface TransactionFormProps {
  onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useTransactionForm();

  function onSubmit(values: TransactionFormValues) {
    setError(null);
    startTransition(async () => {
      try {
        await addTransaction({
          type: values.type,
          category: values.category,
          amount: values.amount,
          description: values.description ?? null,
          date: values.date,
        });
        form.reset();
        onSuccess();
      } catch {
        setError("Une erreur est survenue, veuillez réessayer.");
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <TypeToggleField />
        <AmountField />
        <CategoryField />
        <DescriptionField />
        <DateField />
        {error ? <p className="text-destructive text-sm">{error}</p> : null}
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
