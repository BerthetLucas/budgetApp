"use client";

import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TransactionList } from "@/components/transaction-list";
import { Transaction } from "@/types";

interface DashboardTabsProps {
  transactions: Transaction[];
}

export function DashboardTabs({ transactions }: DashboardTabsProps) {
  const incomeTransactions = useMemo(
    () => transactions.filter((t) => t.type === "income"),
    [transactions]
  );
  const expenseTransactions = useMemo(
    () => transactions.filter((t) => t.type === "expense"),
    [transactions]
  );

  return (
    <Tabs defaultValue="all">
      <TabsList>
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
