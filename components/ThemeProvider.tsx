"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    const initial = saved ?? getSystemTheme()
    setTheme(initial)
  }, [])

  useEffect(() => {
    // Apply to <html> so it affects entire app
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")

    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <div
      data-theme={theme}
      className="min-h-screen"
    >
      {/* expose setter via window (simple) */}
      {children}
    </div>
  )
}