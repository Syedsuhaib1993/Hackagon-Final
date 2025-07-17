import React from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";


export default function Tables() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Tables</h2>
          <p>Here you can see table data.</p>
        </section>
      </main>
    </div>
  );
}
