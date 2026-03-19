import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { FieldError } from "@/components/ui/field-error";
import type { TransactionFormValues } from "@/components/drawer/add-transaction-form/form-schema";
import type { RecurringFormValues } from "@/components/settings/recurring-transaction-form/form-schema";

export function AmountField() {
  const { register, formState } = useFormContext<TransactionFormValues | RecurringFormValues>();

  return (
    <div className="space-y-1.5">
      <Label className="text-muted-foreground text-xs">Montant (€)</Label>
      <Input
        type="number"
        step="0.01"
        min="0"
        placeholder="0,00"
        className="h-14 rounded-xl text-center text-2xl font-bold"
        {...register("amount")}
      />
      <FieldError message={formState.errors.amount?.message} />
    </div>
  );
}
