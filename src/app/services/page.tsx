import type { Metadata } from "next";
import Link from "next/link";
import { ServicePageShell, ServicePageCta, inquiryPath } from "@/components/ServicePageShell";
import { inquiryHref } from "@/lib/inquiry";
import { websitePackages, includedSeo } from "@/lib/service-offerings";

const description = "Compare Phoenix small-business website packages, content help, SEO improvements, and custom app development from Mean Weasel.";
export const metadata: Metadata = {
  title: "Websites, App Development & SEO Services", description, alternates: { canonical: "/services" },
  openGraph: { title: "Websites, Apps & SEO | Mean Weasel", description, url: "/services", images: ["/opengraph-image"] },
};

export default function ServiceBreakdownPage() {
  return <ServicePageShell active="services" title="Websites, App Development & SEO Services">
    <section className="service-intro studio-container">
      <div>
        <p className="studio-eyebrow">PHOENIX · SCOTTSDALE · THE VALLEY</p>
        <h1>A clearer website.<br /><em>A useful next step.</em></h1>
        <p className="services-lead">Websites for small businesses, with the content, search foundations, and inquiry flow to support them.</p>
        <p>Start with the help you need today. We’ll agree on deliverables, responsibilities, and costs before work begins. For custom apps, we bring interface design and development together around the way your business works.</p>
        <div className="services-actions"><Link className="service-button" href={inquiryPath}>Discuss your project ↗</Link><Link className="studio-text-link" href="/use-cases">See how this could work for you ↗</Link></div>
      </div>
      <aside className="service-picker" aria-label="Find a service">
        <p className="studio-eyebrow">WHAT DO YOU NEED HELP WITH?</p>
        {[
          ["01", "A new business website", "Your content, thoughtfully put together.", "business-website"],
          ["02", "A website and the words", "Help shaping your message from the start.", "website-content"],
          ["03", "An existing site’s SEO", "A focused review and agreed improvements.", "seo"],
          ["04", "App design & development", "An app, tool, or connected workflow.", "custom"],
        ].map(([n, label, detail, id]) => <a href={`#${id}`} key={id}><span>{n}</span><div><strong>{label}</strong><small>{detail}</small></div><span aria-hidden="true">↓</span></a>)}
      </aside>
    </section>

    <section className="service-band service-band-sage" id="website-packages">
      <div className="studio-container">
        <p className="studio-eyebrow">01 / WEBSITE PACKAGES</p>
        <h2>A solid home for<br /><em>your business.</em></h2>
        <p className="service-section-copy">Both options include mobile-friendly design, foundational SEO, two consolidated revision rounds, and a recorded editing walkthrough.</p>
        <div className="service-detail-grid">
          {websitePackages.map((offer, index) => <article className="service-detail-card" id={index === 0 ? "business-website" : "website-content"} key={offer.name}>
            <p className="service-label">{index === 0 ? "YOU BRING THE CONTENT" : "WE SHAPE IT TOGETHER"}</p>
            <h3>{offer.name}</h3><p>{offer.intro}</p>
            <div className="service-price">Pricing to be confirmed</div>
            <p><strong>A good fit when</strong><br />{offer.fit}</p>
            <h4>What’s included</h4><ul>{offer.items.map(item => <li key={item}>{item}</li>)}</ul>
            <div className="service-card-end"><p className="service-small">{offer.timeline} Final timing is confirmed in your proposal.</p><Link className="service-button" href={inquiryHref(offer.name)}>Ask about {offer.name} ↗</Link></div>
          </article>)}
        </div>
        <p className="service-scope-note">Hosting, domains, paid software, photography, and additional work are separate. We’ll confirm recurring costs and any support arrangements in your written scope.</p>
        <Link className="studio-text-link" href="/services/web-design-phoenix">More about our Phoenix website process ↗</Link>
      </div>
    </section>

    <section className="service-band service-band-blue" id="seo">
      <div className="studio-container service-two-column">
        <div><p className="studio-eyebrow">02 / SEARCH FOUNDATIONS</p><h2>Make your website<br /><em>easier to understand.</em></h2><p>Every website package includes the SEO setup below. Already have a site? We can scope a separate round of improvements.</p><ul className="service-checklist">{includedSeo.map(item => <li key={item}>{item}</li>)}</ul></div>
        <article className="service-detail-card"><h3>SEO Foundation Project</h3><p>For an existing website that needs a clear set of priorities and practical fixes.</p><div className="service-price">Pricing to be confirmed</div><h4>What we work through</h4><ul><li>Review available Search Console data and the site’s technical setup.</li><li>Agree on improvements to up to five pages.</li><li>Implement the titles, headings, internal links, and other fixes listed in your proposal.</li><li>Review your Google Business Profile where relevant and check inquiry measurement.</li><li>Provide a record of changes and recommended next steps.</li></ul><p className="service-small">Access, platform limitations, and the review findings determine the final scope. Rankings and lead volumes aren’t guaranteed; ongoing content and monthly SEO work are scoped separately.</p><Link className="service-button" href={inquiryHref("SEO Foundation Project")}>Discuss an SEO project ↗</Link></article>
      </div>
    </section>

    <section className="service-band" id="custom"><div className="studio-container service-two-column">
      <div><p className="studio-eyebrow">03 / APP DESIGN & DEVELOPMENT</p><h2>When the next step<br /><em>needs its own tool.</em></h2><p>Custom web apps, customer portals, quote calculators, and internal workflows—from interface design through implementation. We start by mapping who uses the tool, what it needs to do, and which systems it connects to.</p><Link className="studio-text-link" href="/#products">Explore the software we build ↗</Link></div>
      <div className="service-custom-scope"><h3>Scope the smallest useful version</h3><ol><li>Define the user journey and the problem to solve.</li><li>Design the interface and review data, accounts, integrations, and access needs.</li><li>Agree on a first release, milestones, and testing.</li><li>Confirm handoff and maintenance responsibilities.</li></ol><div className="service-price">Pricing to be confirmed · scoped individually</div><Link className="service-button" href={inquiryHref("Custom app or integration")}>Discuss a custom project ↗</Link></div>
    </div></section>
    <div className="studio-container pricing-discovery"><Link className="studio-text-link" href="/pricing">Explore pricing & project scope ↗</Link></div>
    <ServicePageCta />
  </ServicePageShell>;
}
