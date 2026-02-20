"use client"

import { useEffect } from "react"

type Theme = "light" | "dark"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial: Theme = saved ?? (systemDark ? "dark" : "light")

    document.documentElement.dataset.theme = initial
    localStorage.setItem("theme", initial)
  }, [])

  return <>{children}</>
}