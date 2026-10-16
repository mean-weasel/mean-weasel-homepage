import Link from "next/link";
import { inquiryHref } from "@/lib/inquiry";
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
const sections = [["websites", "Websites"], ["search-results", "SEO results"], ["apps", "Apps"], ["automation", "AI automation"]] as const;
const projects = (examples: Array<[string, string]>) => examples.map(([slug, description]) => ({
  ...galleryProjects.find(project => project.slug === slug)!, description,
}));
const websiteExamples: Array<[string, string]> = [
  ["bleep-that-shit", "A product website that explains the offer, shows how it works, and gives visitors a clear path to try it."],
  ["bugdrop", "Focused product pages that answer questions and guide visitors toward getting started."],
];
const appExamples: Array<[string, string]> = [
  ["bugdrop", "Capture customer feedback with screenshots and send it straight to the team’s issue tracker."],
  ["bleep-that-shit", "Upload a recording, review flagged words, and export edited media in one guided workflow."],
  ["seatify", "Organize guests and tables in a visual seating plan - an example of turning complex planning into a useful tool."],
  ["meme-search", "Find images by what they contain - a search tool built around a collection’s content."],
  ["ytgify", "Turn a video clip into a shareable GIF, with a simple selection and preview workflow."],
];
const automationExamples: Array<[string, string]> = [
  ["job-apply", "Reuses information to fill application forms for review. A similar approach could reduce customer onboarding paperwork."],
  ["foil", "Turns speech into polished text. The same approach could turn your spoken notes into customer emails or content drafts."],
  ["logo-designer", "Turns a written brief into editable logo options, with feedback guiding each revision. An example of AI-assisted creative work."],
];
function WorkActions({ service, href, label }: { service: string; href: string; label: string }) {
  return <div className="work-actions"><Link className="home-cta-button" href={inquiryHref(service)}>Request a consultation ↗</Link><Link className="studio-text-link" href={href}>{label} ↗</Link></div>;
}

export default function GalleryPage() {
  return <div className="studio-home"><SiteHeader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "Our Work", url: "https://mean-weasel.com/gallery" }) }} /><main id="main-content" className="work-hub work-by-service">
    <SectionNav sections={sections} label="Work by service" />
    <section id="websites" className="work-service work-websites" aria-labelledby="work-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / BUSINESS WEBSITES</p><h1 id="work-title">Built by us. Built to be useful.</h1><p>Our own products show what we can build for your business.</p><p>Websites that explain what you offer and make the next step easy. These examples show our work on our own businesses.</p><WorkActions service="New business website" href="/services#website-packages" label="Business website services" /></header>
      <ProjectShowcase title="Business websites" category="work-websites" projects={projects(websiteExamples)} consultation={{ href: inquiryHref("New business website"), label: "Let’s discuss your website" }} />
    </section>
    <section id="search-results" className="work-service work-seo results-proof" aria-labelledby="work-seo-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / SEO & CONTENT</p><h2 id="work-seo-title">Help the right customers discover your business.</h2><p>We create useful content and improve your website for discovery through Google and AI assistants like ChatGPT.</p><WorkActions service="SEO Foundation Project" href="/services#seo" label="SEO services" /><p className="results-evidence-note">Search charts show Google results, not AI search visibility.</p></header>
      <SeoProof />
    </section>
    <section id="apps" className="work-service work-apps" aria-labelledby="work-apps-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / APP DEVELOPMENT</p><h2 id="work-apps-title">From an idea to a working app.</h2><p>Custom tools that help customers and teams get things done. These examples show how we turn a complicated task into a clear workflow.</p><WorkActions service="Custom app or integration" href="/services#custom" label="App development services" /></header>
      <ProjectShowcase title="App development" category="work-apps" projects={projects(appExamples)} consultation={{ href: inquiryHref("Custom app or integration"), label: "Let’s discuss your app" }} />
    </section>
    <section id="automation" className="work-service work-automation" aria-labelledby="work-automation-title">
      <header className="studio-container work-service-intro"><p className="studio-eyebrow">OUR WORK / AI AUTOMATION</p><h2 id="work-automation-title">Less repetitive work.</h2><p>Reuse information, prepare drafts, and reduce manual work. Our tools demonstrate approaches we could adapt for your team, with people reviewing the results.</p><WorkActions service="AI automation" href="/services#automation" label="AI automation services" /></header>
      <ProjectShowcase title="AI automation" category="work-automation" projects={projects(automationExamples)} consultation={{ href: inquiryHref("AI automation"), label: "Let’s discuss your workflow" }} />
      <p className="studio-container work-more">More about our background: <Link href="/projects/machine-learning-refined">Machine Learning Refined, our coauthored textbook ↗</Link></p>
    </section>
  </main><SiteFooter /></div>;
}
