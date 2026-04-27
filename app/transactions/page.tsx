import sample from '@/scripts/sample-data.json';

export default function TransactionsPage() {
  return (
    <main className="container">
      <h1>Transactions</h1>
      <div className="table-wrap card">
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Method</th></tr></thead>
          <tbody>
            {sample.transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.type}</td>
                <td>{t.category}</td>
                <td>${t.amount}</td>
                <td>{t.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
