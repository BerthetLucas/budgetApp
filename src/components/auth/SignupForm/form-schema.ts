import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .min(6, "Mot de passe trop court (6 caractères minimum)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
