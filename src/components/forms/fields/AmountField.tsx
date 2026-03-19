import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { TransactionFormValues } from "@/components/drawer/AddTransactionForm/form-schema";
import type { RecurringFormValues } from "@/components/settings/RecurringTransactionForm/form-schema";

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
      {formState.errors.amount ? (
        <p className="text-destructive text-xs">
          {formState.errors.amount.message}
        </p>
      ) : null}
    </div>
  );
}
