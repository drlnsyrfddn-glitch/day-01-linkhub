export type ProjectStatus = "Done" | "Coming Soon"

export type Project = {
  day: number
  title: string
  description: string
  demoUrl?: string
  repoUrl?: string
  status: ProjectStatus
}

export const projects: Project[] = [
  {
    day: 1,
    title: "Day 01 - Link Hub",
    description: "Landing page to showcase all projects.",
    status: "Done",
    demoUrl: "https://day-01-linkhub.vercel.app",
    repoUrl: "https://github.com/drlsyrfddn-glitch/day-01-linkhub",
  },
  {
    day: 2,
    title: "Day 02 - Pomodoro Timer",
    description: "Focus timer with break sessions.",
    status: "Coming Soon",
  },
  {
    day: 3,
    title: "Day 03 - Todo App",
    description: "Simple task manager with filters.",
    status: "Coming Soon",
  },
  {
    day: 4,
    title: "Day 04 - Expense Tracker",
    description: "Track income and expenses.",
    status: "Coming Soon",
  },
  {
    day: 5,
    title: "Day 05 - Weather App",
    description: "Search and view real-time weather.",
    status: "Coming Soon",
  },
  {
    day: 6,
    title: "Day 06 - Image Tools",
    description: "Resize and compress images.",
    status: "Coming Soon",
  },
  {
    day: 7,
    title: "Day 07 - Text to PDF",
    description: "Convert text input into downloadable PDF.",
    status: "Coming Soon",
  },
  {
    day: 8,
    title: "Day 08 - Password Generator",
    description: "Generate secure passwords with options.",
    status: "Coming Soon",
  },
  {
    day: 9,
    title: "Day 09 - Quiz App",
    description: "Small quiz with score and review answers.",
    status: "Coming Soon",
  },
]
