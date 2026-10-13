"use client";

import { useEffect, useRef, useState } from "react";

const serviceSections = [["website-packages", "Websites"], ["seo", "SEO"], ["custom", "Custom apps"], ["get-started", "Contact"]] as const;

const useCaseSections = [
  ["local-services", "Quote requests"], ["project-businesses", "Portfolios"],
  ["professional-services", "Consultations"], ["existing-websites", "Existing sites"],
  ["custom-workflows", "Custom tools"], ["get-started", "Contact"],
] as const;

export function ServiceSectionNav({ page = "services" }: { page?: "services" | "use-cases" }) {
  const sections = page === "services" ? serviceSections : useCaseSections;
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
  return <nav ref={navRef} className={`service-section-nav ${page === "use-cases" ? "use-case-section-nav" : ""}`} aria-label={page === "services" ? "Service sections" : "Use case sections"}>
    <div className="studio-container">
      {page === "use-cases" && <label className="section-jump-mobile">
        <span>On this page</span>
        <select aria-label="Jump to a use case" value={active} onChange={event => {
          if (event.target.value) window.location.hash = event.target.value;
        }}>
          <option value="" disabled>Choose a use case</option>
          {sections.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>
      </label>}
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}
    </div>
  </nav>;
}
