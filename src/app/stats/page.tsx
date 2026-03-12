import { Suspense } from "react";
import { getTransactions } from "@/actions/transactions";
import { ExpensesChart } from "@/components/expenses-chart";
import { ThemeToggle } from "@/components/theme-toggle";

async function StatsContent() {
  const transactions = await getTransactions();
  return <ExpensesChart transactions={transactions} />;
}

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="max-w-md mx-auto px-4 pb-20">
        <div className="pt-10 pb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
              Analyse
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
          </div>
          <ThemeToggle />
        </div>
        <Suspense
          fallback={
            <div className="h-80 rounded-3xl bg-foreground/10 animate-pulse" />
          }
        >
          <StatsContent />
        </Suspense>
      </main>
    </div>
  );
}
