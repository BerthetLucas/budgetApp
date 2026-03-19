"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { addCategory } from "@/actions/categories";
import { FieldError } from "@/components/ui/field-error";

const schema = z.object({
  type: z.enum(["income", "expense"]),
  name: z.string().min(1, "Nom requis").max(50, "Nom trop long"),
});

type TransactionType = "income" | "expense";

interface AddCategoryFormProps {
  onSuccess?: () => void;
}

export function AddCategoryForm({ onSuccess }: AddCategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState<TransactionType>("expense");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = schema.safeParse({ type, name });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError(null);
    startTransition(async () => {
      await addCategory(result.data);
      setName("");
      onSuccess?.();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 px-4 pt-3 pb-5">
      <div className="flex gap-2">
        {(["expense", "income"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition-colors ${
              type === t
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {t === "expense" ? "Dépense" : "Revenu"}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de la catégorie"
          className="border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-12 w-full rounded-xl border bg-transparent px-4 text-sm outline-none focus-visible:ring-3 disabled:opacity-50"
        />
        <FieldError message={error ?? undefined} />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-foreground text-background h-12 w-full rounded-xl text-sm font-semibold transition-opacity disabled:opacity-50"
      >
        {isPending ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}
