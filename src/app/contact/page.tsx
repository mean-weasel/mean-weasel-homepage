import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InquiryForm } from "@/components/InquiryForm";
import { inquiryServices } from "@/lib/inquiry";
import { siteUrl } from "@/lib/site";
import "@/app/services/web-design-phoenix/services.css";
import "./contact.css";

export const metadata: Metadata = {
  title: "Request a consultation",
  description: "Talk with Mean Weasel about a business website, app, SEO, or AI automation. Share a few details and Jeremy will reply directly.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Request a consultation | Mean Weasel", url: "/contact", images: ["/opengraph-image"] },
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
      name: "Request a consultation", url: `${siteUrl}/contact`,
      isPartOf: { "@type": "WebSite", name: "Mean Weasel", url: siteUrl },
    }).replace(/</g, "\\u003c") }} />
    <main id="main-content" className="services-main contact-main studio-container">
      <header className="contact-intro">
        <p className="studio-eyebrow">LET’S WORK TOGETHER</p>
        <h1>What could work<br /><em>better for you?</em></h1>
        <p>A better website, more customers finding you, or less repetitive work. Tell us what you need - we’ll help you find a starting point.</p>
      </header>
      <InquiryForm key={selected} initialService={selected} />
      <aside className="contact-next" aria-label="What happens next">
        <h2>What happens next</h2>
        <p>Jeremy will reply by email. We’ll discuss your goals, then suggest a practical next step with a clear scope and cost.</p>
        <p>No commitment when you reach out. Prefer email? <a href="mailto:jeremy@mean-weasel.com">jeremy@mean-weasel.com</a></p>
      </aside>
    </main>
    <SiteFooter />
  </div>;
}
