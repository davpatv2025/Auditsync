import type { Transaction } from '@/lib/types';

export interface ReconcileResult {
  matched: Transaction[];
  missing: Transaction[];
  duplicates: Transaction[];
}

export function reconcileTransactions(internalTxs: Transaction[], statementTxs: Transaction[]): ReconcileResult {
  const matched: Transaction[] = [];
  const missing: Transaction[] = [];
  const duplicates: Transaction[] = [];

  const seen = new Set<string>();

  for (const stmt of statementTxs) {
    const key = `${stmt.amount}-${stmt.date}-${stmt.category}`;
    if (seen.has(key)) {
      duplicates.push(stmt);
      continue;
    }
    seen.add(key);

    const found = internalTxs.find(
      (it) => Math.abs(it.amount - stmt.amount) < 0.01 && it.date === stmt.date
    );

    if (found) matched.push(stmt);
    else missing.push(stmt);
  }

  return { matched, missing, duplicates };
}
