"use client";
import "../globals.css";
import isNotAuth from "@/app/components/isNotAuth";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/app/context/Auth";
import Navbar from "@/app/components/Navbar";
import { ClientProviders } from "@/app/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

const WishlistLayout = ({ children }) => {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ClientProviders>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={2000}
            pauseWhenPageIsHidden
            visibleToasts={1}
          />
        </ClientProviders>
      </body>
    </html>
  );
};

export default isNotAuth(WishlistLayout);