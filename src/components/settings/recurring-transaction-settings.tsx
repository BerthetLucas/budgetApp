"use client";

import { useOptimistic, useTransition } from "react";
import { AnimatePresence } from "motion/react";
import { deleteRecurringTransaction } from "@/actions/recurring";
import { RecurringTransaction } from "@/types";
import { RecurringTransactionRow } from "./recurring-transaction-row";
import { AddRecurringDrawer } from "./add-recurring-drawer";

interface RecurringTransactionSettingsProps {
  initialData: RecurringTransaction[];
}

export function RecurringTransactionSettings({
  initialData,
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
      <div className="bg-card rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <div>
            <h2 className="text-base font-semibold">Transactions récurrentes</h2>
            <p className="text-muted-foreground text-xs mt-0.5">
              Ajoutées automatiquement chaque début de mois
            </p>
          </div>
          <AddRecurringDrawer />
        </div>

        {list.length === 0 ? (
          <div className="px-4 pb-6 pt-2 text-center">
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
