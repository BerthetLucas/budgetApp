"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { RecurringTransaction } from "@/types";

const getRecurringTransactionsCached = cache(
  async (): Promise<RecurringTransaction[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("recurring_transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching recurring transactions:", error);
      return [];
    }

    return data ?? [];
  }
);

export async function getRecurringTransactions(): Promise<
  RecurringTransaction[]
> {
  return getRecurringTransactionsCached();
}

export async function addRecurringTransaction(
  input: Omit<RecurringTransaction, "id" | "created_at">
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Utilisateur non authentifié");

  const { error } = await supabase
    .from("recurring_transactions")
    .insert([{ ...input, user_id: user.id }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/settings");
}

export async function deleteRecurringTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("recurring_transactions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/settings");
}

export async function checkAndApplyRecurringTransactions() {
  const supabase = await createClient();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // Early return before any user fetch — most common path when already applied this month
  const { data: existing } = await supabase
    .from("recurring_applied_months")
    .select("id")
    .eq("year", year)
    .eq("month", month)
    .maybeSingle();

  if (existing) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Utilisateur non authentifié");

  const { data: recurring, error: fetchError } = await supabase
    .from("recurring_transactions")
    .select("*");

  if (fetchError) {
    console.error("Error fetching recurring transactions:", fetchError);
    return;
  }

  if (!recurring || recurring.length === 0) return;

  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const transactions = (recurring as RecurringTransaction[]).map((r) => {
    const day = Math.min(r.day_of_month, lastDayOfMonth);
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return {
      type: r.type,
      category: r.category,
      amount: r.amount,
      description: r.description,
      date,
      user_id: user.id,
    };
  });

  const { error: insertError } = await supabase
    .from("transactions")
    .insert(transactions);

  if (insertError) {
    console.error("Error inserting recurring transactions:", insertError);
    return;
  }

  await supabase
    .from("recurring_applied_months")
    .insert([{ year, month, user_id: user.id }]);

  revalidatePath("/");
  revalidatePath("/stats");
}
