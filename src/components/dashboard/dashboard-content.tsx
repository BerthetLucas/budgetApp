import { getTransactions } from "@/actions/transactions";
import { checkAndApplyRecurringTransactions } from "@/actions/recurring";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export async function DashboardContent() {
  await checkAndApplyRecurringTransactions();
  const transactions = await getTransactions();
  return (
    <>
      <DashboardSummary transactions={transactions} />
      <div className="mt-6">
        <DashboardTabs transactions={transactions} />
      </div>
    </>
  );
}
