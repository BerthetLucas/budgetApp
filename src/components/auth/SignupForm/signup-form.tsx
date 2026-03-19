"use client";

import { useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signUp } from "@/actions/auth";
import { AuthEmailField } from "@/components/auth/AuthEmailField";
import { PasswordField } from "@/components/auth/PasswordField";
import { useSignupForm } from "./useSignupForm";
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
    <div className="space-y-8">
      <div className="space-y-1.5">
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
          <PasswordField mode="signup" />

          {error && (
            <p className="text-destructive bg-destructive/10 rounded-xl px-4 py-3 text-sm">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
              Compte créé ! Vérifiez votre email puis connectez-vous.
            </p>
          )}

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? "Création…" : "Créer mon compte"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
