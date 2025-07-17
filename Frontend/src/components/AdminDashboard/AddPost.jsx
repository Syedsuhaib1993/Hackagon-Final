import React from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

export default function AddPost() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
          <p>This is where you’d add a new blog post.</p>
        </section>
      </main>
    </div>
  );
}
