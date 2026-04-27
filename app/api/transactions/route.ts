import { NextResponse } from 'next/server';
import { parseNaturalLanguageTransaction } from '@/lib/parser';
import { adminSupabase } from '@/lib/supabase';
import { generateJournalEntry } from '@/lib/accounting';
import type { Transaction } from '@/lib/types';

export async function POST(req: Request) {
  const { text, userId, tenantId } = await req.json();

  try {
    const parsed = parseNaturalLanguageTransaction(text);
    const tx: Transaction = {
      id: crypto.randomUUID(),
      userId,
      tenantId,
      amount: parsed.amount,
      category: parsed.category,
      type: parsed.type,
      paymentMethod: parsed.paymentMethod,
      date: parsed.date,
      createdAt: new Date().toISOString(),
      source: 'manual'
    };

    const entry = generateJournalEntry(tx);

    await adminSupabase.from('transactions').insert(tx);
    await adminSupabase.from('journal_entries').insert(entry);

    return NextResponse.json({ transaction: tx, journalEntry: entry });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
