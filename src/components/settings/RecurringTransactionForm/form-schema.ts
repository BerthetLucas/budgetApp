import z from "zod";

export const recurringSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Catégorie requise"),
  amount: z.coerce.number().positive("Montant invalide"),
  description: z.string().optional(),
  day_of_month: z.coerce
    .number()
    .int()
    .min(1, "Jour invalide")
    .max(28, "Maximum 28"),
});

export type RecurringFormValues = z.infer<typeof recurringSchema>;
