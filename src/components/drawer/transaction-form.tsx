"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, CATEGORY_EMOJI } from "@/constants/categories";
import { addTransaction } from "@/actions/transactions";

const schema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Catégorie requise"),
  amount: z.coerce.number().positive("Montant invalide"),
  description: z.string().optional(),
  date: z.string().min(1, "Date requise"),
});

type FormValues = z.infer<typeof schema>;

interface TransactionFormProps {
  onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleTypeChange(newType: "income" | "expense") {
    setType(newType);
    setValue("type", newType);
    setValue("category", "");
  }

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
        reset();
        onSuccess();
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-2xl">
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
            type === "expense"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          💸 Dépense
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
            type === "income"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          💰 Revenu
        </button>
      </div>

      {/* Montant — prominent */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Montant (€)</Label>
        <Input
          type="number"
          step="0.01"
          min="0"
          placeholder="0,00"
          className="text-2xl font-bold h-14 rounded-xl text-center"
          {...register("amount")}
        />
        {errors.amount ? (
          <p className="text-xs text-destructive">{errors.amount.message}</p>
        ) : null}
      </div>

      {/* Catégorie */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Catégorie</Label>
        <select
          value={watch("category")}
          onChange={(e) => setValue("category", e.target.value, { shouldValidate: true })}
          className="w-full rounded-xl h-12 border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 dark:bg-input/30"
        >
          <option value="" disabled>Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_EMOJI[cat]} {cat}
            </option>
          ))}
        </select>
        {errors.category ? (
          <p className="text-xs text-destructive">{errors.category.message}</p>
        ) : null}
      </div>

      {/* Description + Date sur 2 colonnes */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Description</Label>
          <Input
            placeholder="Optionnel"
            className="rounded-xl h-12"
            {...register("description")}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Date</Label>
          <Input type="date" className="rounded-xl h-12" {...register("date")} />
          {errors.date ? (
            <p className="text-xs text-destructive">{errors.date.message}</p>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 rounded-xl font-semibold text-base"
        disabled={isPending}
      >
        {isPending ? "Enregistrement..." : "Ajouter"}
      </Button>
    </form>
  );
}
