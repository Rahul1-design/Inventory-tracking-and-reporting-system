"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("User registered");
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="p-6 bg-gray-200 dark:bg-gray-900 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input
          className="p-2 mb-3 w-full text-black rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="p-2 mb-3 w-full text-black rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full text-white"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
