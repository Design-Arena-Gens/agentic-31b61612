"use client";

import { useState } from "react";
import type { ExpenseCategory } from "../lib/expenses";

const categories: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Other"
];

interface Props {
  onSubmit: (data: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    createdAt: string;
  }) => void;
}

const initialState = {
  description: "",
  amount: "",
  category: "Food" as ExpenseCategory,
  date: new Date().toISOString().slice(0, 10)
};

export function ExpenseForm({ onSubmit }: Props) {
  const [form, setForm] = useState(initialState);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.description.trim() || Number(form.amount) <= 0) {
      return;
    }
    onSubmit({
      description: form.description.trim(),
      amount: Number(Number(form.amount).toFixed(2)),
      category: form.category,
      createdAt: new Date(form.date).toISOString()
    });
    setForm({ ...initialState, date: form.date });
  }

  return (
    <form className="card" onSubmit={handleSubmit} style={{ gap: "1rem", display: "grid" }}>
      <div className="grid" style={{ gap: "0.75rem" }}>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            placeholder="e.g. Grocery run"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid" style={{ gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="button primary" type="submit">
          Add Expense
        </button>
      </div>
    </form>
  );
}
