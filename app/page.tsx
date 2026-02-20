"use client"

import { useEffect, useMemo, useState } from "react"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

type Filter = "All" | "Done" | "Coming Soon"
type Sort = "Day (asc)" | "Status (Done first)"

export default function Home() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("All")
  const [sort, setSort] = useState<Sort>("Day (asc)")
  const [isDark, setIsDark] = useState(true)

  // sync initial toggle state from current <html> class
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleTheme() {
    const root = document.documentElement
    const next = root.classList.contains("dark") ? "light" : "dark"

    if (next === "dark") root.classList.add("dark")
    else root.classList.remove("dark")

    localStorage.setItem("theme", next)
    setIsDark(next === "dark")
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = projects.slice()

    // filter
    if (filter !== "All") {
      list = list.filter((p) => p.status === filter)
    }

    // search
    if (q) {
      list = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        )
      })
    }

    // sort
    if (sort === "Day (asc)") {
      list.sort((a, b) => a.day - b.day)
    } else {
      const score = (status: string) => (status === "Done" ? 0 : 1)
      list.sort((a, b) => {
        const byStatus = score(a.status) - score(b.status)
        return byStatus !== 0 ? byStatus : a.day - b.day
      })
    }

    return list
  }, [query, filter, sort])

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleTheme}
          className="rounded-xl border px-4 py-2 text-sm transition-colors
          bg-white text-gray-900 border-gray-200 hover:bg-gray-50
          dark:bg-white/10 dark:text-white dark:border-white/15 dark:hover:bg-white/15"
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight">
          9 Web Apps in 9 Days
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A frontend challenge built with Next.js & Tailwind.
        </p>
      </header>

      {/* Controls */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border px-4 py-3 outline-none transition-colors
          bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-gray-300
          dark:bg-white/10 dark:text-white dark:border-white/15 dark:focus:ring-white/20"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="w-full rounded-xl border px-4 py-3 outline-none transition-colors
          bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-gray-300
          dark:bg-white/10 dark:text-white dark:border-white/15 dark:focus:ring-white/20"
        >
          <option>All</option>
          <option>Done</option>
          <option>Coming Soon</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="w-full rounded-xl border px-4 py-3 outline-none transition-colors
          bg-white text-gray-900 border-gray-200 focus:ring-2 focus:ring-gray-300
          dark:bg-white/10 dark:text-white dark:border-white/15 dark:focus:ring-white/20"
        >
          <option>Day (asc)</option>
          <option>Status (Done first)</option>
        </select>
      </div>

      {/* Empty state */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center transition-colors
        bg-white text-gray-700 border-gray-200
        dark:bg-white/5 dark:text-gray-300 dark:border-white/10">
          No projects found.
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </section>
      )}
    </div>
  )
}