import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VerifyOTP = ({ setToast }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/verify`,
        {
          otp,
          email,
        }
      );

      if (res.data.data.isactive) {
        if (setToast) {
          setToast({ message: "OTP Verified Successfully! ✅", type: "success" });
          setTimeout(() => setToast({ message: "", type: "" }), 2000);
          localStorage.removeItem("email");
          setTimeout(() => navigate("/login"), 2000);
        }
      }
    } catch (error) {
      console.log(error.message);
      if (setToast) {
        setToast({ message: "Invalid OTP. Please try again.", type: "error" });
        setTimeout(() => setToast({ message: "", type: "" }), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-extrabold mb-4 text-indigo-600">Verify OTP</h2>
        <p className="mb-8 text-gray-600">
          Please enter the 4-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-center text-3xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="____"
            required
          />

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
              "Verify OTP"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default VerifyOTP;
