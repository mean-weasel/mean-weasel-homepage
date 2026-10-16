import Image from "next/image";
import Link from "next/link";
import { ProductSiteLink } from "@/components/ProductSiteLink";
import { starSnapshotDate, type GalleryProject } from "@/lib/gallery";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function GalleryCard({
  project,
  index,
  priority = false,
  businessFriendly = false,
  placement = "gallery_card",
}: {
  project: GalleryProject;
  index: number;
  priority?: boolean;
  businessFriendly?: boolean;
  placement?: "gallery_card" | "homepage_carousel";
}) {
  return (
    <article className="gallery-card">
      <Link
        className={`gallery-preview tone-${project.previewTone}`}
        href={`/projects/${project.slug}`}
        aria-label={`Explore ${project.name}`}
      >
        <div className="preview-topline">
          <span className="preview-index">
            {String(index + 1).padStart(2, "0")} /
          </span>
          <span
            className={`project-state ${project.status === "Waitlist" || project.status === "Manual install" ? "state-waitlist" : ""}`}
          >
            <i aria-hidden="true" />
            {project.status}
          </span>
        </div>
        <div className="preview-window">
          <div className="preview-browser" aria-hidden="true">
            <span />
            <span />
            <span />
            <small>{new URL(project.url).hostname}</small>
          </div>
          <Image
            src={project.preview}
            alt={`${project.name} website preview`}
            width={1080}
            height={750}
            sizes="(max-width: 639px) 95vw, (max-width: 1023px) 46vw, 30vw"
            priority={priority}
          />
        </div>
        <span className="preview-explore">
          Explore project <Arrow diagonal />
        </span>
      </Link>
      <div className="gallery-card-content">
        <div className="gallery-card-heading">
          <h3>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h3>

        </div>
        <p className="gallery-description">{project.description}</p>
        <div className="gallery-card-actions">
          <Link className="project-details" href={`/projects/${project.slug}`} aria-label={`View ${project.name} project`}>
            View project <Arrow />
          </Link>
          <ProductSiteLink
            href={project.url}
            projectName={project.name}
            projectSlug={project.slug}
            placement={placement}
            className="project-visit"
            ariaLabel={`Visit ${project.name} website (opens in a new tab)`}
          >
            Visit website <Arrow diagonal />
          </ProductSiteLink>
        </div>
        {!businessFriendly && <div className="gallery-card-footer">
          <span>{project.galleryCategory}</span>
          {project.repository && (
            <a
              href={`https://github.com/${project.repository}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub, ${project.stars} stars as of October 11, 2026`}
              title={`GitHub stars as of ${starSnapshotDate}`}
            >
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1-6.2L2 9.6l6.3-.9Z" />
              </svg>
              {project.stars}
              <span className="source-label">GitHub</span>
            </a>
          )}
        </div>}
      </div>
    </article>
  );
}
