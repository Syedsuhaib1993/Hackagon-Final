import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Signup({ setToast }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageUri(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUri(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    setLoading(true);

    try {
      const ImgURI = new FormData();
      ImgURI.append("image", imageUri);
      let image = "";

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/upload`,
        ImgURI,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      image = res.data.fileUrl;

      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/signup`,
        { name, email, phone, password, image }
      );

      setToast({ message: "Signup Successful 🎉", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 4000);

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setToast({ message: "Signup Failed ❌", type: "error" });
      setTimeout(() => setToast({ message: "", type: "" }), 4000);
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
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg"
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-indigo-600 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sign Up
        </motion.h2>

        <motion.div custom={1} variants={fieldVariants} className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ABC"
            required
          />
        </motion.div>

        <motion.div custom={2} variants={fieldVariants} className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="xyz@example.com"
            required
          />
        </motion.div>

        <motion.div custom={3} variants={fieldVariants} className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0312 2356890"
            required
          />
        </motion.div>

        <motion.div custom={4} variants={fieldVariants} className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </motion.div>

       <motion.div
  custom={5}
  variants={fieldVariants}
  className="mb-6 relative rounded-xl overflow-hidden group border-4 border-dashed border-purple-400 transition hover:shadow-xl cursor-pointer"
  onDrop={handleDrop}
  onDragOver={handleDragOver}
>
  {preview ? (
    <div className="relative w-full aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
      <img
        src={preview}
        alt="Preview"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
        <p className="text-white font-semibold">Change Image</p>
      </div>
    </div>
  ) : (
    <div className="w-full aspect-w-4 aspect-h-3 flex flex-col items-center justify-center text-gray-600 bg-gray-50">
      <svg
        className="w-12 h-12 mb-2 text-purple-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
        />
      </svg>
      <p className="text-sm">Drag & Drop or Click to Upload</p>
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleSelect}
    required
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
            <motion.div
              className="h-5 w-5 border-2 border-t-2 border-white rounded-full animate-spin"
            ></motion.div>
          ) : (
            "Sign Up"
          )}
        </motion.button>

        <motion.p
          custom={6}
          variants={fieldVariants}
          className="mt-6 text-center text-sm text-gray-700"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 underline">
            Log In
          </Link>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}
