import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WeaselLogo } from "@/components/WeaselLogo";
import {
  allProjects,
  buildingProjects,
  liveProjects,
  type Project,
} from "@/lib/projects";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mean Weasel | Independent Software Studio",
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
        alt: "Mean Weasel independent software studio project index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mean Weasel | Independent Software Studio",
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
      itemListElement: allProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.name,
          description: project.description,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: project.url ?? siteUrl,
          author: {
            "@id": `${siteUrl}/#organization`,
          },
        },
      })),
    },
  ],
};

function ProjectSection({
  eyebrow,
  title,
  description,
  id,
  projects,
}: {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
  projects: Project[];
}) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-14 md:py-20">
      <div className="mb-10 md:mb-12">
        <div className="inline-flex items-center gap-4 mb-5">
          <div className="h-px w-10 bg-[var(--accent)]/40" />
          <span className="font-display text-sm font-medium text-[var(--accent)] uppercase tracking-widest">
            {eyebrow}
          </span>
        </div>
        <div className="grid md:grid-cols-[1fr_0.75fr] gap-5 md:gap-10 md:items-end">
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {title}
          </h2>
          <p className="font-body text-lg text-[var(--muted)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="animate-fade-up"
            style={{ animationDelay: `${(index + 3) * 80}ms` }}
          >
            <ProductCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen hero-bg grid-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader />

      <main id="top">
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
            <div className="flex justify-center lg:justify-start animate-scale-in">
              <div className="relative">
                <WeaselLogo className="w-28 h-28 md:w-40 md:h-40 animate-wiggle" />
                <div
                  aria-hidden="true"
                  className="absolute -top-3 -right-4 h-1.5 w-12 bg-[var(--accent)] opacity-70 rotate-6"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-2 -left-5 h-1.5 w-10 bg-cyan-400 opacity-80 -rotate-6"
                />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="font-display text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-5 animate-fade-up delay-100">
                Independent software studio
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up delay-200">
                We build tools that get you from idea to done.
              </h1>
              <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href="#products"
                  className="group inline-flex items-center justify-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-7 py-3 rounded-lg font-display font-bold text-base transition-all shadow-lg shadow-[var(--accent)]/20 hover:shadow-xl hover:shadow-[var(--accent)]/25"
                >
                  See live products
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 transition-transform group-hover:translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
                <a
                  href="#building"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-lg font-display font-bold text-base border border-[var(--accent)]/30 text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  What is next
                </a>
              </div>
            </div>
          </div>
        </section>

        <ProjectSection
          id="products"
          eyebrow="Public Products"
          title="Useful software, out in the world."
          description="Small, practical products with clear jobs: capture feedback, clean media, plan events, check decks, dictate faster, and make public data easier to feel."
          projects={liveProjects}
        />

        <ProjectSection
          id="building"
          eyebrow="In The Works"
          title="The active workbench."
          description="Current builds include feedback boards, proof-of-shipping surfaces, dictation companions, creative asset lineage, and visual fidelity tooling."
          projects={buildingProjects}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
