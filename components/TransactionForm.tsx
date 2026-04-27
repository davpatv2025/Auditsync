'use client';

import { useState } from 'react';

export function TransactionForm() {
  const [text, setText] = useState('gasté 300 en comida con tarjeta');
  const [status, setStatus] = useState('');

  async function submit() {
    setStatus('Saving...');
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, userId: 'demo-user', tenantId: 'demo-tenant' })
    });
    const json = await res.json();
    setStatus(res.ok ? `Saved: ${json.transaction.category} ${json.transaction.amount}` : json.error);
  }

  return (
    <div className="card">
      <h3>Smart Transaction Input</h3>
      <p>Try: "gasté 300 en comida con tarjeta"</p>
      <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={submit}>Parse & Save</button>
      <small>{status}</small>
    </div>
  );
}
