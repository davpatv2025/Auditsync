export async function askFreeModel(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return 'OPENROUTER_API_KEY is missing. Add it to use AI responses.';
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: 'You are ContaAI, an accountant assistant for SMB finances.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!res.ok) return `AI provider error: ${res.status}`;
  const json = await res.json();
  return json.choices?.[0]?.message?.content || 'No response from AI model.';
}
