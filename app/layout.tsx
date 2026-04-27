import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/reports">Reports</Link>
          <Link href="/chat">AI Chat</Link>
          <Link href="/admin">Admin Panel</Link>
          <Link href="/auth/login">Login</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
