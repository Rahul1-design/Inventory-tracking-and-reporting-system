"use client";

import type { ReactNode } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return null;
    }
  }

  return children;
}
