"use client";

import Sidebar from "@/app/(dashboard)/(components)/Sidebar";
import Navbar from "@/app/(dashboard)/(components)/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux"; // Ensure this path matches your redux file name

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  // 1. Get states from Redux
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // 2. Check Auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  // 3. Apply Dark Mode to the HTML document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  if (!checked) return null;

  return (
    // 4. Add styling for light/dark backgrounds and text colors
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
        {children}
    </div>
  );
}