import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HomeExamples } from "@/components/HomeExamples";
import { galleryProjects } from "@/lib/gallery";
export const metadata: Metadata = { title: "Our Work", description: "Explore the apps, AI tools, and learning resources we build at Mean Weasel.", alternates: { canonical: "/gallery" } };
export default function GalleryPage() {
  return <div className="studio-home"><SiteHeader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "Our Work", url: "https://mean-weasel.com/gallery" }) }} /><main id="main-content" className="work-page"><header className="studio-container work-page-intro"><p className="studio-eyebrow">BUILT BY MEAN WEASEL</p><h1>Our work.</h1><p>Apps, AI tools, and learning resources. Choose a category to explore.</p></header><HomeExamples projects={galleryProjects} /></main><SiteFooter /></div>;
}
