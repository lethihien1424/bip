// Type definitions
export type ExpenseType = "food" | "transport" | "other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: ExpenseType;
}
