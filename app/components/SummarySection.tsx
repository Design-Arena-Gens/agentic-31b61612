"use client";

import type { Expense } from "../lib/expenses";

interface Props {
  totals: { total: number; today: number; thisWeek: number };
  weekly: { day: string; amount: number }[];
  categories: { category: string; amount: number }[];
  expenses: Expense[];
}

export function SummarySection({ totals, weekly, categories, expenses }: Props) {
  const averageDaily = totals.total / Math.max(new Set(expenses.map((expense) => expense.createdAt.slice(0, 10))).size, 1);
  const topCategory = categories[0];

  return (
    <div className="grid" style={{ gap: "1.5rem" }}>
      <section className="grid summary">
        <div className="card">
          <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.75rem" }}>Total Spend</p>
          <h2 style={{ fontSize: "2.25rem", marginTop: "0.5rem" }}>${totals.total.toFixed(2)}</h2>
          <p style={{ marginTop: "0.75rem" }}>All-time expenses tracked</p>
        </div>
        <div className="card">
          <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.75rem" }}>Today</p>
          <h2 style={{ fontSize: "2.25rem", marginTop: "0.5rem" }}>${totals.today.toFixed(2)}</h2>
          <p style={{ marginTop: "0.75rem" }}>Amount recorded for the current day</p>
        </div>
        <div className="card">
          <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.75rem" }}>This Week</p>
          <h2 style={{ fontSize: "2.25rem", marginTop: "0.5rem" }}>${totals.thisWeek.toFixed(2)}</h2>
          <p style={{ marginTop: "0.75rem" }}>Total spend in the last 7 days</p>
        </div>
        <div className="card">
          <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.75rem" }}>Daily Average</p>
          <h2 style={{ fontSize: "2.25rem", marginTop: "0.5rem" }}>${averageDaily.toFixed(2)}</h2>
          <p style={{ marginTop: "0.75rem" }}>Average spend per active day</p>
        </div>
      </section>

      <section className="grid" style={{ gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: "1.5rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Last 7 Days</h3>
          <div className="metric-chart">
            {weekly.map((day) => {
              const max = Math.max(...weekly.map((item) => item.amount), 50);
              const height = max === 0 ? 0 : Math.max((day.amount / max) * 100, 8);
              return (
                <div className="bar" key={day.day}>
                  <div className="fill" style={{ height: `${height}%` }} />
                  <span>${day.amount.toFixed(0)}</span>
                  <div className="label">{day.day}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card" style={{ display: "grid", gap: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem" }}>Top Category</h3>
            {topCategory ? (
              <p style={{ marginTop: "0.5rem", fontSize: "1.75rem", color: "var(--accent)" }}>
                {topCategory.category}
              </p>
            ) : (
              <p>No category data yet.</p>
            )}
          </div>
          <div>
            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(148, 163, 184, 0.7)" }}>
              Breakdown
            </h4>
            <div style={{ display: "grid", gap: "0.75rem", marginTop: "0.75rem" }}>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category.category} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{category.category}</span>
                    <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                      ${category.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p>No spending yet</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
