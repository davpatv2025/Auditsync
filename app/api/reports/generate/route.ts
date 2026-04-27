import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { userId, month } = await req.json();
  const start = `${month}-01`;
  const end = `${month}-31`;

  const { data, error } = await adminSupabase
    .from('transactions')
    .select('*')
    .eq('userId', userId)
    .gte('date', start)
    .lte('date', end);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const txs = data || [];
  const income = txs.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = txs.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const report = {
    id: crypto.randomUUID(),
    userId,
    month,
    income,
    expenses,
    net: income - expenses,
    createdAt: new Date().toISOString()
  };

  await adminSupabase.from('reports').insert(report);
  return NextResponse.json(report);
}
