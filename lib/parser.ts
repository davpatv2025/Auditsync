import { z } from 'zod';

const ParsedSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  category: z.string(),
  paymentMethod: z.string(),
  date: z.string()
});

export type ParsedTransaction = z.infer<typeof ParsedSchema>;

export function parseNaturalLanguageTransaction(input: string): ParsedTransaction {
  const normalized = input.toLowerCase();
  const amountMatch = normalized.match(/(\d+[\.,]?\d*)/);
  const amount = amountMatch ? Number(amountMatch[1].replace(',', '.')) : 0;
  const type = /gaste|gasté|pague|pagué|expense/.test(normalized) ? 'expense' : 'income';

  const category = /comida|food/.test(normalized)
    ? 'Food'
    : /transporte|uber|taxi/.test(normalized)
      ? 'Transport'
      : /software|saas/.test(normalized)
        ? 'Software'
        : type === 'income'
          ? 'Sales'
          : 'General';

  const paymentMethod = /tarjeta|card/.test(normalized)
    ? 'card'
    : /efectivo|cash/.test(normalized)
      ? 'cash'
      : 'bank';

  const parsed = ParsedSchema.parse({
    amount,
    type,
    category,
    paymentMethod,
    date: new Date().toISOString().slice(0, 10)
  });

  return parsed;
}
