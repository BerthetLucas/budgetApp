import type { Metadata } from "next";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { RecurringTransactionSettings } from "@/components/settings/recurring-transaction-settings";
import { getRecurringTransactions } from "@/actions/recurring";

export const metadata: Metadata = {
  title: "Réglages",
  description: "Configuration de vos transactions récurrentes",
};

export default async function SettingsPage() {
  const recurring = await getRecurringTransactions();

  return (
    <div className="bg-muted/30 min-h-screen">
      <main className="mx-auto max-w-md px-4 pb-20">
        <div className="flex items-start justify-between pt-10 pb-6">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
              Configuration
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Réglages</h1>
          </div>
          <ThemeToggle />
        </div>
        <Suspense
          fallback={
            <div className="bg-foreground/10 h-80 animate-pulse rounded-3xl" />
          }
        >
          <RecurringTransactionSettings initialData={recurring} />
        </Suspense>
      </main>
    </div>
  );
}
