import React from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";


export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Good Morning! Here’s what you need to know today",
      author: "John Doe",
      date: "28 February 2025",
      image: "https://via.placeholder.com/600x400",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut blandit risus."
    },
    {
      id: 2,
      title: "Why Bootstrap 4 is still the best",
      author: "Jane Smith",
      date: "28 February 2025",
      image: "https://via.placeholder.com/600x400",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut blandit risus."
    },
    {
      id: 3,
      title: "Designing better user interfaces",
      author: "Alex Johnson",
      date: "28 February 2025",
      image: "https://via.placeholder.com/600x400",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut blandit risus."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />

      <main className="flex flex-1">
        <Sidebar />

        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow rounded overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {post.author} on {post.date}</p>
                  <p className="text-gray-700 text-sm">{post.excerpt}</p>
                </div>
                <div className="p-4 border-t flex justify-between text-sm text-blue-600">
                  <button className="hover:underline">Edit</button>
                  <button className="hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
