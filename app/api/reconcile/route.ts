import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { reconcileTransactions } from '@/lib/reconciliation';
import type { Transaction } from '@/lib/types';

export async function POST(req: Request) {
  const { csvText, internalTransactions } = await req.json();
  const parsed = Papa.parse(csvText, { header: true });

  const statementTxs: Transaction[] = (parsed.data as Record<string, string>[])
    .filter((r) => r.amount && r.date)
    .map((r) => ({
      id: crypto.randomUUID(),
      userId: 'bank',
      tenantId: 'bank',
      amount: Number(r.amount),
      category: r.category || 'Uncategorized',
      type: (r.type as 'income' | 'expense') || 'expense',
      paymentMethod: r.paymentMethod || 'bank',
      date: r.date,
      createdAt: new Date().toISOString(),
      source: 'bank_csv'
    }));

  const result = reconcileTransactions(internalTransactions as Transaction[], statementTxs);
  return NextResponse.json(result);
}
