import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HomeExamples } from "@/components/HomeExamples";
import { galleryProjects } from "@/lib/gallery";
export const metadata: Metadata = { title: "Our Work", description: "Explore the apps, AI tools, and learning resources we build at Mean Weasel.", alternates: { canonical: "/gallery" } };
export default function GalleryPage() {
  return <div className="studio-home"><SiteHeader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "Our Work", url: "https://mean-weasel.com/gallery" }) }} /><main id="main-content" className="work-hub"><section className="work-page"><header className="studio-container work-page-intro"><p className="studio-eyebrow">BUILT BY MEAN WEASEL</p><h1>Our work.</h1><p>Our own products and practical experience. Explore what we’ve built, then see how our sites perform in search.</p><a className="studio-text-link work-results-link" href="#search-results">See our SEO results ↓</a></header><HomeExamples projects={galleryProjects} /></section><section id="search-results" className="work-results"><div className="studio-container"><p className="studio-eyebrow">MEASURED RESULTS FROM OUR OWN SITES</p><h2>Built by us.<br /><em>Found through search.</em></h2><p>Bleep, BugDrop, and neonwatty.com show our experience building products and publishing useful content. Explore verified Google impressions, audience counts, and search clicks.</p><p>These are our own projects, not client case studies.</p><div className="services-actions"><Link className="home-cta-button" href="/seo-results">Explore SEO results ↗</Link><Link className="studio-text-link" href="/services#seo">How we can help your business ↗</Link></div></div></section></main><SiteFooter /></div>;
}
