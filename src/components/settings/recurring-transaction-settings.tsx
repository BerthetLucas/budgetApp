"use client";

import { useOptimistic, useTransition } from "react";
import { AnimatePresence } from "motion/react";
import { deleteRecurringTransaction } from "@/actions/recurring";
import { RecurringTransaction } from "@/types";
import { RecurringTransactionRow } from "./recurring-transaction-row";
import { AddRecurringDrawer } from "./add-recurring-drawer";

interface RecurringTransactionSettingsProps {
  initialData: RecurringTransaction[];
  customCategories?: string[];
}

export function RecurringTransactionSettings({
  initialData,
  customCategories,
}: RecurringTransactionSettingsProps) {
  const [isPending, startTransition] = useTransition();
  const [list, removeFromList] = useOptimistic(
    initialData,
    (current, idToRemove: string) =>
      current.filter((item) => item.id !== idToRemove)
  );

  function handleDelete(id: string) {
    startTransition(async () => {
      removeFromList(id);
      await deleteRecurringTransaction(id);
    });
  }

  return (
    <div className="space-y-4">
      <div className="bg-card overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <div>
            <h2 className="text-base font-semibold">
              Transactions récurrentes
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Ajoutées automatiquement chaque début de mois
            </p>
          </div>
          <AddRecurringDrawer customCategories={customCategories} />
        </div>

        {list.length === 0 ? (
          <div className="px-4 pt-2 pb-6 text-center">
            <p className="text-muted-foreground text-sm">
              Aucune transaction récurrente
            </p>
          </div>
        ) : (
          <div className="divide-border divide-y pb-2">
            <AnimatePresence>
              {list.map((item) => (
                <RecurringTransactionRow
                  key={item.id}
                  recurring={item}
                  isPending={isPending}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
