import { projectSchema } from "@/lib/project-schema";
import type { Metadata } from "next";
import Link from "next/link";
import { HomeExamples } from "@/components/HomeExamples";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WeaselLogo } from "@/components/WeaselLogo";
import { galleryProjects } from "@/lib/gallery";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Websites, SEO, Apps & AI Automation | Mean Weasel" },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Websites, SEO, Apps & AI Automation | Mean Weasel",
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mean Weasel business websites, SEO, apps, and AI automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites, SEO, Apps & AI Automation | Mean Weasel",
    description: siteDescription,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const projectJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Mean Weasel LLC",
      url: siteUrl,
      description: siteDescription,
      sameAs: ["https://github.com/mean-weasel"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: "Mean Weasel projects",
      itemListElement: galleryProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: projectSchema(project),
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="studio-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader homePage />
      <main id="main-content" className="homepage-main">
        <div className="home-band home-band-intro">
        <section
          className="studio-hero studio-container"
          aria-labelledby="studio-title"
        >
          <div className="hero-copy">
            <p className="studio-eyebrow">
              <span className="studio-dot" /> PHOENIX BUSINESS WEBSITES · MEAN WEASEL
            </p>
            <h1 id="studio-title">
              Better websites.<br />
              More visibility.<br />
              <em>Less busywork.</em>
            </h1>
            <p className="studio-intro">
              We build websites for small businesses, improve discovery through Google and AI search, and create apps and automations that save time. Based in Phoenix, working beyond.
            </p>
            <div className="home-hero-actions">
              <Link className="home-cta-button" href="/contact">
                Tell us about your project <span aria-hidden="true">↗</span>
              </Link>
              <a className="studio-text-link" href="#products">Explore the work <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <div className="hero-orbit">
              <span className="orbit-top">
                SMALL STUDIO · CURIOUS BY NATURE
              </span>
              <WeaselLogo className="hero-weasel" />
              <span className="orbit-bottom">
                MEAN WEASEL · EST. IN CURIOSITY
              </span>
            </div>
            <span className="mark-spark spark-one">✳</span>
            <span className="mark-spark spark-two">+</span>
          </div>
          <div className="hero-bottom">
            <span>WEBSITES · SEO · APPS · AI AUTOMATION</span>
            <span>
              SCROLL TO EXPLORE <span aria-hidden="true">↘</span>
            </span>
          </div>
        </section>
        </div>
        <div className="home-band home-band-services">
        <section
          id="services"
          className="homepage-services studio-container"
          aria-labelledby="home-services-title"
        >
          <div>
            <p className="studio-eyebrow">WORK WITH MEAN WEASEL</p>
            <h2 id="home-services-title">
              Your business.
              <br />
              <em>Built to work better.</em>
            </h2>
            <p>
              Work directly with us from first conversation to delivery. We build and run our own apps, create their content, and measure how people find and use them.
            </p>
            <Link
              className="studio-work-link"
              href="/services"
            >
              Explore services <span aria-hidden="true">↗</span>
            </Link>
            <Link className="studio-text-link home-service-inquiry" href="/contact">Let’s talk about your project ↗</Link>
            <Link className="studio-text-link home-service-inquiry" href="/gallery#search-results">See our Google search results ↗</Link>

          </div>
          <div className="home-services-offers">
            {[
              [
                "01",
                "Business websites",
                "Show what you offer and make it easy to get in touch.",
              ],
              ["02", "SEO & content", "Help customers discover you through Google and AI assistants like ChatGPT."],
              ["03", "App design & development", "Useful apps, customer portals, and business tools."],
              ["04", "AI automation", "Simplify follow-ups, routine admin, and content drafts."],
            ].map(([number, title, description]) => (
              <Link key={number} href={`/services#${({ "01": "website-packages", "02": "seo", "03": "custom", "04": "automation" })[number]}`}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <small>Explore the service</small>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
        </div>
        <div id="products" className="home-band home-band-work">
          <HomeExamples projects={galleryProjects} />
        </div>
        <div className="home-band home-band-studio">
          <section id="contact" className="home-final-cta studio-container" aria-labelledby="contact-title">
            <p className="studio-eyebrow">LET’S BUILD SOMETHING USEFUL</p>
            <h2 id="contact-title">Have a project in mind?<br /><em>Let’s talk about it.</em></h2>
            <p>Tell us what you want to improve. We’ll follow up to discuss your priorities, scope, and next steps.</p>
            <Link className="home-cta-button" href="/contact">Tell us about your project <span aria-hidden="true">↗</span></Link>
            <p className="home-cta-note">No finished brief needed. No commitment to start a conversation.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
