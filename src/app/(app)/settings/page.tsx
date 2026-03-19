import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { RecurringTransactionSettings } from "@/components/settings/recurring-transaction-settings";
import { SettingsSkeleton } from "@/components/skeleton/settings-skeleton";
import { getRecurringTransactions } from "@/actions/recurring";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: "Réglages",
  description: "Configuration de vos transactions récurrentes",
};

async function SettingsContent() {
  const recurring = await getRecurringTransactions();
  return <RecurringTransactionSettings initialData={recurring} />;
}

export default function SettingsPage() {
  return (
    <PageShell label="Configuration" title="Réglages">
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
      <form action={signOut} className="mt-8">
        <Button
          type="submit"
          variant="destructive"
          className="h-12 w-full gap-2 rounded-xl text-base font-semibold"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </Button>
      </form>
    </PageShell>
  );
}
