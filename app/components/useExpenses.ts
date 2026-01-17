"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Expense,
  ExpenseCategory,
  calculateTotals,
  aggregateWeekly,
  categoryBreakdown,
  createExpense,
  seedExpenses
} from "../lib/expenses";

const STORAGE_KEY = "dashboard-expenses";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Expense[] = JSON.parse(stored);
        setExpenses(parsed);
      } catch (error) {
        console.error("Failed to parse expenses store", error);
        setExpenses(seedExpenses());
      }
    } else {
      setExpenses(seedExpenses());
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses, ready]);

  const totals = useMemo(() => calculateTotals(expenses), [expenses]);
  const weekly = useMemo(() => aggregateWeekly(expenses), [expenses]);
  const categories = useMemo(() => categoryBreakdown(expenses), [expenses]);

  function addExpense(input: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    createdAt: string;
  }) {
    setExpenses((prev) => [createExpense(input), ...prev]);
  }

  function deleteExpense(id: string) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  return {
    expenses,
    totals,
    weekly,
    categories,
    ready,
    addExpense,
    deleteExpense
  };
}
