import { getCategories } from "@/actions/categories";
import { AddTransactionClient } from "./add-transaction-client";

export default async function AddTransactionPage() {
  const categories = await getCategories();
  const customCategories = categories.map((c) => c.name);

  return <AddTransactionClient customCategories={customCategories} />;
}
