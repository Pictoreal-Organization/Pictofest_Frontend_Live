// app/layout.js
import "./globals.css";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/app/context/Auth";
import Navbar from "@/app/components/Navbar";
import { siteConfig } from './config/metadata';
import GlobalPreloader from "@/app/components/GlobalPreloader";

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration using Next.js 13+ metadata API
export const metadata = {
  ...siteConfig,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Client Components Wrapper
import { ClientProviders } from './components/ClientProviders';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ClientProviders>
          <AuthProvider>
            <Navbar />
            <GlobalPreloader />
            <main>{children}</main>
          </AuthProvider>
          <Toaster
            position="bottom-right"
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
}