import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { AddTransactionDrawer } from "@/components/drawer/add-transaction-drawer";
import { SummarySkeleton } from "@/components/skeleton/summary-skeleton";
import { ListSkeleton } from "@/components/skeleton/list-skeleton";

export default function Home() {
  return (
    <PageShell
      label="Tableau de bord"
      title="Mes finances"
      paddingBottom="pb-24"
      footer={
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2">
          <AddTransactionDrawer />
        </div>
      }
    >
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
    </PageShell>
  );
}
