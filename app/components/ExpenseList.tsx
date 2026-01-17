"use client";

import { formattedDate } from "../lib/expenses";
import type { Expense } from "../lib/expenses";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return <div className="list-empty">No expenses yet. Add your first entry above.</div>;
  }

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Date</th>
            <th style={{ textAlign: "right" }}>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>
                <span className="badge">{expense.category}</span>
              </td>
              <td>{formattedDate(expense.createdAt)}</td>
              <td className="amount" style={{ textAlign: "right" }}>
                ${expense.amount.toFixed(2)}
              </td>
              <td style={{ textAlign: "right" }}>
                <button
                  onClick={() => onDelete(expense.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(248, 250, 252, 0.5)",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                  aria-label={`Delete ${expense.description}`}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
