import { NextResponse } from 'next/server';
import { askFreeModel } from '@/lib/ai';

export async function POST(req: Request) {
  const { prompt, userId } = await req.json();
  const enriched = `User ${userId} asks: ${prompt}. Answer as accounting copilot with practical suggestions.`;
  const answer = await askFreeModel(enriched);
  return NextResponse.json({ answer });
}
