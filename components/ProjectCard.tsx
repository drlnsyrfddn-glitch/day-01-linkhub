import type { Project } from "@/lib/projects"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    
    <div className="rounded-2xl bg-white text-gray-900 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 flex flex-col justify-between">
       <div>
        <h2 className="text-lg font-semibold text-gray-900">
            {project.title}
        </h2>

        <p className="mt-2 text-sm text-gray-600">{project.description}</p>

        <span
          className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs ${
            project.status === "Done"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
    {project.status === "Done" ? (
        <>
        {project.demoUrl && (
            <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:opacity-80"
            >
            Live Demo
            </a>
        )}

        {project.repoUrl && (
            <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
            >
            Repo
            </a>
        )}
        </>
    ) : (
        <button
        disabled
        className="rounded-lg border px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
        >
        Coming Soon
        </button>
    )}
    </div>

    </div>
    )
}
