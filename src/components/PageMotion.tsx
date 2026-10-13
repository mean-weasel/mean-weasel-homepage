"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content stays visible without JavaScript or motion. */
export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("section-arrived");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });
    document.querySelectorAll(
      ".hero-copy, .home-final-cta > h2, .showcase-heading, .homepage-services > div, .gallery-page-intro, .services-hero > div, .services-section > h2, .services-seo-grid > div, .service-inquiry-grid > div, .service-intro > div, .service-picker, .service-band h2, .service-detail-card, .service-custom-scope, .service-closing h2",
    ).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
