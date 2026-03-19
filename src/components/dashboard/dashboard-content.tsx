import { getTransactions } from "@/actions/transactions";
import { checkAndApplyRecurringTransactions } from "@/actions/recurring";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export async function DashboardContent() {
  await checkAndApplyRecurringTransactions();
  const transactions = await getTransactions();
  return (
    <div className="md:grid md:grid-cols-[360px_1fr] md:items-start md:gap-6">
      <div className="md:sticky md:top-8">
        <DashboardSummary transactions={transactions} />
      </div>
      <div className="mt-4 md:mt-0">
        <DashboardTabs transactions={transactions} />
      </div>
    </div>
  );
}
