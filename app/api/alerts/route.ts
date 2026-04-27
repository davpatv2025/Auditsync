import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { userId } = await req.json();
  const { data } = await adminSupabase.from('transactions').select('*').eq('userId', userId);
  const txs = data || [];
  const avg = txs.reduce((s, t) => s + t.amount, 0) / (txs.length || 1);
  const unusual = txs.filter((t) => t.amount > avg * 2 && t.type === 'expense');
  const cashRisk = txs.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0) >
    txs.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  return NextResponse.json({ unusualExpenses: unusual, cashFlowRisk: cashRisk });
}
