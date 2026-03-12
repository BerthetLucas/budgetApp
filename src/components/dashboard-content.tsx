import { getTransactions } from "@/actions/transactions";
import { DashboardSummary } from "@/components/dashboard-summary";
import { DashboardTabs } from "@/components/dashboard-tabs";

export async function DashboardContent() {
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
