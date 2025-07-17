import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiFillDashboard,
  AiFillEdit,
  AiOutlineForm,
  AiOutlineTable,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <AiFillDashboard /> },
    { to: "/blog", label: "Blog Overview", icon: <MdOutlineArticle /> },
    { to: "/add-post", label: "Add New Post", icon: <AiFillEdit /> },
    { to: "/forms", label: "Forms & Components", icon: <AiOutlineForm /> },
    { to: "/tables", label: "Tables", icon: <AiOutlineTable /> },
    { to: "/profile", label: "User Profile", icon: <AiOutlineUser /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r hidden md:block">
      <div className="p-6">
        <h2 className="text-center font-bold mb-6 text-gray-800 uppercase tracking-wide">
         ADMIN PANEL
        </h2>
        <nav>
          <ul className="space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                      isActive
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
