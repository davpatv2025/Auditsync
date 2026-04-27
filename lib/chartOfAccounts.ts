export const chartOfAccounts = {
  cash: '1000 Cash',
  bank: '1010 Bank',
  accountsReceivable: '1100 Accounts Receivable',
  accountsPayable: '2000 Accounts Payable',
  expensesFood: '5100 Food Expense',
  expensesTransport: '5200 Transport Expense',
  expensesSoftware: '5300 Software Expense',
  incomeSales: '4100 Sales Income',
  incomeOther: '4200 Other Income'
};

export function mapCategoryToAccount(category: string, type: 'income' | 'expense') {
  const key = category.toLowerCase();
  if (type === 'income') {
    if (key.includes('sale') || key.includes('venta')) return chartOfAccounts.incomeSales;
    return chartOfAccounts.incomeOther;
  }
  if (key.includes('comida') || key.includes('food')) return chartOfAccounts.expensesFood;
  if (key.includes('transporte') || key.includes('transport')) return chartOfAccounts.expensesTransport;
  if (key.includes('software')) return chartOfAccounts.expensesSoftware;
  return chartOfAccounts.expensesSoftware;
}
