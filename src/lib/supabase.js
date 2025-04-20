import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Login function
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data; // Contains user and session info
  } catch (err) {
    console.error("Login error:", err.message);
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
    console.error("Sign up error:", err.message);
    throw err;
  }
};

export const getCurrentUser = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error.message);
  }
  return session?.user || null;
};

// Logout
export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

export const addMotorUnit = async ({
  name,
  purchased_date,
  transmission,
  horsepower,
  engine_displacement,
  imageFile,
}) => {
  const image_url = await uploadMotorImage(imageFile);

  const { error } = await supabase.from("UNITS").insert([
    {
      name,
      image_url,
      purchased_date,
      transmission,
      horsepower,
      engine_displacement,
    },
  ]);

  if (error) throw error;
};

export const uploadMotorImage = async (file) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error } = await supabase.storage
      .from("motor-images")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("motor-images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("Error uploading image:", err.message);
    throw err;
  }
};
