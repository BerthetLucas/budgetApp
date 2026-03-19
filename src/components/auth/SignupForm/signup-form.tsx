"use client";

import { useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signUp } from "@/actions/auth";
import { AuthEmailField } from "@/components/auth/AuthEmailField";
import { useSignupForm } from "./useSignupForm";
import { PasswordField } from "./fields/PasswordField";
import { SignupFormValues } from "./form-schema";

export function SignupForm() {
  const form = useSignupForm();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function onSubmit(values: SignupFormValues) {
    setError(null);
    startTransition(async () => {
      try {
        await signUp(values.email, values.password);
        setSuccess(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Créer un compte</h1>
        <p className="text-muted-foreground text-sm">
          Déjà un compte ?{" "}
          <Link
            href="/auth/login"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Se connecter
          </Link>
        </p>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AuthEmailField />
          <PasswordField />
          {error && (
            <p className="text-destructive text-sm rounded-lg bg-destructive/10 px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-2">
              Compte créé ! Vérifiez votre email puis connectez-vous.
            </p>
          )}
          <Button type="submit" className="w-full mt-2" size="lg" disabled={isPending}>
            {isPending ? "Création…" : "Créer mon compte"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
