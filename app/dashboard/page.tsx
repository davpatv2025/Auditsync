import { KpiCards } from '@/components/KpiCards';
import { TransactionForm } from '@/components/TransactionForm';
import sample from '@/scripts/sample-data.json';

export default function DashboardPage() {
  const txs = sample.transactions;

  return (
    <main className="container grid" style={{ gap: 20 }}>
      <h1>ContaAI Dashboard</h1>
      <KpiCards txs={txs} />
      <TransactionForm />
      <div className="card">
        <h3>Alerts</h3>
        <p>Unusual expenses and cash-flow risk checks run monthly via GitHub Actions.</p>
      </div>
    </main>
  );
}
