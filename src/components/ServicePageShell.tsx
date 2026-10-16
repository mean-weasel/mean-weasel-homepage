import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceSectionNav } from "@/components/ServiceSectionNav";
import { siteUrl } from "@/lib/site";
import "@/app/services/web-design-phoenix/services.css";
import "@/app/services/service-pages.css";

export const inquiryPath = "/contact";

export function ServicePageShell({ active, title, children }: {
  active: "services" | "how-we-work"; title: string; children: ReactNode;
}) {
  return <div className="studio-home services-page">
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage", name: title,
      url: `${siteUrl}/${active}`, isPartOf: { "@type": "WebSite", name: "Mean Weasel", url: siteUrl },
    }).replace(/</g, "\\u003c") }} />
    <main id="main-content" className="services-main service-editorial" data-page={active}>
      {active === "services" && <ServiceSectionNav />}
      {children}
    </main>
    <SiteFooter />
  </div>;
}

export function ServicePageCta() {
  return <section className="service-closing" id="get-started">
    <div className="studio-container">
      <p className="studio-eyebrow">A CONVERSATION IS A GOOD START</p>
      <h2>Tell us what you need.<br /><em>We’ll help shape the next step.</em></h2>
      <p>A current website, a rough idea, or a process that takes too much time. You don’t need a finished brief to reach out.</p>
      <Link className="service-button" href={inquiryPath}>Request a consultation <span aria-hidden="true">↗</span></Link>
      <p className="service-small">We’ll reply to discuss your goals. Scope and pricing are agreed before work begins.</p>
    </div>
  </section>;
}
