"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WeaselLogo } from "@/components/WeaselLogo";

export function SiteHeader({
  projectPage = false,
  servicesPage = false,
  homePage = false,
  activePage,
}: {
  projectPage?: boolean;
  servicesPage?: boolean;
  homePage?: boolean;
  activePage?: "services" | "use-cases" | "pricing" | "contact";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    function dismiss(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      header.current?.querySelector<HTMLButtonElement>(".studio-menu-toggle")?.focus();
    }
    const desktop = matchMedia("(min-width: 801px)");
    function resize() { if (desktop.matches) setMenuOpen(false); }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", resize);
    };
  }, [menuOpen]);
  return (
    <>
      <a
        className="studio-skip"
        href={projectPage ? "#project-content" : "#main-content"}
      >
        Skip to content
      </a>
      <header ref={header} className="studio-header" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenuOpen(false);
      }}>
        <div className="studio-container studio-nav">
          <Link href="/" className="studio-brand" aria-label="Mean Weasel home">
            <WeaselLogo className="w-10 h-10" />
            <span>
              mean weasel<span className="brand-period">.</span>
            </span>
          </Link>
          <button
            className="studio-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
          </button>
          <nav
            id="primary-navigation"
            className={menuOpen ? "is-open" : ""}
            aria-label="Primary navigation"
            onClick={() => setMenuOpen(false)}

          >
            {homePage ? (
              <>
                <a href="#services">Services</a>
                <a href="#products">Examples</a>
                <Link href="/use-cases">Use cases</Link>
                <Link href="/pricing">Pricing</Link>
                <Link className="nav-contact" href="/contact">Get in touch ↗</Link>
              </>
            ) : (
              <>
                <Link href="/">Home</Link>
                <Link href="/services" className={servicesPage || activePage === "services" ? "nav-selected" : ""} aria-current={activePage === "services" ? "page" : undefined}>Services</Link>
                <Link href="/use-cases" aria-current={activePage === "use-cases" ? "page" : undefined} className={activePage === "use-cases" ? "nav-selected" : ""}>Use cases</Link>
                {projectPage && <Link href="/#products">Examples</Link>}
                <Link href="/pricing" aria-current={activePage === "pricing" ? "page" : undefined} className={activePage === "pricing" ? "nav-selected" : ""}>Pricing</Link>
                <Link className="nav-contact" href="/contact" aria-current={activePage === "contact" ? "page" : undefined}>Get in touch ↗</Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
