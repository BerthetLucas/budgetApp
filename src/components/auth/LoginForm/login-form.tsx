"use client";

import { useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "@/actions/auth";
import { AuthEmailField } from "@/components/auth/AuthEmailField";
import { PasswordField } from "@/components/auth/PasswordField";
import { useLoginForm } from "./useLoginForm";
import { LoginFormValues } from "./form-schema";

export function LoginForm() {
  const form = useLoginForm();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(values: LoginFormValues) {
    setError(null);
    startTransition(async () => {
      try {
        await signIn(values.email, values.password);
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
        <h1 className="text-3xl font-bold tracking-tight">Connexion</h1>
        <p className="text-muted-foreground text-sm">
          Pas encore de compte ?{" "}
          <Link
            href="/auth/signup"
            className="text-foreground font-medium underline underline-offset-4"
          >
            S&apos;inscrire
          </Link>
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AuthEmailField />
          <PasswordField mode="login" />

          {error && (
            <p className="text-destructive bg-destructive/10 rounded-xl px-4 py-3 text-sm">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? "Connexion…" : "Se connecter"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
