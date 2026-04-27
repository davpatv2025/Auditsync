'use client';

import { useState } from 'react';

export function ChatBox() {
  const [q, setQ] = useState('Where am I spending the most?');
  const [a, setA] = useState('');

  async function ask() {
    setA('Thinking...');
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: q, userId: 'demo-user' })
    });
    const json = await res.json();
    setA(json.answer || json.error);
  }

  return (
    <div className="card">
      <h3>AI Accountant Agent</h3>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <button onClick={ask}>Ask</button>
      <p>{a}</p>
    </div>
  );
}
