import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import { TransactionsContext } from "../contexts/Transactions";

export function useTransactions() {
  return useContext(TransactionsContext);
}

export function useAuth() {
  return useContext(AuthContext);
}