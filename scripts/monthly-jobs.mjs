const baseUrl = process.env.APP_URL;
const userId = process.env.CRON_USER_ID || 'demo-user';
const month = new Date().toISOString().slice(0, 7);

if (!baseUrl) {
  console.error('APP_URL is required for monthly jobs.');
  process.exit(1);
}

const reportRes = await fetch(`${baseUrl}/api/reports/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId, month })
});

const alertRes = await fetch(`${baseUrl}/api/alerts`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId })
});

console.log('Report status:', reportRes.status);
console.log('Alerts status:', alertRes.status);
console.log('Report body:', await reportRes.text());
console.log('Alerts body:', await alertRes.text());
