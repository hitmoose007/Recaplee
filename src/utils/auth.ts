import { supabase } from "@/lib/db";
import { SupabaseClient } from "@supabase/supabase-js";

export  async function signIn(supabaseClient: SupabaseClient): Promise<void> {
  const { error } = await supabaseClient.auth.signInWithOAuth({ provider: "google" });
  if (error) {
    console.error(error);
    throw new Error("Failed to sign in");
  }
}
export async function signOut(supabaseClient: SupabaseClient): Promise<void> {
 
    const signOut = await supabaseClient.auth.signOut();
}
