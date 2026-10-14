import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InquiryForm } from "@/components/InquiryForm";
import { inquiryServices } from "@/lib/inquiry";
import { siteUrl } from "@/lib/site";
import "@/app/services/web-design-phoenix/services.css";
import "./contact.css";

export const metadata: Metadata = {
  title: "Tell us about your project",
  description: "Talk with Mean Weasel about a business website, custom app, or SEO project. Share a few details and Jeremy will reply directly.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Tell us about your project | Mean Weasel", url: "/contact", images: ["/opengraph-image"] },
};

export default async function ContactPage({ searchParams }: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const selected = inquiryServices.find(value => value === service) ?? inquiryServices[0];
  return <div className="studio-home services-page">
    <SiteHeader activePage="contact" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "ContactPage",
      name: "Tell us about your project", url: `${siteUrl}/contact`,
      isPartOf: { "@type": "WebSite", name: "Mean Weasel", url: siteUrl },
    }).replace(/</g, "\\u003c") }} />
    <main id="main-content" className="services-main contact-main studio-container">
      <header className="contact-intro">
        <p className="studio-eyebrow">LET’S WORK TOGETHER</p>
        <h1>Tell us about<br /><em>your project.</em></h1>
        <p>A business website, a custom app, or help with SEO. Share what you have in mind—Jeremy will reply directly.</p>
      </header>
      <InquiryForm key={selected} initialService={selected} />
      <aside className="contact-next" aria-label="What happens next">
        <h2>What happens next</h2>
        <p>We’ll review your note, ask any follow-up questions, and agree on scope, timing, and pricing before work begins.</p>
        <p>No commitment to get started. Prefer email? <a href="mailto:jeremy@mean-weasel.com">jeremy@mean-weasel.com</a></p>
      </aside>
    </main>
    <SiteFooter />
  </div>;
}
