import { Suspense } from "react";
import { AddTransactionDrawer } from "@/components/drawer/add-transaction-drawer";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { SummarySkeleton } from "@/components/skeleton/summary-skeleton";
import { ListSkeleton } from "@/components/skeleton/list-skeleton";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className="max-w-md mx-auto px-4 pb-24">
        <div className="pt-10 pb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
              Tableau de bord
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Mes finances</h1>
          </div>
          <ThemeToggle />
        </div>
        <Suspense
          fallback={
            <>
              <SummarySkeleton />
              <div className="mt-6">
                <ListSkeleton />
              </div>
            </>
          }
        >
          <DashboardContent />
        </Suspense>
      </main>
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2">
        <AddTransactionDrawer />
      </div>
    </div>
  );
}
