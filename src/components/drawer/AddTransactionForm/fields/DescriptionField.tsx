import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../form-schema";

export function DescriptionField() {
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
        <Label className="text-muted-foreground text-xs">Date</Label>
        <Input type="date" className="h-12 rounded-xl" {...register("date")} />
        {formState.errors.date ? (
          <p className="text-destructive text-xs">
            {formState.errors.date.message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
