export type ProjectStatus = "Live" | "Public beta" | "In the works";

export type Project = {
  name: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  url?: string;
  status: ProjectStatus;
  cta?: string;
};

export const liveProjects: Project[] = [
  {
    name: "BugDrop",
    description:
      "In-app feedback with annotated screenshots, browser context, and GitHub issues ready for triage.",
    icon: "🐞",
    color: "bg-sky-500",
    borderColor: "border-sky-200 dark:border-sky-900",
    url: "https://bugdrop.dev",
    status: "Live",
    cta: "Open BugDrop",
  },
  {
    name: "Foil for Mac",
    description:
      "Menu bar dictation for real Mac workflows, built to put words where you are already working.",
    icon: "🎙️",
    color: "bg-indigo-500",
    borderColor: "border-indigo-200 dark:border-indigo-900",
    url: "https://sayfoil.com",
    status: "Public beta",
    cta: "Try Foil",
  },
  {
    name: "Debt Is Fun",
    description:
      "A public-interest clock for university debt, endowments, and the gap between the two.",
    icon: "⏱️",
    color: "bg-amber-500",
    borderColor: "border-amber-200 dark:border-amber-900",
    url: "https://debtisfun.com",
    status: "Live",
    cta: "Watch the clock",
  },
  {
    name: "Bleep That Sh*t",
    description:
      "Fast browser and cloud tools for cleaning profanity from audio and video.",
    icon: "🔇",
    color: "bg-rose-500",
    borderColor: "border-rose-200 dark:border-rose-900",
    url: "https://bleepthat.sh",
    status: "Live",
    cta: "Bleep something",
  },
  {
    name: "Seatify",
    description:
      "Collaborative seating charts for weddings and events without the spreadsheet sprawl.",
    icon: "💺",
    color: "bg-emerald-500",
    borderColor: "border-emerald-200 dark:border-emerald-900",
    url: "https://seatify.app",
    status: "Live",
    cta: "Plan seating",
  },
  {
    name: "DeckChecker",
    description:
      "Slide-deck compliance and submission tracking for corporate events.",
    icon: "📊",
    color: "bg-violet-500",
    borderColor: "border-violet-200 dark:border-violet-900",
    url: "https://deckchecker.app",
    status: "Live",
    cta: "Check a deck",
  },
];

export const buildingProjects: Project[] = [
  {
    name: "BugDrop Board",
    description:
      "A hosted board for collecting, triaging, and mirroring customer feedback into GitHub.",
    icon: "🧭",
    color: "bg-orange-500",
    borderColor: "border-orange-200 dark:border-orange-900",
    url: "https://board.bugdrop.dev",
    status: "In the works",
    cta: "Preview the board",
  },
  {
    name: "Lineage",
    description:
      "A local-first creative asset lineage and review workspace for seeing how work changed.",
    icon: "🧬",
    color: "bg-cyan-500",
    borderColor: "border-cyan-200 dark:border-cyan-900",
    status: "In the works",
  },
  {
    name: "Limner",
    description:
      "An agent-guided visual fidelity workbench for tightening interfaces against a target.",
    icon: "🎚️",
    color: "bg-fuchsia-500",
    borderColor: "border-fuchsia-200 dark:border-fuchsia-900",
    status: "In the works",
  },
];

export const allProjects = [...liveProjects, ...buildingProjects];
