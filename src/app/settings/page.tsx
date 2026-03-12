import type { Metadata } from "next";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Statistiques",
  description: "Analyse de vos dépenses et revenus",
};

export default function SettingsPage() {
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
        ></Suspense>
      </main>
    </div>
  );
}
