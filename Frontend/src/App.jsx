import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./components/Home";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import Profile from "./components/AdminDashboard/Profile";
import Tables from "./components/AdminDashboard/Tables";
import Forms from "./components/AdminDashboard/Forms";
import AddPost from "./components/AdminDashboard/AddPost";
import Dashboard from "./components/AdminDashboard/Dashboard";
import Blog from "./components/AdminDashboard/Blog";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  const [toast, setToast] = useState({ message: "", type: "" });

  return (
    <>
      {/* ✅ Inline Toast using framer-motion */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            key="toast"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded shadow-lg text-white font-semibold
              ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
            `}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<><Navbar setToast={setToast}/><Home/></>} />
          <Route path="/admin" element={<Admin />} />
        <Route element={<AdminRoutes/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<Signup setToast={setToast} />} />
          <Route path="/login" element={<Login setToast={setToast} />} />
          <Route path="/verify" element={<Verify setToast={setToast}/>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
