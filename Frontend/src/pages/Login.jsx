// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Login({ setToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/login`,
        { email, password }
      );
      console.log(response.data.message);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (setToast) {
        setToast({ message: response.data.message, type: "success" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      if (setToast) {
        setToast({ message: "Login Failed ❌", type: "error" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-indigo-600 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login
        </motion.h2>

        <motion.div custom={1} variants={fieldVariants} className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </motion.div>

        <motion.div custom={2} variants={fieldVariants} className="mb-8">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className={`w-full py-3 rounded-lg ${
            loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-500"
          } text-white font-bold text-lg transition flex items-center justify-center`}
        >
          {loading ? (
            <motion.div className="h-5 w-5 border-2 border-t-2 border-white rounded-full animate-spin"></motion.div>
          ) : (
            "Log In"
          )}
        </motion.button>

        <motion.p
          custom={3}
          variants={fieldVariants}
          className="mt-6 text-center text-sm text-gray-700"
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 underline">
            Sign Up
          </Link>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}
