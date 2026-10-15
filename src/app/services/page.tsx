import type { Metadata } from "next";
import Link from "next/link";
import { ServicePageShell, ServicePageCta, inquiryPath } from "@/components/ServicePageShell";
import { inquiryHref } from "@/lib/inquiry";
import { websitePackages, includedSeo } from "@/lib/service-offerings";

const description = "Compare Phoenix small-business website packages, content help, SEO improvements, custom app development, and AI automation from Mean Weasel.";
export const metadata: Metadata = {
  title: "Websites, Apps, SEO & AI Automation", description, alternates: { canonical: "/services" },
  openGraph: { title: "Websites, Apps, SEO & Automation | Mean Weasel", description, url: "/services", images: ["/opengraph-image"] },
};

export default function ServiceBreakdownPage() {
  return <ServicePageShell active="services" title="Websites, Apps, SEO & AI Automation">
    <section className="service-intro studio-container">
      <div>
        <p className="studio-eyebrow">PHOENIX · SCOTTSDALE · THE VALLEY</p>
        <h1>A clearer website.<br /><em>A useful next step.</em></h1>
        <p className="services-lead">Business websites first, with SEO, apps, and AI automation to help your business work better.</p>
        <p>Start with the help you need today. We’ll agree on deliverables, responsibilities, and costs before work begins. For custom apps, we bring interface design and development together around the way your business works.</p>
        <div className="services-actions"><Link className="service-button" href={inquiryPath}>Request a consultation ↗</Link><Link className="studio-text-link" href="/how-we-work">How we work ↗</Link></div>
      </div>
      <aside className="service-picker" aria-label="Find a service">
        <p className="studio-eyebrow">WHAT DO YOU NEED HELP WITH?</p>
        {[
          ["01", "Business websites", "A clear home for your business, with content help if needed.", "website-packages"],
          ["02", "SEO & content", "Help customers find and understand your business.", "seo"],
          ["03", "App design & development", "A useful tool built around your customers or team.", "custom"],
          ["04", "AI automation", "Less repetitive work, with you in control.", "automation"],
        ].map(([n, label, detail, id]) => <a href={`#${id}`} key={id}><span>{n}</span><div><strong>{label}</strong><small>{detail}</small></div><span aria-hidden="true">↓</span></a>)}
      </aside>
    </section>

    <section className="service-band service-band-sage" id="website-packages">
      <div className="studio-container">
        <p className="studio-eyebrow">01 / WEBSITE PACKAGES</p>
        <h2>A solid home for<br /><em>your business.</em></h2>
        <p className="service-section-copy">For new sites and redesigns. Both options include mobile-friendly design, foundational SEO, and a walkthrough at handoff.</p>
        <Link className="studio-text-link" href="/gallery#websites">Explore our website work ↗</Link>
        <div className="service-detail-grid">
          {websitePackages.map((offer, index) => <article className="service-detail-card" id={index === 0 ? "business-website" : "website-content"} key={offer.name}>
            <p className="service-label">{index === 0 ? "YOU BRING THE CONTENT" : "WE SHAPE IT TOGETHER"}</p>
            <h3>{offer.name}</h3><p>{offer.intro}</p>

            <p><strong>A good fit when</strong><br />{offer.fit}</p>
            <details className="service-inclusions"><summary>What’s included</summary><ul>{offer.items.map(item => <li key={item}>{item}</li>)}</ul></details>
            <div className="service-card-end"><p className="service-small">{offer.timeline} Final timing is confirmed in your proposal.</p><Link className="service-button" href={inquiryHref(offer.name)}>Ask about {offer.name} ↗</Link></div>
          </article>)}
        </div>
        <p className="service-example"><strong>For example:</strong> A landscaper could show completed projects and collect quote requests. A consultant could explain their services and invite a first conversation.</p><p className="service-scope-note">Hosting, domains, paid software, photography, and additional work are separate. We’ll confirm recurring costs and any support arrangements in your written scope.</p>
        <Link className="studio-text-link" href="/services/web-design-phoenix">More about our Phoenix website process ↗</Link>
      </div>
    </section>

    <section className="service-band service-band-blue" id="seo">
      <div className="studio-container service-two-column">
        <div><p className="studio-eyebrow">02 / SEO & CONTENT</p><h2>Make your website<br /><em>easier to understand.</em></h2><p>From research to implementation. We research what people search for, create useful content, optimize pages, and track performance in Google.</p><Link className="studio-text-link" href="/gallery#search-results">See results from our apps and articles ↗</Link><p className="service-example"><strong>For example:</strong> Improve a service page so customers can find what you offer, see where you work, and request a quote.</p><details className="seo-included"><summary>SEO setup included with a new website</summary><ul className="service-checklist">{includedSeo.map(item => <li key={item}>{item}</li>)}</ul></details></div>
        <article className="service-detail-card"><h3>SEO Foundation Project</h3><p>For an existing website that needs a clear set of priorities and practical fixes.</p><h4>What we can help with</h4><ul>
          <li><strong>Keyword research &amp; search intent</strong> - understand what customers search for and what they need.</li>
          <li><strong>Content strategy &amp; creation</strong> - plan useful topics and create pages that answer real questions.</li>
          <li><strong>On-page SEO</strong> - improve titles, descriptions, headings, and copy.</li>
          <li><strong>Internal linking</strong> - connect related pages so visitors can find their next step.</li>
          <li><strong>Technical SEO</strong> - help Google access and understand your website.</li>
          <li><strong>Performance measurement</strong> - track search visibility, clicks, and available inquiry data.</li>
        </ul><p className="service-small">The foundation project covers a review, agreed improvements to up to five existing pages, and recommended next steps. We review your Google Business Profile where relevant. New content and ongoing SEO are scoped separately.</p><p className="service-small">We confirm deliverables based on your website, access, and priorities. Rankings and lead volumes aren’t guaranteed.</p><Link className="service-button" href={inquiryHref("SEO Foundation Project")}>Discuss an SEO project ↗</Link></article>
      </div>
    </section>

    <section className="service-band" id="custom"><div className="studio-container service-two-column">
      <div><p className="studio-eyebrow">03 / APP DESIGN & DEVELOPMENT</p><h2>When the next step<br /><em>needs its own tool.</em></h2><p>Custom web apps, customer portals, quote calculators, and internal workflows - from interface design through implementation. We start by mapping who uses the tool, what it needs to do, and which systems it connects to.</p><Link className="studio-text-link" href="/gallery#apps">Explore the software we build ↗</Link></div>
      <div className="service-custom-scope"><h3>Build around one clear need</h3><p className="service-example"><strong>For example:</strong> A customer portal for project updates, or a quote calculator that replaces a spreadsheet.</p><ol><li>Define the user journey and the problem to solve.</li><li>Design the interface and review data, accounts, integrations, and access needs.</li><li>Agree on a first release, milestones, and testing.</li><li>Confirm handoff and maintenance responsibilities.</li></ol><Link className="service-button" href={inquiryHref("Custom app or integration")}>Discuss a custom project ↗</Link></div>
    </div></section>
    <section id="automation" className="service-band service-band-lilac automation-section"><div className="studio-container">
      <header className="automation-heading"><p className="studio-eyebrow">04 / AI AUTOMATION</p><h2>Less repetitive work.<br /><em>More time for your business.</em></h2><p>Start with one task. We connect your tools and prepare work for your team to review.</p></header>
      <div className="automation-offers">
        <article><h3>Inquiry handling &amp; follow-up</h3><p>Organize quote requests, add them to your customer tracker, and draft a reply for approval.</p></article>
        <article><h3>Forms &amp; everyday admin</h3><p>Reuse customer information to prepare onboarding forms and documents, ready for review.</p></article>
        <article><h3>Content preparation</h3><p>Turn your notes or dictated updates into website copy, emails, and social drafts for approval.</p></article>
      </div>
      <div className="automation-detail-grid">
        <div className="automation-examples"><h3>See what we’ve built</h3><Link className="studio-text-link" href="/gallery#automation">Explore our AI automation examples ↗</Link><p className="service-small">Our own products demonstrate the approach. These are examples of capabilities, not client results.</p>
          <Link className="use-case-proof" href="/projects/job-apply"><strong>Job Apply ↗</strong><span>Reuses information and fills forms for review. A similar approach could simplify customer onboarding.</span></Link>
          <Link className="use-case-proof" href="/projects/foil"><strong>Foil for Mac ↗</strong><span>Turns speech into cleaned-up text. The same idea could help turn a business owner’s spoken notes into useful drafts.</span></Link>
        </div>
        <div className="automation-process"><h3>Start with one workflow</h3><ol><li>Choose a task and map the tools you use.</li><li>Build a focused version and test real examples.</li><li>Agree on review steps, handoff, and support.</li></ol><p className="service-small">We agree on scope and cost first. Software subscriptions and ongoing support are separate.</p><Link className="service-button" href={inquiryHref("AI automation")}>Tell us what you’re doing manually ↗</Link></div>
      </div>
    </div></section>
    <div className="studio-container pricing-discovery"><Link className="studio-text-link" href="/how-we-work">See our process and how we quote ↗</Link></div>
    <ServicePageCta />
  </ServicePageShell>;
}
