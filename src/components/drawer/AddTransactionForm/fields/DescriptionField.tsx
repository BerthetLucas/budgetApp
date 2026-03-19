import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { TransactionFormValues } from "../form-schema";

export function DescriptionField() {
  const { register } = useFormContext<TransactionFormValues>();

  return (
    <div className="space-y-1.5">
      <Label className="text-muted-foreground text-xs">Description</Label>
      <Input
        placeholder="Optionnel"
        className="h-12 rounded-xl"
        {...register("description")}
      />
    </div>
  );
}
