import type { Metadata } from "next";
import { Suspense } from "react";
import { BudgetContent } from "@/components/budget/budget-content";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Budget",
  description: "Budget restant par jour et par semaine",
};

export default function BudgetPage() {
  return (
    <div className="bg-muted/30 min-h-screen">
      <main className="mx-auto max-w-md px-4 pb-20">
        <div className="flex items-start justify-between pt-10 pb-6">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
              Ce mois-ci
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Budget</h1>
          </div>
          <ThemeToggle />
        </div>
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="bg-foreground/10 h-44 animate-pulse rounded-3xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-foreground/10 h-28 animate-pulse rounded-3xl" />
                <div className="bg-foreground/10 h-28 animate-pulse rounded-3xl" />
              </div>
              <div className="bg-foreground/10 h-20 animate-pulse rounded-3xl" />
            </div>
          }
        >
          <BudgetContent />
        </Suspense>
      </main>
    </div>
  );
}
