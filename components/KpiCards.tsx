import type { Transaction } from '@/lib/types';

export function KpiCards({ txs }: { txs: Transaction[] }) {
  const income = txs.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = txs.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-3">
      <div className="card"><h3>Income</h3><p>${income.toFixed(2)}</p></div>
      <div className="card"><h3>Expense</h3><p>${expense.toFixed(2)}</p></div>
      <div className="card"><h3>Net Balance</h3><p>${balance.toFixed(2)}</p></div>
    </div>
  );
}
