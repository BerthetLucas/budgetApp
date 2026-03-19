import type { Metadata } from "next";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { RecurringTransactionSettings } from "@/components/settings/recurring-transaction-settings";
import { getRecurringTransactions } from "@/actions/recurring";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

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
        <form action={signOut} className="mt-8">
          <Button
            type="submit"
            variant="outline"
            className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </Button>
        </form>
      </main>
    </div>
  );
}
