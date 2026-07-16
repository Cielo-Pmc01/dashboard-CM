import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { supabase, fetchPlatformUser, type PlatformUser } from '@/lib/supabase';

interface AuthState {
  session: Session | null;
  profile: PlatformUser | null;
  status: 'loading' | 'signedOut' | 'signedIn';
  error: string | null;

  init: () => void;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

async function loadProfile(session: Session | null) {
  if (!session) return null;
  return fetchPlatformUser(session.user.id);
}

let authListenerRegistered = false;

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  profile: null,
  status: 'loading',
  error: null,

  init: () => {
    supabase.auth.getSession().then(async ({ data }) => {
      const profile = await loadProfile(data.session);
      set({ session: data.session, profile, status: data.session ? 'signedIn' : 'signedOut' });
    });

    if (authListenerRegistered) return;
    authListenerRegistered = true;

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const profile = await loadProfile(session);
      set({ session, profile, status: session ? 'signedIn' : 'signedOut' });
    });
  },

  signInWithPassword: async (email, password) => {
    set({ error: null });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) set({ error: error.message });
  },

  signUp: async (email, password) => {
    set({ error: null });
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) set({ error: error.message });
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },
}));
