import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const emailSignup = async (email: string, password: string) => {
  await supabase.auth.signUp({
    email,
    password,
  });
};

export const emailSignin = async (email: string, password: string) => {
  await supabase.auth.signInWithPassword({
    email,
    password,
  });
};
