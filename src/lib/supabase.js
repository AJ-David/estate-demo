import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Normalize URL: handle dashboard URLs if user pasted dashboard link instead of API URL
function normalizeSupabaseUrl(url) {
  if (!url) return '';
  if (url.includes('supabase.com/dashboard/project/')) {
    const projectRef = url.split('supabase.com/dashboard/project/')[1]?.split('/')[0]?.split('?')[0];
    if (projectRef) {
      return `https://${projectRef}.supabase.co`;
    }
  }
  return url.replace(/\/+$/, '');
}

export const supabaseUrl = normalizeSupabaseUrl(rawUrl);
export const supabaseAnonKey = rawKey;

// Check if valid credentials are provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
  supabaseAnonKey !== 'your-supabase-anon-key-here' &&
  !supabaseUrl.includes('placeholder')
);

// Fallback dummy URL and Key so createClient does not crash if env is missing
const fallbackUrl = 'https://placeholder-estate.supabase.co';
const fallbackKey = 'placeholder-anon-key';

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : fallbackUrl,
  isSupabaseConfigured ? supabaseAnonKey : fallbackKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
