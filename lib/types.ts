export type Role = 'USER' | 'ADMIN';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: string;
  tenantId: string;
  amount: number;
  category: string;
  type: TransactionType;
  paymentMethod: string;
  date: string;
  note?: string;
  source?: 'manual' | 'bank_csv' | 'bank_pdf';
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  transactionId: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  date: string;
}
