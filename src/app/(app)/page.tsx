import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { AddTransactionDrawer } from "@/components/drawer/add-transaction-drawer";
import { SummarySkeleton } from "@/components/skeleton/summary-skeleton";
import { ListSkeleton } from "@/components/skeleton/list-skeleton";
import { getCategories } from "@/actions/categories";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const categories = await getCategories();
  const customCategories = categories.map((c) => c.name);

  return (
    <PageShell
      label="Tableau de bord"
      title="Mes finances"
      paddingBottom="pb-24"
      headerAction={
        <div className="hidden md:block">
          <AddTransactionDrawer customCategories={customCategories} />
        </div>
      }
      footer={
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 md:hidden">
          <Link href="/add-transaction">
            <Button variant="pill" size="pill">
              <Plus className="h-5 w-5" />
              Ajouter
            </Button>
          </Link>
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
