import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { TransactionFormValues } from "../form-schema";

export function DateField() {
  const { register, formState } = useFormContext<TransactionFormValues>();

  return (
    <div className="space-y-1.5">
      <Label className="text-muted-foreground text-xs">Date</Label>
      <Input type="date" className="h-12 rounded-xl" {...register("date")} />
      {formState.errors.date ? (
        <p className="text-destructive text-xs">
          {formState.errors.date.message}
        </p>
      ) : null}
    </div>
  );
}
