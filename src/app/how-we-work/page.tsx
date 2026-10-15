import type { Metadata } from "next";
import Link from "next/link";
import { ServicePageShell, ServicePageCta } from "@/components/ServicePageShell";

const description = "From a first conversation to launch: how Mean Weasel scopes, quotes, and delivers websites, SEO, apps, and AI automation.";
export const metadata: Metadata = {
  title: "How we work", description, alternates: { canonical: "/how-we-work" },
  openGraph: { title: "How we work | Mean Weasel", description, url: "/how-we-work", images: ["/opengraph-image"] },
};

export default function HowWeWorkPage() {
  return <ServicePageShell active="how-we-work" title="How we work">
    <section className="service-intro studio-container">
      <div><p className="studio-eyebrow">CLEAR STEPS · DIRECT COMMUNICATION</p><h1>Start with a conversation.<br /><em>Leave with a clear plan.</em></h1><p className="services-lead">Tell us what could work better. We’ll help you choose a practical starting point and agree on the work before it begins.</p><div className="services-actions"><Link className="service-button" href="/contact">Request a consultation ↗</Link><a className="studio-text-link" href="#process">See the steps ↓</a></div></div>
      <aside className="service-picker"><p className="studio-eyebrow">YOU DON’T NEED A FINISHED BRIEF</p><h2>Bring your goal.</h2><p>A current website, an idea, or a task that takes too much time. We’ll ask the questions that help shape the project.</p><p>You’ll work directly with Jeremy. No commitment when you first reach out.</p></aside>
    </section>
    <section id="process" className="service-band service-band-sage"><div className="studio-container"><p className="studio-eyebrow">FROM FIRST NOTE TO HANDOFF</p><h2>Know what happens next.</h2><ol className="work-process">
      <li><span>01</span><h3>Talk through the need</h3><p>We discuss your business, your goals, and what you already have.</p></li>
      <li><span>02</span><h3>Agree on the plan</h3><p>You receive a written scope, estimate, timeline, and responsibilities before committing.</p></li>
      <li><span>03</span><h3>Build and review</h3><p>We complete the agreed work, share progress, and review it with you at planned checkpoints.</p></li>
      <li><span>04</span><h3>Launch and hand over</h3><p>We test the work, provide access and guidance, and confirm any ongoing support.</p></li>
    </ol></div></section>
    <section id="project-cost" className="service-band service-band-blue"><div className="studio-container service-two-column"><div><p className="studio-eyebrow">SCOPE & COST</p><h2>A quote built around<br /><em>what you need.</em></h2><p>We quote each project after a conversation. Your proposal sets out deliverables, costs, payment milestones, and timing.</p><p>Hosting, domains, paid software, and ongoing support are separate. We explain recurring costs before you commit.</p><Link className="service-button" href="/contact">Request a consultation ↗</Link></div><div className="service-detail-card"><h3>What shapes your estimate?</h3><div className="pricing-factor"><strong>Content and pages</strong><p>What needs writing, organizing, designing, or moving.</p></div><div className="pricing-factor"><strong>Features and connections</strong><p>The tools, accounts, and workflows your project needs.</p></div><div className="pricing-factor"><strong>Launch and support</strong><p>Testing, handoff, and any maintenance we agree on.</p></div></div></div></section>
    <ServicePageCta />
  </ServicePageShell>;
}
