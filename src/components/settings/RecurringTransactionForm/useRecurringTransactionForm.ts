import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecurringFormValues, recurringSchema } from "./form-schema";

export const useRecurringTransactionForm = () =>
  useForm<RecurringFormValues>({
    resolver: zodResolver(recurringSchema) as Resolver<RecurringFormValues>,
    defaultValues: {
      type: "expense",
      day_of_month: 1,
    },
  });
