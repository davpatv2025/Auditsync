import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  // Fail lazily in route handlers when env missing.
  console.warn('Supabase env vars are missing.');
}

export const supabase = createClient(url || 'https://example.supabase.co', anon || 'public-anon-key');

export const adminSupabase = createClient(
  url || 'https://example.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'service-role-key'
);
