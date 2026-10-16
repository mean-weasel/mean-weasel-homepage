"use client";

import { useEffect, useRef, useState } from "react";

import "./SectionNav.css";

const serviceSections = [["website-packages", "Websites"], ["seo", "SEO & content"], ["custom", "Apps"], ["automation", "AI automation"]] as const;

export function SectionNav({ sections, label }: { sections: ReadonlyArray<readonly [string, string]>; label: string }) {
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nav = navRef.current;
        const edge = (nav?.getBoundingClientRect().bottom ?? 150) + 32;
        let current = "";
        for (const [id] of sections) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= edge) current = id;
        }
        setActive(current);
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);
  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLElement>('[aria-current="location"]');
    const row = link?.parentElement;
    if (!link || !row) return;
    const bounds = link.getBoundingClientRect();
    const viewport = row.getBoundingClientRect();
    if (bounds.left < viewport.left || bounds.right > viewport.right) {
      row.scrollTo({ left: row.scrollLeft + bounds.left - viewport.left - (row.clientWidth - bounds.width) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }, [active]);
  return <nav ref={navRef} className="service-section-nav" aria-label={label}>
    <div className="studio-container">
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}
    </div>
  </nav>;
}

export function ServiceSectionNav() {
  return <SectionNav sections={serviceSections} label="Service sections" />;
}
