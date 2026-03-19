"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";

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
        className="h-12 rounded-xl"
        {...register("email")}
      />
      <FieldError message={errors.email?.message} />
    </div>
  );
}
