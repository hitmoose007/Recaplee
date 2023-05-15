import { supabase } from '@/lib/supabase';

import React from 'react';


export async function signIn(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error(error);
    throw new Error('Failed to sign in');
  }
}
export async function signOut(): Promise<void> {
  console.log('heal');
  const signOut = await supabase.auth.signOut();
}

