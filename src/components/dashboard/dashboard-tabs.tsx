"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TransactionList } from "@/components/transaction-list";
import { Transaction } from "@/types";

interface DashboardTabsProps {
  transactions: Transaction[];
}

export function DashboardTabs({ transactions }: DashboardTabsProps) {
  const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
  const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");

  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full">
        <TabsTrigger value="all">Tout</TabsTrigger>
        <TabsTrigger value="income">Revenus</TabsTrigger>
        <TabsTrigger value="expense">Dépenses</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <TransactionList transactions={transactions} />
      </TabsContent>
      <TabsContent value="income" className="mt-4">
        <TransactionList transactions={incomeTransactions} />
      </TabsContent>
      <TabsContent value="expense" className="mt-4">
        <TransactionList transactions={expenseTransactions} />
      </TabsContent>
    </Tabs>
  );
}
