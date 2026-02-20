"use client"

import { useEffect, useMemo, useState } from "react"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

type Filter = "All" | "Done" | "Coming Soon"
type Sort = "Day (asc)" | "Status (Done first)"

function getTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light"
}

export default function Home() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("All")
  const [sort, setSort] = useState<Sort>("Day (asc)")
  const [isDark, setIsDark] = useState(false)

  // initial theme state
  useEffect(() => {
    setIsDark(getTheme() === "dark")
  }, [])

  function toggleTheme() {
    const next = getTheme() === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    localStorage.setItem("theme", next)
    setIsDark(next === "dark")
  }

  // keyboard shortcut: press "T"
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "t") toggleTheme()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = projects.slice()

    // filter
    if (filter !== "All") list = list.filter((p) => p.status === filter)

    // search
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // sort
    if (sort === "Day (asc)") {
      list.sort((a, b) => a.day - b.day)
    } else {
      const score = (s: string) => (s === "Done" ? 0 : 1)
      list.sort((a, b) => {
        const byStatus = score(a.status) - score(b.status)
        return byStatus !== 0 ? byStatus : a.day - b.day
      })
    }

    return list
  }, [query, filter, sort])

  // progress
  const total = projects.length
  const doneCount = projects.filter((p) => p.status === "Done").length
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleTheme}
          className="rounded-xl border px-4 py-2 text-sm transition-all
          bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
          title="Toggle theme (T)"
        >
          {isDark ? "☀️ Light (T)" : "🌙 Dark (T)"}
        </button>
      </div>

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight">
          9 Web Apps in 9 Days
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          A frontend challenge built with Next.js & Tailwind.
        </p>
      </header>

      {/* Progress */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="font-medium">
            Progress: {doneCount}/{total} Done
          </p>
          <p className="text-sm text-gray-500">{percent}%</p>
        </div>

        <div className="mt-3 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-black"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Tip: Press <span className="font-semibold">T</span> to toggle theme.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border px-4 py-3 outline-none transition
          bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-gray-300"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="w-full rounded-xl border px-4 py-3 outline-none transition
          bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-gray-300"
        >
          <option>All</option>
          <option>Done</option>
          <option>Coming Soon</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="w-full rounded-xl border px-4 py-3 outline-none transition
          bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-gray-300"
        >
          <option>Day (asc)</option>
          <option>Status (Done first)</option>
        </select>
      </div>

      {/* Empty state */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center bg-white border-gray-200">
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