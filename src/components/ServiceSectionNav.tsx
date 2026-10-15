"use client";

import { useEffect, useRef, useState } from "react";

const serviceSections = [["website-packages", "Websites"], ["seo", "SEO"], ["custom", "Apps"], ["automation", "Automation"], ["get-started", "Contact"]] as const;

export function ServiceSectionNav() {
  const sections = serviceSections;
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
  return <nav ref={navRef} className="service-section-nav" aria-label="Service sections">
    <div className="studio-container">
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}
    </div>
  </nav>;
}
