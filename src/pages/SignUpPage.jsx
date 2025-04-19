import React, { useState } from "react";
import { signUpUser } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const user = await signUpUser(email, password);
      console.log("User signed up:", user);
      setSuccessMsg("Sign-up successful! Please check your email to confirm.");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up (Temporary)</h2>

        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p
          onClick={() => {
            navigate("/");
          }}
          className="w-full mt-5 bg-gray-600 text-center cursor-pointer text-white p-2 rounded hover:bg-gray-600"
        >
          Back to Login
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
