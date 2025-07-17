import React from "react";

export default function AdminNavbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Shards Dashboard Lite</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">New Post</button>
      </div>
    </header>
  );
}
