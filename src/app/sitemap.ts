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
    { url: `${siteUrl}/services/web-design-phoenix`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/use-cases`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/seo-results`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/gallery`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    ...projectPages,
  ];
}
