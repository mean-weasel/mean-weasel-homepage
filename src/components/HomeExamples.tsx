"use client";

import { useState } from "react";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { galleryGroups, projectsInGroup, type GalleryProject } from "@/lib/gallery";

export function HomeExamples({ projects }: { projects: GalleryProject[] }) {
  const [category, setCategory] = useState<(typeof galleryGroups)[number]["key"]>("web-apps");
  const group = galleryGroups.find((item) => item.key === category)!;
  return (
    <ProjectShowcase title={group.title} category={category} projects={projectsInGroup(projects, category)}>
      <div className="gallery-filters example-filters" role="group" aria-label="Choose examples">
        {galleryGroups.map((item) => (
          <button key={item.key} type="button" aria-pressed={category === item.key}
            aria-controls={`showcase-${category}`} onClick={() => setCategory(item.key)}>
            {({ "web-apps": "Web apps", "native-apps": "Apps & extensions", "open-source": "Developer tools", books: "Books & learning" })[item.key]}<span>{projectsInGroup(projects, item.key).length}</span>
          </button>
        ))}
      </div>
    </ProjectShowcase>
  );
}
