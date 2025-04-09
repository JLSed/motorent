import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Login function
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return data; // Contains user and session info
  } catch (err) {
    console.error('Login error:', err.message);
    throw err;
  }
};


// Sign Up function
export const signUpUser = async (email, password) => {
  try {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    return user; // Return the user data after successful sign-up
  } catch (err) {
    console.error('Sign up error:', err.message);
    throw err;
  }
};