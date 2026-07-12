import type { MetadataRoute } from "next";
import { publishedProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = publishedProjects.map(
    (project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectPages,
  ];
}
