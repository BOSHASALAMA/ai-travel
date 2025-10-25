import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./_components/Header";
import {
  ClerkProvider,

} from '@clerk/nextjs'
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Travel Planner",
  description: "Traviel planning made easy with AI assistance.",
};

export default function RootLayout({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // If the publishable key is missing during build, avoid initializing ClerkProvider
  // which can throw during prerendering. Prefer setting NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  // in your Vercel/hosting environment for production builds.
  if (!publishableKey) {
    console.warn('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY — rendering without ClerkProvider');
    return (
      <html lang="en">
        <body className="bg-gray-950">
          <Header />
          <Provider>
            {children}
          </Provider>
          <Toaster />
          <SpeedInsights />

        </body>
      </html>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body className="bg-gray-950">
          <Header />
          <Provider>
            {children}
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
