import type { Metadata } from "next";
import Link from "next/link";
import { ServicePageShell, ServicePageCta, inquiryPath } from "@/components/ServicePageShell";
import { inquiryHref } from "@/lib/inquiry";
import { websitePackages, includedSeo } from "@/lib/service-offerings";

const description = "Compare Phoenix small-business website packages, content and SEO for Google and AI search, custom app development, and AI automation from Mean Weasel.";
export const metadata: Metadata = {
  title: "Websites, Apps, SEO & AI Automation", description, alternates: { canonical: "/services" },
  openGraph: { title: "Websites, Apps, SEO & Automation | Mean Weasel", description, url: "/services", images: ["/opengraph-image"] },
};

export default function ServiceBreakdownPage() {
  return <ServicePageShell active="services" title="Websites, Apps, SEO & AI Automation">
    <section className="service-intro studio-container">
      <div>
        <p className="studio-eyebrow">PHOENIX · SCOTTSDALE · THE VALLEY</p>
        <h1>What would help<br /><em>your business grow?</em></h1>
        <p className="services-lead">A better website, more ways to be found, or less manual work. Start with what you need.</p>
        <p className="service-intro-reassurance">We agree on scope and cost before work begins.</p>
        <div className="services-actions"><Link className="service-button" href={inquiryPath}>Request a consultation ↗</Link><Link className="studio-text-link" href="/how-we-work">How we work ↗</Link></div>
      </div>
      <aside className="service-picker" aria-label="Find a service">
        <p className="studio-eyebrow">WHAT DO YOU NEED HELP WITH?</p>
        {[
          ["01", "Business websites", "I need a new or better website.", "website-packages"],
          ["02", "SEO & content", "I want customers to find us through Google and AI search.", "seo"],
          ["03", "App design & development", "I need a custom tool for customers or staff.", "custom"],
          ["04", "AI automation", "I want to reduce repetitive work across our existing tools.", "automation"],
        ].map(([n, label, detail, id]) => <a href={`#${id}`} key={id}><span>{n}</span><div><strong>{label}</strong><small>{detail}</small></div><span aria-hidden="true">↓</span></a>)}
        <div className="service-picker-help"><p>Not sure which fits? Tell us what you want to improve.</p><Link className="studio-text-link" href={inquiryHref("Not sure yet")}>Help me choose ↗</Link></div>
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
            <div className="service-card-end"><p className="service-small">{offer.timeline} Final timing is confirmed in your proposal.</p><Link className="service-button" href={inquiryHref(offer.name)}>Request a consultation ↗</Link></div>
          </article>)}
        </div>
        <p className="service-example"><strong>For example:</strong> A landscaper could show completed projects and collect quote requests. A consultant could explain their services and invite a first conversation.</p><p className="service-scope-note">Hosting, domains, paid software, photography, and additional work are separate. We’ll confirm recurring costs and any support arrangements in your written scope.</p>
        <Link className="studio-text-link" href="/services/web-design-phoenix">More about our Phoenix website process ↗</Link>
      </div>
    </section>

    <section className="service-band service-band-blue" id="seo">
      <div className="studio-container service-two-column">
        <div><p className="studio-eyebrow">02 / SEO & CONTENT</p><h2>Help the right customers<br /><em>discover your business.</em></h2><p>We create useful content and improve your website for discovery through Google and AI assistants like ChatGPT.</p><div className="services-actions"><Link className="service-button" href={inquiryHref("SEO Foundation Project")}>Request a consultation ↗</Link><Link className="studio-text-link" href="/gallery#search-results">See our Google search results ↗</Link></div><p className="service-example"><strong>For example:</strong> Improve a service page so customers can find what you offer, see where you work, and request a quote.</p><details className="seo-included"><summary>SEO setup included with a new website</summary><ul className="service-checklist">{includedSeo.map(item => <li key={item}>{item}</li>)}</ul></details></div>
        <article className="service-detail-card seo-offer"><h3>SEO Foundation Project</h3><p>For an existing website that needs better visibility and a clear plan.</p>
          <ul><li>Find out what your customers are searching for.</li><li>Improve up to five existing pages and address agreed search issues.</li><li>Measure progress and leave you with clear next steps.</li></ul>
          <p className="service-small seo-scope-summary">New content and ongoing SEO are quoted separately.</p>
          <details className="service-inclusions"><summary>Scope and approach</summary><ul>
            <li><strong>Keyword research &amp; search intent</strong> - understand what customers need.</li>
            <li><strong>On-page SEO</strong> - improve titles, descriptions, headings, and copy.</li>
            <li><strong>AI search readiness</strong> - clarify services, business details, and answers for AI assistants.</li>
            <li><strong>Technical SEO</strong> - improve page access, structure, and internal links.</li>
            <li><strong>Performance measurement</strong> - report Google results and identifiable AI referrals separately, where available.</li>
          </ul><p className="service-small">We review your Google Business Profile where relevant. Final scope depends on your website, access, and priorities. Rankings, AI mentions, and lead volumes aren’t guaranteed.</p></details>
        </article>
      </div>
    </section>

    <section className="service-band" id="custom"><div className="studio-container service-two-column">
      <div><p className="studio-eyebrow">03 / APP DESIGN & DEVELOPMENT</p><h2>When the next step<br /><em>needs its own tool.</em></h2><p>When your business needs its own tool, we design and build it around your customers or team. Think customer portals, quote calculators, or a custom web app.</p><Link className="studio-text-link" href="/gallery#apps">Explore the software we build ↗</Link></div>
      <div className="service-custom-scope"><h3>Build around one clear need</h3><p className="service-example"><strong>For example:</strong> A customer portal for project updates, or a quote calculator that replaces a spreadsheet.</p><Link className="service-button" href={inquiryHref("Custom app or integration")}>Request a consultation ↗</Link><ol><li>Define the user journey and the problem to solve.</li><li>Design the interface and review data, accounts, integrations, and access needs.</li><li>Agree on a first release, milestones, and testing.</li><li>Confirm handoff and maintenance responsibilities.</li></ol></div>
    </div></section>
    <section id="automation" className="service-band service-band-lilac automation-section"><div className="studio-container">
      <header className="automation-heading"><p className="studio-eyebrow">04 / AI AUTOMATION</p><h2>Less repetitive work.<br /><em>More time for your business.</em></h2><p>Make the tools you already use work together. Start with one repetitive task, with your team reviewing the results.</p><Link className="service-button" href={inquiryHref("AI automation")}>Request a consultation ↗</Link></header>
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
        <div className="automation-process"><h3>Start with one workflow</h3><ol><li>Choose a task and map the tools you use.</li><li>Build a focused version and test real examples.</li><li>Agree on review steps, handoff, and support.</li></ol><p className="service-small">We agree on scope and cost first. Software subscriptions and ongoing support are separate.</p></div>
      </div>
    </div></section>
    <div className="studio-container pricing-discovery"><Link className="studio-text-link" href="/how-we-work">See our process and how we quote ↗</Link></div>
    <ServicePageCta />
  </ServicePageShell>;
}
