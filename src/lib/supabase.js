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
  hourly_rate,
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
      hourly_rate,
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

export const getMotorUnits = async () => {
  try {
    const { data, error } = await supabase.from("UNITS").select("*");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error fetching motor units:", err.message);
    throw err;
  }
};

export const updateMotorUnit = async (id, updatedData) => {
  try {
    const { error } = await supabase
      .from("UNITS")
      .update(updatedData)
      .eq("unit_id", id);

    if (error) throw error;

    return true; // Return success
  } catch (err) {
    console.error("Error updating motor unit:", err.message);
    throw err;
  }
};

// Fetch all requests with additional details
export const getRequests = async () => {
  try {
    const { data, error } = await supabase.from("REQUESTS").select(`
        request_id,
        created_at,
        status,
        user_email,
        contact_num,
        first_name,
        last_name,
        start_date,
        end_date,
        duration_day,
        total_cost,
        UNITS(name)
      `);

    if (error) throw error;

    // Map the data to include unit name
    const requestsWithDetails = data.map((request) => ({
      ...request,
      unit_name: request.UNITS.name,
    }));

    return requestsWithDetails;
  } catch (err) {
    console.error("Error fetching requests:", err.message);
    throw err;
  }
};

// Confirm a request
export const confirmRequest = async (requestId) => {
  try {
    // Fetch the request to get the unit_id and total_cost
    const { data: requestData, error: fetchError } = await supabase
      .from("REQUESTS")
      .select("unit_id, total_cost")
      .eq("request_id", requestId)
      .single();

    if (fetchError) throw fetchError;

    const { unit_id: unitId, total_cost: totalCost } = requestData;

    // Insert into SALES table with payment (total_cost)
    const { error: insertError } = await supabase.from("SALES").insert([
      {
        request_id: requestId,
        payment: totalCost, // Include total_cost as payment
      },
    ]);

    if (insertError) throw insertError;

    // Update the status in REQUESTS table
    const { error: updateRequestError } = await supabase
      .from("REQUESTS")
      .update({ status: "IN-USE" })
      .eq("request_id", requestId);

    if (updateRequestError) throw updateRequestError;

    // Update the status of the unit to "Occupied"
    const { error: updateUnitError } = await supabase
      .from("UNITS")
      .update({ status: "OCCUPIED" })
      .eq("unit_id", unitId);

    if (updateUnitError) throw updateUnitError;

    return true;
  } catch (err) {
    console.error("Error confirming request:", err.message);
    throw err;
  }
};

// Decline a request
export const declineRequest = async (requestId) => {
  try {
    const { error } = await supabase
      .from("REQUESTS")
      .update({ status: "DENIED" })
      .eq("request_id", requestId);

    if (error) throw error;

    return true;
  } catch (err) {
    console.error("Error declining request:", err.message);
    throw err;
  }
};

// Fetch sales summary with total earnings and sales count
export const getSalesSummary = async () => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    ).toISOString();
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).toISOString();

    // Fetch today's sales
    const { data: todaySales, error: todayError } = await supabase
      .from("SALES")
      .select("payment")
      .gte("created_at", startOfToday);

    if (todayError) throw todayError;

    const todayEarnings = todaySales.reduce(
      (sum, sale) => sum + sale.payment,
      0
    );
    const todayCount = todaySales.length;

    // Fetch weekly sales
    const { data: weeklySales, error: weeklyError } = await supabase
      .from("SALES")
      .select("payment")
      .gte("created_at", startOfWeek);

    if (weeklyError) throw weeklyError;

    const weeklyEarnings = weeklySales.reduce(
      (sum, sale) => sum + sale.payment,
      0
    );
    const weeklyCount = weeklySales.length;

    // Fetch monthly sales
    const { data: monthlySales, error: monthlyError } = await supabase
      .from("SALES")
      .select("payment")
      .gte("created_at", startOfMonth);

    if (monthlyError) throw monthlyError;

    const monthlyEarnings = monthlySales.reduce(
      (sum, sale) => sum + sale.payment,
      0
    );
    const monthlyCount = monthlySales.length;

    return {
      earnings: {
        today: todayEarnings,
        weekly: weeklyEarnings,
        monthly: monthlyEarnings,
      },
      salesCount: {
        today: todayCount,
        weekly: weeklyCount,
        monthly: monthlyCount,
      },
    };
  } catch (err) {
    console.error("Error fetching sales summary:", err.message);
    throw err;
  }
};

export const getTodayEarnings = async () => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();

    // Fetch today's sales
    const { data, error } = await supabase
      .from("SALES")
      .select("payment")
      .gte("created_at", startOfToday);

    if (error) throw error;

    // Calculate total earnings
    const totalEarnings = data.reduce((sum, sale) => sum + sale.payment, 0);

    return totalEarnings;
  } catch (err) {
    console.error("Error fetching today's earnings:", err.message);
    throw err;
  }
};

export const getInUseRequests = async () => {
  try {
    const { data, error } = await supabase
      .from("REQUESTS")
      .select(
        "request_id, first_name, last_name, contact_num, UNITS(unit_id, name, image_url), start_date, end_date"
      )
      .eq("status", "IN-USE");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error fetching 'IN-USE' requests:", err.message);
    throw err;
  }
};

export const markUnitAsAvailable = async (unitId, requestId) => {
  try {
    // Update the unit status to "AVAILABLE"
    const { error: unitError } = await supabase
      .from("UNITS")
      .update({ status: "AVAILABLE" })
      .eq("unit_id", unitId);

    if (unitError) throw unitError;

    // Update the request status to "COMPLETED"
    const { error: requestError } = await supabase
      .from("REQUESTS")
      .update({ status: "COMPLETED" })
      .eq("request_id", requestId);

    if (requestError) throw requestError;

    return true;
  } catch (err) {
    console.error(
      "Error marking unit as available and request as completed:",
      err.message
    );
    throw err;
  }
};
