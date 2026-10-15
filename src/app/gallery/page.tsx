import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SectionNav } from "@/components/ServiceSectionNav";
import { SeoProof } from "@/components/SeoProof";
import { galleryProjects } from "@/lib/gallery";
import "../seo-results/results.css";
import "./work.css";

export const metadata: Metadata = {
  title: "Our Work: Websites, SEO, Apps & AI Automation",
  description: "Explore our websites, verified SEO results, custom apps, and AI automation projects. Our own products show what we can build for your business.",
  alternates: { canonical: "/gallery" },
};
const sections = [["websites", "Websites"], ["search-results", "SEO results"], ["apps", "App development"], ["automation", "AI automation"]] as const;
const projects = (slugs: string[]) => slugs.map(slug => galleryProjects.find(project => project.slug === slug)!);

export default function GalleryPage() {
  return <div className="studio-home"><SiteHeader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "Our Work", url: "https://mean-weasel.com/gallery" }) }} /><main id="main-content" className="work-hub work-by-service">
    <SectionNav sections={sections} label="Work by service" />
    <section id="websites" className="work-service work-websites" aria-labelledby="work-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / BUSINESS WEBSITES</p><h1 id="work-title">Built by us. Built to be useful.</h1><p>Explore our own projects by service. These are examples of our capabilities, not client case studies.</p><p>Clear product pages, useful content, and a simple next step. Bleep and BugDrop show our approach to presenting a business online.</p><Link className="studio-text-link" href="/services#website-packages">Business website services ↗</Link></header>
      <ProjectShowcase title="Business websites" category="work-websites" projects={projects(["bleep-that-shit", "bugdrop"])} />
    </section>
    <section id="search-results" className="work-service work-seo results-proof" aria-labelledby="work-seo-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / SEO & CONTENT</p><h2 id="work-seo-title">Useful pages. Real visibility.</h2><p>Google impressions and audience results from our apps and articles. Flip each card to see more.</p><Link className="studio-text-link" href="/services#seo">SEO & content services ↗</Link></header>
      <SeoProof />
    </section>
    <section id="apps" className="work-service work-apps" aria-labelledby="work-apps-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / APP DEVELOPMENT</p><h2 id="work-apps-title">From an idea to a working app.</h2><p>Tools for reporting bugs, editing media, planning events, and finding the right content.</p><Link className="studio-text-link" href="/services#custom">App design & development services ↗</Link></header>
      <ProjectShowcase title="App development" category="work-apps" projects={projects(["bugdrop", "bleep-that-shit", "seatify", "meme-search", "ytgify"])} />
    </section>
    <section id="automation" className="work-service work-automation" aria-labelledby="work-automation-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / AI AUTOMATION</p><h2 id="work-automation-title">Less repetitive work.</h2><p>Job Apply helps with forms. Foil turns speech into useful text. Logo Designer helps shape ideas into artwork. The same capabilities can support your team’s daily work.</p><Link className="studio-text-link" href="/services#automation">AI automation services ↗</Link></header>
      <ProjectShowcase title="AI automation" category="work-automation" projects={projects(["job-apply", "foil", "logo-designer"])} />
      <p className="studio-container work-more">More about our background: <Link href="/projects/machine-learning-refined">Machine Learning Refined, our coauthored textbook ↗</Link></p>
    </section>
  </main><SiteFooter /></div>;
}
