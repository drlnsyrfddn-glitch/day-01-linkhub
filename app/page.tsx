"use client"

import { useMemo, useState } from "react"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

type Filter = "All" | "Done" | "Coming Soon"
type Sort = "Day (asc)" | "Status (Done first)"

export default function Home() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("All")
  const [sort, setSort] = useState<Sort>("Day (asc)")

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
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight">
          9 Web Apps in 9 Days
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          A frontend challenge built with Next.js & Tailwind.
        </p>
      </header>

      {/* Controls */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-gray-300"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="w-full rounded-xl border bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option>All</option>
          <option>Done</option>
          <option>Coming Soon</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="w-full rounded-xl border bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option>Day (asc)</option>
          <option>Status (Done first)</option>
        </select>
      </div>

      {/* Empty state */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-300">
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
