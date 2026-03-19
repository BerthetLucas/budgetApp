"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/PasswordInput";

interface PasswordFieldProps {
  mode: "login" | "signup";
}

type WithPassword = { password: string; confirmPassword?: string };

export function PasswordField({ mode }: PasswordFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<WithPassword>();

  const passwordErrors = errors.password as { message?: string } | undefined;
  const confirmErrors = errors.confirmPassword as
    | { message?: string }
    | undefined;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          {...register("password")}
        />
        {passwordErrors?.message && (
          <p className="text-destructive text-sm">{passwordErrors.message}</p>
        )}
      </div>

      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {confirmErrors?.message && (
            <p className="text-destructive text-sm">{confirmErrors.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
