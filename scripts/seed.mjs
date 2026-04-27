import fs from 'node:fs/promises';

const data = JSON.parse(await fs.readFile(new URL('./sample-data.json', import.meta.url), 'utf8'));
console.log('Seed data ready. Insert this into Supabase transactions table:');
console.log(JSON.stringify(data.transactions, null, 2));
