import sample from '@/scripts/sample-data.json';

export default function ReportsPage() {
  const income = sample.transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = sample.transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <main className="container grid">
      <h1>Financial Reports</h1>
      <div className="card">
        <h3>Income Statement (MVP)</h3>
        <p>Income: ${income.toFixed(2)}</p>
        <p>Expenses: ${expense.toFixed(2)}</p>
        <p>Net: ${(income - expense).toFixed(2)}</p>
      </div>
      <div className="card">
        <h3>Balance Sheet / Cash Flow</h3>
        <p>Generated from ledger and account balances via /api/reports/generate.</p>
      </div>
    </main>
  );
}
