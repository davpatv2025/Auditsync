'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function submit() {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'USER' })
    });
    const json = await res.json();
    setMsg(json.message || json.error);
  }

  return (
    <main className="container" style={{ maxWidth: 420 }}>
      <h1>Create account</h1>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit}>Sign up</button>
      <small>{msg}</small>
    </main>
  );
}
