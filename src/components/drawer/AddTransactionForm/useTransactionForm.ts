import { useForm, Resolver } from "react-hook-form";
import { TransactionFormValues, transactionSchema } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useTransactionForm = () =>
  useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema) as Resolver<TransactionFormValues>,
    defaultValues: {
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });
