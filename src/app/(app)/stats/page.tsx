import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { StatsContent } from "@/components/stats/stats-content";
import { StatsSkeleton } from "@/components/skeleton/stats-skeleton";

export const metadata: Metadata = {
  title: "Statistiques",
  description: "Analyse de vos dépenses et revenus",
};

export default function StatsPage() {
  return (
    <PageShell label="Analyse" title="Statistiques">
      <Suspense fallback={<StatsSkeleton />}>
        <StatsContent />
      </Suspense>
    </PageShell>
  );
}
