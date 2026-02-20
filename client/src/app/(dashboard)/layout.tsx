"use client";

import Sidebar from "@/app/(dashboard)/(components)/Sidebar";
import Navbar from "@/app/(dashboard)/(components)/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setChecked(true);
      // Simulate smooth transition
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [router]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  if (!checked || isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-4xl text-center font-bold">Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div
      className={`${isDarkMode ? "dark" : "light"
        } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
          } transition-all duration-300 ease-in-out`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}