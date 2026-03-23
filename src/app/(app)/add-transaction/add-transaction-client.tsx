"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TransactionForm } from "@/components/drawer/add-transaction-form/transaction-form";

interface AddTransactionClientProps {
  customCategories: string[];
}

export function AddTransactionClient({ customCategories }: AddTransactionClientProps) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-10">
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-border bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-muted-foreground mb-0.5 text-xs font-medium tracking-widest uppercase">
            Transaction
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Nouvelle transaction</h1>
        </div>
      </div>
      <TransactionForm onSuccess={() => router.push("/")} customCategories={customCategories} />
    </div>
  );
}
