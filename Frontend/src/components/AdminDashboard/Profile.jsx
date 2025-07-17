import React from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <p>Profile details go here.</p>
        </section>
      </main>
    </div>
  );
}
