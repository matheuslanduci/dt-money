import { createContext } from "react";
import {
  TransactionItemProps,
  NewTransactionInput
} from "../containers/TransactionsProvider";

interface TransactionContextData {
  transactions: TransactionItemProps[];
  createTransaction: (transaction: NewTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);
