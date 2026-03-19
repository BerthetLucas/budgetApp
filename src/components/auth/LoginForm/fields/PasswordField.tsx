"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { LoginFormValues } from "../form-schema";

export function PasswordField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="password">Mot de passe</Label>
      <PasswordInput
        id="password"
        placeholder="••••••••"
        autoComplete="current-password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-destructive text-sm">{errors.password.message}</p>
      )}
    </div>
  );
}
