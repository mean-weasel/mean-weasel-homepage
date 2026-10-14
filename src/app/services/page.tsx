import type { Metadata } from "next";
import Link from "next/link";
import { ServicePageShell, ServicePageCta, inquiryPath } from "@/components/ServicePageShell";
import { SeoProcess } from "@/components/SeoProcess";
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
        <p className="services-lead">Business websites first, with apps, SEO, and AI automation to help your business work better.</p>
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
          ["05", "AI automation", "Less repetitive work, with you in control.", "automation"],
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
        <div><p className="studio-eyebrow">02 / SEARCH FOUNDATIONS</p><h2>Make your website<br /><em>easier to understand.</em></h2><p>From research to implementation. We research what people search for, create useful content, optimize pages, and track performance in Google.</p><Link className="studio-text-link" href="/seo-results">See results from our apps and articles ↗</Link><h3 className="seo-process-heading">How an SEO project works</h3><SeoProcess compact /><details className="seo-included"><summary>SEO setup included with a new website</summary><ul className="service-checklist">{includedSeo.map(item => <li key={item}>{item}</li>)}</ul></details></div>
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
      <div><p className="studio-eyebrow">03 / APP DESIGN & DEVELOPMENT</p><h2>When the next step<br /><em>needs its own tool.</em></h2><p>Custom web apps, customer portals, quote calculators, and internal workflows - from interface design through implementation. We start by mapping who uses the tool, what it needs to do, and which systems it connects to.</p><Link className="studio-text-link" href="/#products">Explore the software we build ↗</Link></div>
      <div className="service-custom-scope"><h3>Scope the smallest useful version</h3><ol><li>Define the user journey and the problem to solve.</li><li>Design the interface and review data, accounts, integrations, and access needs.</li><li>Agree on a first release, milestones, and testing.</li><li>Confirm handoff and maintenance responsibilities.</li></ol><Link className="service-button" href={inquiryHref("Custom app or integration")}>Discuss a custom project ↗</Link></div>
    </div></section>
    <section id="automation" className="service-band service-band-lilac"><div className="studio-container service-two-column">
      <div><p className="studio-eyebrow">04 / AI AUTOMATION</p><h2>Automate the repetitive<br /><em>parts of your business.</em></h2><p>Connect the tools you already use. Organize information, prepare drafts, and move routine work along with clear points for your team to review.</p><h3 className="seo-process-heading">Built on hands-on experience</h3><p>Our own AI tools show how we turn repeat tasks into guided workflows.</p><Link className="use-case-proof" href="/projects/job-apply"><strong>Job Apply ↗</strong><span>Assistance with repetitive application forms.</span></Link><Link className="use-case-proof" href="/projects/logo-designer"><strong>Logo Designer ↗</strong><span>A guided workflow for creating and refining SVG logos.</span></Link><p className="service-small">These are our products, not client automation case studies.</p></div>
      <article className="service-detail-card"><h3>Start with one useful workflow.</h3><ul><li>Route inquiries and prepare follow-up drafts.</li><li>Connect forms, spreadsheets, and business tools.</li><li>Summarize documents and organize information.</li><li>Draft content for your team to review.</li></ul><h4>How we work</h4><p>Map the task, agree on a small first version, and test it with real examples. We define review steps, handoff, and support before launch.</p><p className="service-small">Scope depends on your tools and data access. Software subscriptions and ongoing support are agreed separately.</p><Link className="service-button" href={inquiryHref("AI automation")}>Discuss an automation ↗</Link></article>
    </div></section>
    <div className="studio-container pricing-discovery"><Link className="studio-text-link" href="/pricing">Explore pricing & project scope ↗</Link></div>
    <ServicePageCta />
  </ServicePageShell>;
}
