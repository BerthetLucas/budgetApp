import { Transaction } from "@/types";

export interface TransactionRowProps {
  tx: Transaction;
  delay: number;
  isPending: boolean;
  onDelete: (id: string) => void;
}

export interface TransactionGroupProps {
  date: string;
  txs: Transaction[];
  baseDelay: number;
  isPending: boolean;
  onDelete: (id: string) => void;
}
