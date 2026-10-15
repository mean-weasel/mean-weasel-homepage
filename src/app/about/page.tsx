import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Mean Weasel",
  description: "Work directly with Jeremy Watt, an AI engineer with over 10 years building production AI systems. Practical websites, apps, SEO, and automation for your business.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <div className="studio-home"><SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "About Mean Weasel", url: "https://mean-weasel.com/about" }) }} />
    <main id="main-content" className="about-page">
      <section className="about-intro"><div className="studio-container about-grid">
        <div><p className="studio-eyebrow">JEREMY WATT · FOUNDER · PHOENIX</p><h1>Deep technical experience.<br /><em>Practical help for your business.</em></h1><p>Mean Weasel is led by Jeremy Watt, an AI engineer with over 10 years building production AI systems. We bring that experience to business websites, apps, SEO, and automation.</p><p>You work directly with the person building your project. We help you choose what’s worth doing, explain the tradeoffs, and turn the plan into working software.</p><div className="services-actions"><Link className="home-cta-button" href="/contact">Request a consultation ↗</Link><a className="studio-text-link" href="#experience">Meet the person behind the work ↓</a></div></div>
        <aside className="about-proof" aria-label="Experience at a glance"><p className="studio-eyebrow">EXPERIENCE YOU CAN EXPLORE</p><div><strong>10+ years</strong><span>Building AI systems for real-world use.</span></div><div><strong>Products we run ourselves</strong><span>Apps, websites, and open-source tools - from design through launch and maintenance.</span><Link href="/gallery">Explore our work ↗</Link></div><div><strong>Search results you can inspect</strong><span>Measured Google visibility from our own products and writing.</span><Link href="/seo-results">See SEO results ↗</Link></div></aside>
      </div></section>
      <section id="experience" className="about-experience"><div className="studio-container about-grid">
        <div><p className="studio-eyebrow">RESEARCH · ENGINEERING · HANDS-ON WORK</p><h2>A background in solving<br /><em>different kinds of problems.</em></h2><p>Jeremy holds a PhD from Northwestern University and has worked in machine learning research and engineering. He also coauthored <Link href="/projects/machine-learning-refined">Machine Learning Refined</Link>, published by Cambridge University Press.</p><p>Before tech, he studied religion and worked as a certified HVAC technician. That varied background informs a practical approach: understand the problem before choosing the tool.</p><a className="studio-text-link" href="https://www.linkedin.com/in/jeremy-watt">View Jeremy’s professional background ↗</a></div>
        <div className="about-proof"><h3>What that means for your project</h3><div><strong>Advice you can understand</strong><span>Clear explanations of your options, costs, and the work involved.</span></div><div><strong>Experience beyond launch</strong><span>We build and maintain our own products, so usability, testing, and handoff are part of the conversation.</span></div><div><strong>A focused first step</strong><span>A website, a search improvement, or one useful automation. We agree on scope before building.</span></div><div className="services-actions"><Link className="home-cta-button" href="/contact">Tell us what you need ↗</Link><Link className="studio-text-link" href="/how-we-work">How we work ↗</Link></div></div>
      </div></section>
    </main><SiteFooter /></div>;
}
