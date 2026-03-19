import { getTransactions } from "@/actions/transactions";
import { ExpensesChart } from "@/components/expenses-chart";

export async function StatsContent() {
  const transactions = await getTransactions();
  return <ExpensesChart transactions={transactions} />;
}
