import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { BudgetContent } from "@/components/budget/budget-content";
import { BudgetSkeleton } from "@/components/skeleton/budget-skeleton";

export const metadata: Metadata = {
  title: "Budget",
  description: "Budget restant par jour et par semaine",
};

export default function BudgetPage() {
  return (
    <PageShell label="Ce mois-ci" title="Budget">
      <Suspense fallback={<BudgetSkeleton />}>
        <BudgetContent />
      </Suspense>
    </PageShell>
  );
}
