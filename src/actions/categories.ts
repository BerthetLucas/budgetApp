"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";

export const getCategories = cache(async (): Promise<Category[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return data ?? [];
});

const categorySchema = z.object({
  type: z.enum(["income", "expense"]),
  name: z.string().min(1, "Nom requis").max(50, "Nom trop long"),
});

export async function addCategory(input: { type: "income" | "expense"; name: string }) {
  const parsed = categorySchema.parse(input);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Utilisateur non authentifié");

  const { error } = await supabase
    .from("categories")
    .insert([{ ...parsed, user_id: user.id }]);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/stats");
  revalidatePath("/settings");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/stats");
  revalidatePath("/settings");
}
