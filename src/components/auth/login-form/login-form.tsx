"use client";

import { useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "@/actions/auth";
import { AuthEmailField } from "@/components/auth/auth-email-field";
import { PasswordField } from "@/components/auth/password-field";
import { useLoginForm } from "./useLoginForm";
import { LoginFormValues } from "./form-schema";

export function LoginForm() {
  const form = useLoginForm();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onDemoLogin() {
    setError(null);
    startTransition(async () => {
      try {
        await signIn(
          process.env.NEXT_PUBLIC_DEMO_EMAIL!,
          process.env.NEXT_PUBLIC_DEMO_PASSWORD!
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      }
    });
  }

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
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight">Connexion</h1>
        <p className="text-muted-foreground text-sm">
          Pas encore de compte ?{" "}
          <Link
            href="/auth/signup"
            className="text-primary font-medium underline underline-offset-4"
          >
            S&apos;inscrire
          </Link>
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <AuthEmailField />
          <PasswordField mode="login" />

          {error && (
            <p className="text-destructive bg-destructive/10 rounded-xl px-4 py-3 text-sm">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="mt-1 h-12 w-full rounded-xl text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? "Connexion…" : "Se connecter"}
          </Button>

          <div className="relative my-2 flex items-center gap-3">
            <div className="border-border h-px flex-1 border-t" />
            <span className="text-muted-foreground text-xs">ou</span>
            <div className="border-border h-px flex-1 border-t" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-xl text-base font-semibold"
            disabled={isPending}
            onClick={onDemoLogin}
          >
            {isPending ? "Connexion…" : "Accès démo"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
