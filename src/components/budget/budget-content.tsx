import { getTransactions } from "@/actions/transactions";
import { BudgetView } from "@/components/budget/budget-view";

export async function BudgetContent() {
  const transactions = await getTransactions();
  return <BudgetView transactions={transactions} />;
}
