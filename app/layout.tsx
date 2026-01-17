import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Expense Dashboard",
  description: "Track daily spending with quick summaries and trends"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
