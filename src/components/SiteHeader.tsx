"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WeaselLogo } from "@/components/WeaselLogo";

export function SiteHeader({
  projectPage = false,
}: {
  projectPage?: boolean;
  servicesPage?: boolean;
  homePage?: boolean;
  activePage?: "services" | "use-cases" | "pricing" | "contact";
}) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen && !servicesOpen) return;
    function dismiss(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) { setMenuOpen(false); setServicesOpen(false); }
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setServicesOpen(false);
      header.current?.querySelector<HTMLButtonElement>(menuOpen ? ".studio-menu-toggle" : ".services-menu-toggle")?.focus();
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
  }, [menuOpen, servicesOpen]);
  return (
    <>
      <a
        className="studio-skip"
        href={projectPage ? "#project-content" : "#main-content"}
      >
        Skip to content
      </a>
      <header ref={header} className="studio-header" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) { setMenuOpen(false); setServicesOpen(false); }
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
            onClick={event => { if ((event.target as HTMLElement).closest("a")) { setMenuOpen(false); setServicesOpen(false); } }}

          >
            <div className="services-nav-group">
              <button className="services-menu-toggle" aria-expanded={servicesOpen} aria-controls="services-navigation" onClick={() => setServicesOpen(!servicesOpen)}>Services <span aria-hidden="true">{servicesOpen ? "−" : "+"}</span></button>
              <div id="services-navigation" className="services-navigation" hidden={!servicesOpen}>
                {[["/services", "All services"], ["/services#website-packages", "Business websites"], ["/services#custom", "App development"], ["/services#seo", "SEO"], ["/services#automation", "AI automation"], ["/use-cases", "Use cases"], ["/pricing", "Pricing & scope"]].map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
              </div>
            </div>
            {[["/gallery", "Our work"], ["/seo-results", "SEO results"], ["/about", "About"]].map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={pathname === href ? "nav-selected" : ""}>{label}</Link>)}
            <Link className="nav-contact" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Get in touch ↗</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
