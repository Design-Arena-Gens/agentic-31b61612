"use client";

import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { SummarySection } from "./components/SummarySection";
import { useExpenses } from "./components/useExpenses";

export default function Page() {
  const { expenses, totals, weekly, categories, ready, addExpense, deleteExpense } = useExpenses();

  if (!ready) {
    return (
      <main style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading dashboard…</div>
      </main>
    );
  }

  return (
    <main className="grid" style={{ gap: "2rem" }}>
      <header className="grid" style={{ gap: "0.75rem" }}>
        <p className="badge" style={{ width: "fit-content" }}>Daily Expenses</p>
        <h1 style={{ fontSize: "3rem", letterSpacing: "-0.03em" }}>Spending Overview</h1>
        <p>Capture daily purchases, monitor weekly trends, and instantly understand where your money goes.</p>
      </header>

      <ExpenseForm onSubmit={addExpense} />

      <SummarySection totals={totals} weekly={weekly} categories={categories} expenses={expenses} />

      <section className="grid" style={{ gap: "1.25rem" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Recent Activity</h2>
        <ExpenseList expenses={expenses.slice(0, 8)} onDelete={deleteExpense} />
      </section>
    </main>
  );
}
