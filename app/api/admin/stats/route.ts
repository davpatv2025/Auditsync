import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';

export async function GET() {
  const [{ count: totalUsers }, { count: activeUsers }, { count: txCount }] = await Promise.all([
    adminSupabase.from('users').select('*', { count: 'exact', head: true }),
    adminSupabase.from('users').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    adminSupabase.from('transactions').select('*', { count: 'exact', head: true })
  ]);

  return NextResponse.json({ totalUsers: totalUsers || 0, activeUsers: activeUsers || 0, txCount: txCount || 0 });
}
