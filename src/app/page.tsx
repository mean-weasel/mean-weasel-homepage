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
  title: { absolute: "Phoenix Business Websites, Apps & SEO | Mean Weasel" },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phoenix Business Websites, Apps & SEO | Mean Weasel",
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
        alt: "Mean Weasel business websites, apps, and SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phoenix Business Websites, Apps & SEO | Mean Weasel",
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
              We build business websites and custom apps, improve SEO, and automate repetitive work for small businesses in Phoenix and beyond.
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
            <span>WEBSITES · APPS · SEO · AI AUTOMATION</span>
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
              Websites, apps, SEO, and AI automation for Phoenix and beyond.
              Work directly with Jeremy from first conversation to launch.
            </p>
            <Link
              className="studio-work-link"
              href="/services"
            >
              Explore services <span aria-hidden="true">↗</span>
            </Link>
            <Link className="studio-text-link home-service-inquiry" href="/contact">Let’s talk about your project ↗</Link>
            <Link className="studio-text-link home-service-inquiry" href="/seo-results">See our SEO results ↗</Link>

          </div>
          <div className="home-services-offers">
            {[
              [
                "01",
                "Business websites",
                "Clear websites that turn visitors into inquiries.",
              ],
              [
                "02",
                "App design & development",
                "Useful apps, customer portals, and business tools.",
              ],
              [
                "03",
                "SEO",
                "Search improvements for the website you already have.",
              ],
              ["04", "AI automation", "Less repetitive work. More time for your business."],
            ].map(([number, title, description]) => (
              <Link key={number} href={`/services#${({ "01": "website-packages", "02": "custom", "03": "seo", "04": "automation" })[number]}`}>
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
            <p>A better website, a smoother workflow, or an app you wish existed. Tell us what you’re working on and we’ll figure out a useful next step.</p>
            <Link className="home-cta-button" href="/contact">Tell us about your project <span aria-hidden="true">↗</span></Link>
            <p className="home-cta-note">You’ll hear directly from Jeremy. No finished brief needed, and no commitment to get started.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
