import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error('Faltan VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY en .env.local');
}

export const supabase = createClient(url, key, {
  db: { schema: 'crm_cm' },
});

export type UserRole = 'admin' | 'viewer' | 'cm';

export interface PlatformUser {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
}

export async function fetchPlatformUser(userId: string): Promise<PlatformUser | null> {
  const { data, error } = await supabase
    .schema('platform')
    .from('users')
    .select('id, email, full_name, role')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data as PlatformUser;
}
