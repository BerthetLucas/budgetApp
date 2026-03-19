"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type WithEmail = { email: string };

export function AuthEmailField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<WithEmail>();

  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="vous@exemple.com"
        autoComplete="email"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-destructive text-sm">{errors.email.message}</p>
      )}
    </div>
  );
}
