"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import type { GalleryProject } from "@/lib/gallery";

const groups = [
  { key: "websites", title: "Business websites", slugs: ["bleep-that-shit", "bugdrop"], link: "See website examples" },
  { key: "search-results", title: "SEO results", slugs: [], link: "See all SEO results" },
  { key: "apps", title: "App development", slugs: ["bugdrop", "bleep-that-shit", "seatify", "meme-search"], link: "See app examples" },
  { key: "automation", title: "AI automation", slugs: ["job-apply", "foil", "logo-designer"], link: "See automation examples" },
];

export function HomeExamples({ projects }: { projects: GalleryProject[] }) {
  const [category, setCategory] = useState("websites");
  const group = groups.find(item => item.key === category)!;
  const selected = group.slugs.map(slug => projects.find(project => project.slug === slug)!);
  const seoPanel = <div className="home-seo-examples">
    {[
      ["Bleep That Sh*t", "Product-led SEO", "Pages and guides that help people discover our audio and video tool."],
      ["BugDrop", "Product discovery", "Product, comparison, and use-case pages that explain the tool."],
      ["neonwatty.com", "Content-led SEO", "Practical articles that bring readers in through Google Search."],
    ].map(([name, label, description]) => <article key={name}><p className="studio-eyebrow">{label}</p><h3>{name}</h3><p>{description}</p><Link href="/gallery#search-results">See {name} results ↗</Link></article>)}
  </div>;
  return <ProjectShowcase title={group.title} category={category} projects={selected}
    panel={category === "search-results" ? seoPanel : undefined}
    examplesLink={{ href: `/gallery#${category}`, label: group.link }}>
    <div className="gallery-filters example-filters" role="group" aria-label="Choose examples">
      {groups.map(item => <button key={item.key} type="button" aria-pressed={category === item.key}
        aria-controls={`showcase-${category}`} onClick={() => setCategory(item.key)}>{item.title}</button>)}
    </div>
  </ProjectShowcase>;
}
