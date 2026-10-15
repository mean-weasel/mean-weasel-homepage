import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { inquiryHref } from "@/lib/inquiry";
import { siteUrl } from "@/lib/site";
import { SeoProof } from "@/components/SeoProof";
import { SeoProcess } from "@/components/SeoProcess";
import "./results.css";

const description = "Search results from our own products: 7,116 Google Search clicks for Bleep That Sh*t, 284 for BugDrop, and 4,175 for neonwatty.com from June 12–October 11, 2026.";
export const metadata: Metadata = {
  title: "SEO Results: Apps & Content", description,
  alternates: { canonical: "/seo-results" },
  openGraph: { title: "SEO results from the products we build | Mean Weasel", description, url: "/seo-results", images: ["/opengraph-image"] },
};
export default function SeoResultsPage() {
  return <div className="studio-home seo-results">
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage", name: "SEO results: Apps & Content", description, url: `${siteUrl}/seo-results`,
    }).replace(/</g, "\\u003c") }} />
    <main id="main-content" className="results-main">
      <section className="results-hero" aria-labelledby="results-title">
      <header className="results-intro studio-container">
        <Link className="studio-text-link" href="/gallery#search-results">← Our work</Link>
        <p className="studio-eyebrow">OUR PRODUCTS · REAL AUDIENCES</p>
        <h1 id="results-title">Help the right customers<br /><em>discover your business.</em></h1>
        <p className="results-lead">We create useful content and improve your website for discovery through Google and AI assistants like ChatGPT.</p>
        <p className="results-evidence-note">Search charts show Google results, not AI search visibility.</p><a className="home-cta-button" href="#results">Explore the results ↓</a>
      </header>
      </section>
      <section id="results" className="results-proof" aria-label="SEO results from our own sites">
      <SeoProof />
      </section>
      <section className="results-process" aria-labelledby="seo-process-title"><div className="studio-container">
        <p className="studio-eyebrow">HOW WE CAN HELP YOUR BUSINESS</p>
        <h2 id="seo-process-title">A clear plan. Practical improvements.</h2>
        <SeoProcess />
        <Link className="studio-text-link" href="/services#seo">Explore what’s included in an SEO project ↗</Link>
      </div></section>
      <section className="results-closing" aria-labelledby="results-cta"><div className="studio-container">
        <p className="studio-eyebrow">START WITH WHAT YOUR CUSTOMERS ARE LOOKING FOR</p><h2 id="results-cta">Let’s help more people<br /><em>find your business.</em></h2><p>We’ll review your site and search data, identify useful improvements, and agree on a focused scope.</p><Link className="home-cta-button" href={inquiryHref("SEO Foundation Project")}>Talk with us about SEO ↗</Link><p className="results-note">Scope and cost agreed before work begins.</p>
      </div></section>
    </main><SiteFooter />
  </div>;
}
