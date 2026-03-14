import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../form-schema";

export function DescriptionAndDayField() {
  const { register, formState } = useFormContext<FormValues>();

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-muted-foreground text-xs">Description</Label>
        <Input
          placeholder="Optionnel"
          className="h-12 rounded-xl"
          {...register("description")}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-muted-foreground text-xs">Jour du mois (1–28)</Label>
        <Input
          type="number"
          min="1"
          max="28"
          className="h-12 rounded-xl"
          {...register("day_of_month")}
        />
        {formState.errors.day_of_month ? (
          <p className="text-destructive text-xs">
            {formState.errors.day_of_month.message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
