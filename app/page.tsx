import Image from "next/image";
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

export default function Home() {
  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight">
          9 Web Apps in 9 Days
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          A frontend challenge built with Next.js & Tailwind.
        </p>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </section>
    </div>
  )
}
