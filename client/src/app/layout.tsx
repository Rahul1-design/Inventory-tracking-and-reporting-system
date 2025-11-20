import "./globals.css";
import StoreProvider from "./redux";
import type { ReactNode } from "react";

export const metadata = {
  title: "IMS",
  description: "Inventory Management System",
};
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body>
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
