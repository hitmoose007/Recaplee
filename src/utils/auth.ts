import { supabase } from '@/lib/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
export async function signIn(supabaseClient: SupabaseClient): Promise<void> {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error(error);
    throw new Error('Failed to sign in');
  }
}
export async function signOut(): Promise<void> {
    console.log('heal')
  const signOut = await supabase.auth.signOut();
}
