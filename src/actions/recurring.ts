"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { RecurringTransaction } from "@/types";

export const getRecurringTransactions = cache(
  async (): Promise<RecurringTransaction[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("recurring_transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data ?? [];
  }
);

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

  if (error) throw new Error(error.message);

  revalidatePath("/settings");
}

export async function deleteRecurringTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("recurring_transactions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/settings");
}

export async function checkAndApplyRecurringTransactions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Utilisateur non authentifié");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { error: claimError } = await supabase
    .from("recurring_applied_months")
    .insert([{ year, month, user_id: user.id }]);

  if (claimError) return;

  const recurring = await fetchRecurringTransactions(supabase);
  if (recurring.length === 0) return;

  const transactions = buildTransactionsForMonth(
    recurring,
    user.id,
    year,
    month
  );

  const { error: insertError } = await supabase
    .from("transactions")
    .insert(transactions);
  if (insertError) throw new Error(insertError.message);
}

// ─── Helpers privés ───────────────────────────────────────────────────────────

async function fetchRecurringTransactions(
  supabase: Awaited<
    ReturnType<typeof import("@/lib/supabase/server").createClient>
  >
): Promise<RecurringTransaction[]> {
  const { data, error } = await supabase
    .from("recurring_transactions")
    .select("*");
  if (error) throw new Error(error.message);
  return data ?? [];
}

function buildTransactionsForMonth(
  recurring: RecurringTransaction[],
  userId: string,
  year: number,
  month: number
) {
  const lastDay = new Date(year, month, 0).getDate();
  return recurring.map((r) => {
    const day = Math.min(r.day_of_month, lastDay);
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return {
      type: r.type,
      category: r.category,
      amount: r.amount,
      description: r.description,
      date,
      user_id: userId,
    };
  });
}
