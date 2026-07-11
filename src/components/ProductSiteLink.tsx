"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";

export function ProductSiteLink({
  href,
  projectName,
  projectSlug,
  placement,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  projectName: string;
  projectSlug?: string;
  placement: "homepage_card" | "project_hero" | "project_footer";
  className: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  function captureProductOpen() {
    if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
      return;
    }

    posthog.capture("product_site_opened", {
      project_name: projectName,
      project_slug: projectSlug,
      placement,
      destination_url: href,
      source_path: window.location.pathname,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={captureProductOpen}
    >
      {children}
    </a>
  );
}
