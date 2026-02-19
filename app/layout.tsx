import type { Metadata } from "next"
import "./globals.css"

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
      <body className="bg-gradient-to-b from-black to-gray-900 text-white antialiased">
        <main className="min-h-screen px-6 py-16">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </body>
    </html>
  )
}
