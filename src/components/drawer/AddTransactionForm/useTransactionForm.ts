import { useForm } from "react-hook-form";
import { FormValues, schema } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useTransactionForm = () =>
  useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });
