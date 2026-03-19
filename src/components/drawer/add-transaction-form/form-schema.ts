import z from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Catégorie requise"),
  amount: z.coerce.number().positive("Montant invalide"),
  description: z.string().optional(),
  date: z.string().min(1, "Date requise"),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
