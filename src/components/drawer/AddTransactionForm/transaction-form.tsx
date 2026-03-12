"use client";

import { useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addTransaction } from "@/actions/transactions";
import { FormValues } from "./form-schema";
import { useTransactionForm } from "./useTransactionForm";
import { TypeToggleField } from "./fields/TypeToggleField";
import { AmountField } from "./fields/AmountField";
import { CategoryField } from "./fields/CategoryField";
import { DescriptionField } from "./fields/DescriptionField";

interface TransactionFormProps {
  onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useTransactionForm();

  function onSubmit(values: FormValues) {
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
        <DescriptionField />
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
