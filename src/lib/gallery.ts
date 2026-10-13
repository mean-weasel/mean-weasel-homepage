import { getPublishedProject, type PublishedProject } from "@/lib/projects";

export type GalleryCategory =
  | "Web Apps"
  | "Mac Apps"
  | "AI Skills & Plugins"
  | "Books & Learning"
  | "Browser Extensions";
export type GalleryProject = PublishedProject & {
  galleryCategory: GalleryCategory;
  preview: string;
  previewTone: string;
  repository?: string;
  stars?: number;
};

// GitHub totals verified October 11, 2026. These are a dated snapshot, not a live counter.
export const starSnapshotDate = "2026-10-11";

const selection: Array<{
  slug: string;
  name?: string;
  description: string;
  galleryCategory: GalleryCategory;
  previewTone: string;
  repository?: string;
  stars?: number;
}> = [
  {
    slug: "bugdrop",
    description:
      "Turn a screenshot and a little context into feedback your team can act on. Straight to GitHub Issues.",
    galleryCategory: "Web Apps",
    previewTone: "blue",
    repository: "bugdrophq/bugdrop",
    stars: 67,
  },
  {
    slug: "bleep-that-shit",
    description:
      "Clean up the language. Keep the personality. Find, review, and bleep words in your audio and video.",
    galleryCategory: "Web Apps",
    previewTone: "yellow",
    repository: "neonwatty/bleep-that-shit",
    stars: 67,
  },
  {
    slug: "seatify",
    description:
      "A little less seating-chart chaos. Bring guests, tables, and all those relationships into one visual plan.",
    galleryCategory: "Web Apps",
    previewTone: "sand",
  },
  {
    slug: "foil",
    name: "Foil",
    description:
      "Speak your next thought into action. Mac dictation that shapes your words for the app in front of you.",
    galleryCategory: "Mac Apps",
    previewTone: "green",
    repository: "usefoil/foil",
    stars: 3,
  },
  {
    slug: "job-apply",
    description:
      "Less form filling. More finding your next role. A job application assistant for Codex and Claude Code.",
    galleryCategory: "AI Skills & Plugins",
    previewTone: "lilac",
    repository: "neonwatty/job-apply-plugin",
    stars: 122,
  },
  {
    slug: "logo-designer",
    description:
      "From a conversation to an identity. Explore, refine, and export SVG logos with your coding agent.",
    galleryCategory: "AI Skills & Plugins",
    previewTone: "pink",
    repository: "neonwatty/logo-designer-skill",
    stars: 147,
  },
  {
    slug: "machine-learning-refined",
    description:
      "Learn machine learning from the ground up. A coauthored textbook with Python notebooks and open learning resources.",
    galleryCategory: "Books & Learning",
    previewTone: "sand",
    repository: "neonwatty/machine-learning-refined",
    stars: 2301,
  },
  {
    slug: "meme-search",
    description:
      "Find the meme you remember, even when you don't remember its filename. A self-hosted search engine for your collection.",
    galleryCategory: "Web Apps",
    previewTone: "lilac",
    repository: "meme-search/meme-search",
    stars: 759,
  },
  {
    slug: "ytgify",
    description:
      "Turn a YouTube moment into a GIF. Pick a clip, preview the loop, and make it yours. Available by manual install.",
    galleryCategory: "Browser Extensions",
    previewTone: "pink",
    repository: "ytgify/ytgify",
    stars: 81,
  },
];

export const galleryProjects: GalleryProject[] = selection.map((entry) => {
  const project = getPublishedProject(entry.slug);
  if (!project) throw new Error(`Gallery project not found: ${entry.slug}`);
  return { ...project, ...entry, preview: `/projects/${entry.slug}.webp` };
});

export const galleryGroups = [
  {
    key: "web-apps",
    title: "Web apps",
    description: "Everyday problems. A better browser tab.",
    categories: ["Web Apps"],
  },
  {
    key: "native-apps",
    title: "Native apps & extensions",
    description: "Right where you work. Ready when you are.",
    categories: ["Mac Apps", "Browser Extensions"],
  },
  {
    key: "open-source",
    title: "Open-source tools",
    description: "A little help for the things you make next.",
    categories: ["AI Skills & Plugins"],
  },
  {
    key: "books",
    title: "Books & Learning",
    description: "Ideas worth understanding from the ground up.",
    categories: ["Books & Learning"],
  },
] as const;
export type GalleryFilter = "all" | (typeof galleryGroups)[number]["key"];

export function resolveGalleryFilter(
  value: string | string[] | undefined,
): GalleryFilter {
  return galleryGroups.find((group) => group.key === value)?.key ?? "all";
}

export function projectsInGroup(
  projects: GalleryProject[],
  filter: GalleryFilter,
) {
  const group = galleryGroups.find((candidate) => candidate.key === filter);
  return group
    ? projects.filter((project) =>
        (group.categories as readonly string[]).includes(
          project.galleryCategory,
        ),
      )
    : projects;
}
