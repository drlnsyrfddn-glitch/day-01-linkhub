"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved) {
      setTheme(saved)
      return
    }
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setTheme(systemDark ? "dark" : "light")
  }, [])

  useEffect(() => {
    const root = document.documentElement

    // set data attribute (CSS variables)
    root.dataset.theme = theme

    // keep class for compatibility
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")

    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContextBridge theme={theme} setTheme={setTheme}>
      {children}
    </ThemeContextBridge>
  )
}

/** simple internal bridge so we can change theme from button without prop drilling */
function ThemeContextBridge({
  theme,
  setTheme,
  children,
}: {
  theme: Theme
  setTheme: (t: Theme) => void
  children: React.ReactNode
}) {
  ;(globalThis as any).__setTheme = setTheme
  ;(globalThis as any).__theme = theme
  return <>{children}</>
}