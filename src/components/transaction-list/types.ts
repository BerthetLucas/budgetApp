import { Transaction } from "@/types";

export interface TransactionRowProps {
  transaction: Transaction;
  delay: number;
  isPending: boolean;
  onDelete: (id: string) => void;
}

export interface TransactionGroupProps {
  date: string;
  transactions: Transaction[];
  baseDelay: number;
  isPending: boolean;
  onDelete: (id: string) => void;
}
