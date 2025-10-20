export const metadata = {
  title: "FitActive Vitan — Presale",
  description: "One-pager presale landing for FitActive București Vitan",
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
