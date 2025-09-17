import React, { useState } from "react";
import { account } from "../appwrite/services";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-20 top-20 left-20 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 bottom-20 right-20 animate-pulse"></div>

      {/* Form */}
      <motion.form
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.8 } }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6 w-96 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-slate-300 text-sm">
          Login to continue exploring blogs
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg border border-slate-400 bg-slate-100 focus:ring-2 focus:ring-green-400 outline-none text-slate-900"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg border border-slate-400 bg-slate-100 focus:ring-2 focus:ring-green-400 outline-none text-slate-900"
        />

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={handleLogin}
        >
          Login
        </motion.button>

        {/* Signup link */}
        <p className="text-center text-sm text-slate-300">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-400 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </motion.form>
    </div>
  );
}

export default LoginPage;
