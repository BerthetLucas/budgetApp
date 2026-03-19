import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { RecurringTransactionSettings } from "@/components/settings/recurring-transaction-settings";
import { CategorySettings } from "@/components/settings/category-settings";
import { SettingsSkeleton } from "@/components/skeleton/settings-skeleton";
import { getRecurringTransactions } from "@/actions/recurring";
import { getCategories } from "@/actions/categories";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: "Réglages",
  description: "Configuration de vos transactions récurrentes",
};

async function SettingsContent() {
  const [recurring, categories] = await Promise.all([
    getRecurringTransactions(),
    getCategories(),
  ]);
  const customCategories = categories.map((c) => c.name);
  return (
    <RecurringTransactionSettings
      initialData={recurring}
      customCategories={customCategories}
    />
  );
}

async function CategoryContent() {
  const categories = await getCategories();
  return <CategorySettings initialData={categories} />;
}

export default function SettingsPage() {
  return (
    <PageShell label="Configuration" title="Réglages">
      <div className="flex flex-col gap-10">
        <Suspense fallback={<SettingsSkeleton />}>
          <SettingsContent />
        </Suspense>
        <Suspense fallback={<SettingsSkeleton />}>
          <CategoryContent />
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
      </div>
    </PageShell>
  );
}
