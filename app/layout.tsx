import type { Metadata } from "next"
import "./globals.css"
import ThemeProvider from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: {
    default: "9 Web Apps in 9 Days",
    template: "%s | 9 Web Apps",
  },
  description: "Frontend challenge built with Next.js & Tailwind.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <main className="min-h-screen px-6 py-16 bg-gray-50 text-gray-900 dark:bg-gradient-to-b dark:from-black dark:to-gray-900 dark:text-white transition-colors">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
