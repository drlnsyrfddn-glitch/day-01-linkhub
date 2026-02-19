export type Project = {
  title: string
  description: string
  demoUrl?: string
  repoUrl?: string
  status: "Done" | "Coming Soon"
}

export const projects: Project[] = [
  {
    title: "Day 01 - Link Hub",
    description: "Landing page to showcase all projects.",
    status: "Done",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Day 02 - Pomodoro Timer",
    description: "Focus timer with break sessions.",
    status: "Coming Soon",
  },
  {
    title: "Day 03 - Todo App",
    description: "Simple task manager with filters.",
    status: "Coming Soon",
  },
  {
    title: "Day 04 - Expense Tracker",
    description: "Track income and expenses.",
    status: "Coming Soon",
  },
  {
    title: "Day 05 - Weather App",
    description: "Search and view real-time weather.",
    status: "Coming Soon",
  },
  {
    title: "Day 06 - Image Tools",
    description: "Resize and compress images.",
    status: "Coming Soon",
  },
  {
    title: "Day 07 - Text to PDF",
    description: "Convert text input into downloadable PDF.",
    status: "Coming Soon",
  },
  {
    title: "Day 08 - Password Generator",
    description: "Generate secure passwords with options.",
    status: "Coming Soon",
  },
  {
    title: "Day 09 - Quiz App",
    description: "Small quiz with score and review answers.",
    status: "Coming Soon",
  },
]
