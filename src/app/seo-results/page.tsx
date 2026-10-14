import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { inquiryHref } from "@/lib/inquiry";
import { siteUrl } from "@/lib/site";
import { SeoResultCards } from "@/components/SeoResultCards";
import { SeoProcess } from "@/components/SeoProcess";
import "./results.css";

const description = "Search results from our own products: 7,116 Google Search clicks for Bleep That Sh*t, 284 for BugDrop, and 4,175 for neonwatty.com from June 12–October 11, 2026.";
export const metadata: Metadata = {
  title: "SEO Results: Apps & Content", description,
  alternates: { canonical: "/seo-results" },
  openGraph: { title: "SEO results from the products we build | Mean Weasel", description, url: "/seo-results", images: ["/opengraph-image"] },
};
export default function SeoResultsPage() {
  return <div className="studio-home seo-results">
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage", name: "SEO results: Apps & Content", description, url: `${siteUrl}/seo-results`,
    }).replace(/</g, "\\u003c") }} />
    <main id="main-content" className="results-main">
      <section className="results-hero" aria-labelledby="results-title">
      <header className="results-intro studio-container">
        <Link className="studio-text-link" href="/services#seo">← SEO services</Link>
        <p className="studio-eyebrow">OUR PRODUCTS · REAL AUDIENCES</p>
        <h1 id="results-title">Built to be useful.<br /><em>Found through search.</em></h1>
        <p className="results-lead">See our apps and articles in Google Search. Flip each card to explore its audience or search clicks.</p>
        <a className="home-cta-button" href="#results">Explore the results ↓</a>
      </header>
      </section>
      <section id="results" className="results-proof" aria-label="SEO results from our own sites">
      <SeoResultCards />
      <div className="studio-container">
        <details className="results-method"><summary>About these results and their limits</summary><p>Source: Google Search Console, reviewed October 14, 2026. Search charts and totals cover June 12–October 11, 2026 for the domain properties bleepthat.sh, bugdrop.dev, and neonwatty.com, using Web search. All three are our own sites, not client engagements.</p><p>Bars start at zero and each chart is scaled to its own peak. Impressions count appearances in search results; clicks count visits from those results. Each bar shows the cumulative total since June 12, measured at the end of each monthly period on the 11th. The four monthly source periods were verified directly in Search Console. Cumulative bars show the running total, not month-to-month growth. This is a fixed snapshot, not a live report. The older bleep-that-sht.com property is excluded.</p><p>Bleep users are registered accounts, counted from production signup dates in a read-only database query on October 14, 2026. The chart shows all-time totals at each date: 873 on July 11, 1,520 on August 11, 2,254 on September 11, and 3,108 on October 11 (UTC day-end). Known internal/test accounts are excluded. These are currently retained accounts grouped by signup date, not a historical record of deleted accounts, active users, paying customers, or signups attributed to Google.</p><p>BugDrop “users” means GitHub accounts with BugDrop installed, including both individual and organization accounts. It does not measure individual people or active usage. The <a href="https://github.com/marketplace/bugdrop-in-app-feedback-to-github-issues">public GitHub Marketplace listing</a> showed 184 installs when checked October 14, 2026. The production installation records matched that total. Grouped by original GitHub installation date, the retained installations total 85 through July 11, 115 through August 11, 143 through September 11, and 182 through October 11 (UTC day-end); two newer installations fall outside the chart. These bars reconstruct creation-date cohorts of currently retained installations, not historical Marketplace snapshots or a lifetime total including uninstalls. One installation can represent a person or an organization; these are not individual users or installs attributed to Google. Separate acquisition tracking began October 9 and cannot recover earlier uninstalls.</p><p>neonwatty.com is our blog of practical guides. Its monthly impressions were 103,064, 62,902, 39,328, and 33,377; clicks were 1,712, 1,112, 754, and 597 across the four reporting periods. The cumulative charts total 238,671 impressions and 4,175 clicks. Monthly traffic declined across this window; the rising cumulative bars show accumulated reach, not accelerating growth. No AI referral traffic is included.</p><p>Clicks are not unique visitors, signups, or revenue. These observations do not isolate the effect of individual SEO changes or predict results for another site.</p></details>
      </div>
      </section>
      <section className="results-process" aria-labelledby="seo-process-title"><div className="studio-container">
        <p className="studio-eyebrow">HOW WE CAN HELP YOUR BUSINESS</p>
        <h2 id="seo-process-title">A clear plan. Practical improvements.</h2>
        <SeoProcess />
        <Link className="studio-text-link" href="/services#seo">Explore what’s included in an SEO project ↗</Link>
      </div></section>
      <section className="results-closing" aria-labelledby="results-cta"><div className="studio-container">
        <p className="studio-eyebrow">START WITH WHAT YOUR CUSTOMERS ARE LOOKING FOR</p><h2 id="results-cta">Let’s help more people<br /><em>find your business.</em></h2><p>We’ll review your site and search data, identify useful improvements, and agree on a focused scope.</p><Link className="home-cta-button" href={inquiryHref("SEO Foundation Project")}>Talk with us about SEO ↗</Link><p className="results-note">Scope and cost agreed before work begins.</p>
      </div></section>
    </main><SiteFooter />
  </div>;
}
