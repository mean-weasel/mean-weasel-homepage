"use client";

import { useRouter } from "next/navigation";
import { GalleryCard } from "@/components/GalleryCard";
import {
  galleryGroups,
  projectsInGroup,
  starSnapshotDate,
  type GalleryFilter,
  type GalleryProject,
} from "@/lib/gallery";

export function ProjectGallery({
  projects,
  filter = "all",
}: {
  projects: GalleryProject[];
  filter?: GalleryFilter;
}) {
  const router = useRouter();
  const visible = projectsInGroup(projects, filter);
  const filters = [
    { key: "all" as const, title: "All projects" },
    ...galleryGroups,
  ];
  return (
    <section
      id="products"
      aria-label="Project gallery"
      className="studio-gallery studio-container gallery-page-collection"
    >
      <div className="gallery-toolbar">
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((category) => (
            <button
              key={category.key}
              type="button"
              aria-pressed={filter === category.key}
              onClick={() =>
                router.push(
                  category.key === "all"
                    ? "/gallery"
                    : `/gallery?category=${category.key}`,
                  { scroll: false },
                )
              }
            >
              {category.title}
              <span>{projectsInGroup(projects, category.key).length}</span>
            </button>
          ))}
        </div>
        <p className="gallery-result-count" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <div className="gallery-groups">
        {galleryGroups.filter((group) => filter === "all" || group.key === filter).map((group) => (
          <section key={group.key} className="gallery-category" aria-labelledby={`gallery-${group.key}`}>
            <div className="gallery-category-heading">
              <h2 id={`gallery-${group.key}`}>{group.title}</h2>
              <p>{group.description}</p>
            </div>
            <div key={`${filter}-${group.key}`} className="gallery-grid">
              {projectsInGroup(projects, group.key).map((project, index) => (
                <GalleryCard
                  key={project.slug}
                  project={project}
                  index={projects.indexOf(project)}
                  priority={group.key === (filter === "all" ? "web-apps" : filter) && index < 3}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="gallery-footnote">
        Built with care. Shared with you.{" "}
        <span>
          GitHub stars as of{" "}
          <time dateTime={starSnapshotDate}>Oct 11, 2026</time>.
        </span>
      </p>
    </section>
  );
}
