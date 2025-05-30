import React, { useState } from "react";
import { IMAGES } from "../constants/image.js";
import { loginUser } from "../lib/supabase.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      console.log("User logged in:", data);
      // Navigate to home page
      navigate("/home");
    } catch (error) {
      setErrorMsg(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <main className="flex bg-primary py-8 text-primary items-center justify-center h-svh font-poppins">
        <div className="flex-1 bg-secondary  justify-between flex gap-6">
          <div className="relative overflow-hidden flex-1">
            <img
              src={IMAGES.login_background}
              alt=""
              className="brightness-50 w-full h-full object-cover"
            />
            <h1 className="absolute bottom-0 font-outfit font-bold text-5xl text-secondary">
              MMC Motorcycle Rentals
            </h1>
          </div>
          <div className="flex flex-col pr-6">
            <div className="flex flex-col justify-center my-14">
              <h2 className="font-outfit font-semibold text-2xl text-accent-gray">
                Login to
              </h2>
              <h2 className="font-outfit font-semibold text-3xl text-accent-gray">
                MMC Rentals Management
              </h2>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col flex-1">
              <label htmlFor="user_email" className=" text-accent-light">
                Email
              </label>
              <input
                className="bg-gray-200 my-1 rounded-lg p-2 py-3 text-xl "
                placeholder="Email *"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="user_password" className=" text-accent-light">
                Password
              </label>
              <input
                className="bg-gray-200 my-1 rounded-lg p-2 py-3 text-xl "
                placeholder="Password *"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="" className="text-accent-blue text-sm">
                Forgot password?
              </a>
              <button
                type="submit"
                className="bg-accent-gray rounded-xl font-bold p-4 mt-12 text-secondary text-center"
              >
                Log in
              </button>
            </form>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="bg-accent-gray rounded-xl font-bold p-4 mt-12 text-secondary text-center"
            >
              Temporary Sign Up
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
