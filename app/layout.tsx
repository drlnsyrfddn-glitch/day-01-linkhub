import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "9 Web Apps in 9 Days",
    template: "%s | 9 Web Apps",
  },
  description: "Frontend challenge built with Next.js",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-black to-gray-900 text-white antialiased">
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
      </body>
    </html>
  );
}
