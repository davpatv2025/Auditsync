import { mapCategoryToAccount, chartOfAccounts } from '@/lib/chartOfAccounts';
import type { JournalEntry, Transaction } from '@/lib/types';

export function generateJournalEntry(tx: Transaction): JournalEntry {
  const mapped = mapCategoryToAccount(tx.category, tx.type);
  const debitAccount = tx.type === 'expense' ? mapped : chartOfAccounts.bank;
  const creditAccount = tx.type === 'expense' ? chartOfAccounts.bank : mapped;

  return {
    id: crypto.randomUUID(),
    transactionId: tx.id,
    debitAccount,
    creditAccount,
    amount: tx.amount,
    date: tx.date
  };
}
