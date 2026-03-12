"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { Transaction } from "@/types";

const getTransactionsCached = cache(async (): Promise<Transaction[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return data ?? [];
});

export async function getTransactions(): Promise<Transaction[]> {
  return getTransactionsCached();
}

export async function addTransaction(
  input: Omit<Transaction, "id" | "created_at">
) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert([input]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/stats");
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/stats");
}
