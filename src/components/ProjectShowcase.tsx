"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { GalleryCard } from "@/components/GalleryCard";
import type { GalleryProject } from "@/lib/gallery";

type Position = { overflow: boolean; indices: number[] };
export function ProjectShowcase({
  title,
  category,
  projects,
  children,
  examplesLink,
  panel,
  consultation,
}: {
  title: string;
  category: string;
  projects: GalleryProject[];
  children?: ReactNode;
  examplesLink?: { href: string; label: string };
  panel?: ReactNode;
  consultation?: { href: string; label: string };
}) {
  const [viewport, carousel] = useEmblaCarousel({ loop: true, align: "start", duration: 25 });
  const [position, setPosition] = useState<Position>({ overflow: false, indices: [1] });

  useEffect(() => {
    if (!carousel) return;
    function measure() {
      if (!carousel) return;
      const slides = carousel.slideNodes();
      if (!slides.length) return;
      const width = slides[0]?.getBoundingClientRect().width ?? 1;
      const gap = parseFloat(getComputedStyle(slides[0]).marginRight) || 0;
      const visibleCount = Math.min(slides.length, Math.max(1,
        Math.floor((carousel.rootNode().clientWidth + gap + 2) / (width + gap))));
      const first = carousel.selectedScrollSnap();
      const indices = Array.from({ length: visibleCount }, (_, i) => (first + i) % slides.length + 1);
      setPosition({ overflow: carousel.canScrollNext() || carousel.canScrollPrev(), indices });
    }
    carousel.reInit({ startIndex: 0 });
    measure();
    carousel.on("select", measure).on("reInit", measure);
    return () => { carousel.off("select", measure).off("reInit", measure); };
  }, [carousel, category]);

  function move(direction: number) {
    const jump = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (direction < 0) carousel?.scrollPrev(jump);
    else carousel?.scrollNext(jump);
  }

  const { indices } = position;
  const consecutive = indices.every((value, i) => i === 0 || value === indices[i - 1] + 1);
  const range = indices.length === 1 ? indices[0] :
    consecutive ? `${indices[0]}–${indices.at(-1)}` : indices.join(", ");

  return (
    <section
      className="project-showcase studio-container"
      aria-label="Our work"
      aria-roledescription="carousel"
    >
      <div className="showcase-heading">
        <div>
          <h2>Our work</h2>
          <p className="showcase-description">Our own products show how we approach websites, search, and automation.</p>
        </div>
      </div>
      {children}
      {panel ? <div id={`showcase-${category}`}>{panel}</div> : <>
      <div className="showcase-toolbar">
        <div className="showcase-progress">
          <strong role="status" aria-live="polite">
            {range} of {projects.length}
          </strong>
        </div>
      </div>
      <div className="showcase-frame">
        {position.overflow && <div className="showcase-controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-controls={`showcase-${category}`}
              aria-label={`Previous ${title} projects`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-controls={`showcase-${category}`}
              aria-label={`Next ${title} projects`}
            >
              <span aria-hidden="true">→</span>
            </button>
        </div>}
      <div
        ref={viewport}
        id={`showcase-${category}`}
        className="showcase-viewport"
        tabIndex={0}
        role="group"
        aria-label={`${title} projects. Swipe or use the arrow buttons to explore.`}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="showcase-track">
        {projects.map((project, index) => (
          <GalleryCard
            key={project.slug}
            project={project}
            index={index}
            businessFriendly={Boolean(consultation)}
            placement="homepage_carousel"
          />
        ))}
        </div>
      </div>
      </div>
      </>}
      <div className="showcase-bottom">
        {examplesLink && <Link className="studio-text-link" href={examplesLink.href}>{examplesLink.label} <span aria-hidden="true">↗</span></Link>}
        <Link className="studio-text-link" href={consultation?.href ?? "/contact"}>
          {consultation?.label ?? "Have something in mind? Tell us about it"} <span aria-hidden="true">↗</span>
        </Link>
        {!examplesLink && !consultation && <span className="showcase-star-date">GitHub stars as of Oct 11, 2026</span>}
      </div>
    </section>
  );
}
