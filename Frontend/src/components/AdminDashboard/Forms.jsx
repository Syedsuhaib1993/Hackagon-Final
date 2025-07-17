import React from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";


export default function Forms() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Forms & Components</h2>
          <p>Example forms and components go here.</p>
        </section>
      </main>
    </div>
  );
}
