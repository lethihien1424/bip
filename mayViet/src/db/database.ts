// Database/Storage utilities
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "food" | "transport" | "other";
}

const STORAGE_KEY = "@expenses";

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting expenses:", error);
    return [];
  }
};

export const saveExpenses = async (expenses: Expense[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Error saving expenses:", error);
  }
};

export const addExpense = async (
  expense: Omit<Expense, "id">
): Promise<void> => {
  const expenses = await getExpenses();
  const newExpense: Expense = {
    ...expense,
    id: Date.now().toString(),
  };
  await saveExpenses([...expenses, newExpense]);
};

export const updateExpense = async (
  id: string,
  updatedExpense: Omit<Expense, "id">
): Promise<void> => {
  const expenses = await getExpenses();
  const index = expenses.findIndex((e) => e.id === id);
  if (index !== -1) {
    expenses[index] = { ...updatedExpense, id };
    await saveExpenses(expenses);
  }
};

export const deleteExpense = async (id: string): Promise<void> => {
  const expenses = await getExpenses();
  const filtered = expenses.filter((e) => e.id !== id);
  await saveExpenses(filtered);
};
