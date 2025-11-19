// "use client";
// import { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.message);
//       return;
//     }

//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       window.location.href = "/dashboard";
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
//       <div className="p-6 bg-gray-200 dark:bg-gray-900 rounded-xl shadow-lg w-80">
//         <h1 className="text-2xl font-bold mb-4">Login</h1>

//         {error && (
//           <p className="text-red-500 dark:text-red-400 mb-3">{error}</p>
//         )}

//         <input
//           className="p-2 mb-3 w-full text-black rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="p-2 mb-3 w-full text-black rounded"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded w-full text-white"
//           onClick={handleLogin}
//         >
//           Login
//         </button>

//         <p className="text-sm mt-4 text-gray-700 dark:text-gray-300">
//           Don't have an account?{" "}
//           <a href="/register" className="text-blue-600 dark:text-blue-400 underline">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-900 transition-colors">
      <div className="p-6 bg-gray-200 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && (
          <p className="text-red-500 dark:text-red-400 mb-3">{error}</p>
        )}

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
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded w-full text-white"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm mt-4 text-gray-700 ">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600  underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

