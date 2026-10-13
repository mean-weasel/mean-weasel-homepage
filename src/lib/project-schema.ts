import type { Project } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export function projectSchema(project: Project) {
  const common = {
    name: project.name,
    description: project.introduction ?? project.description,
    url: project.url ?? siteUrl,
  };
  if (project.kind === "book") {
    return {
      ...common,
      "@type": "Book",
      bookEdition: "2",
      author: project.authors?.map((name) => ({ "@type": "Person", name })),
      publisher: {
        "@type": "Organization",
        name: "Cambridge University Press",
      },
    };
  }
  return {
    ...common,
    "@type": "SoftwareApplication",
    applicationCategory: project.category,
    operatingSystem:
      project.slug === "foil"
        ? "macOS"
        : project.category === "AI skills & plugins"
          ? "Cross-platform"
          : project.category === "Browser extensions"
            ? "Chrome"
            : "Web",
    author: { "@id": `${siteUrl}/#organization` },
  };
}
