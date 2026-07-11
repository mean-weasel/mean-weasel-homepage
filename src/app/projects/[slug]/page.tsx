import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductSiteLink } from "@/components/ProductSiteLink";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getPublishedProject,
  publishedProjects,
  type ProjectStatus,
} from "@/lib/projects";
import { siteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const statusClasses: Record<ProjectStatus, string> = {
  Live: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "Public beta": "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  Waitlist: "bg-amber-500/10 text-amber-800 dark:text-amber-300",
  "In the works": "bg-[var(--accent)]/10 text-[var(--accent)]",
};

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  if (!project) {
    return {};
  }

  const title = `${project.name} — ${project.category}`;
  const canonical = `/projects/${project.slug}`;
  const image = `${canonical}/opengraph-image`;

  return {
    title,
    description: project.introduction,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Mean Weasel`,
      description: project.introduction,
      url: canonical,
      siteName: "Mean Weasel",
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: project.headline }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Mean Weasel`,
      description: project.introduction,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  if (!project) {
    notFound();
  }

  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const audienceText = `${project.audience.charAt(0).toLowerCase()}${project.audience.slice(1)}`;
  const relatedProjects = publishedProjects
    .filter((candidate) => candidate.slug !== project.slug)
    .slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${projectUrl}/#software`,
        name: project.name,
        description: project.introduction,
        url: project.url,
        applicationCategory: project.category,
        operatingSystem: project.slug === "foil" ? "macOS" : "Web",
        author: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: { "@id": `${projectUrl}/#page` },
      },
      {
        "@type": "WebPage",
        "@id": `${projectUrl}/#page`,
        url: projectUrl,
        name: `${project.name} — ${project.category}`,
        description: project.introduction,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${projectUrl}/#software` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Mean Weasel",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.name,
            item: projectUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen hero-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader projectPage />

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-10 pb-16 md:pt-16 md:pb-24">
          <nav
            aria-label="Breadcrumb"
            className="font-display text-sm text-[var(--muted)] mb-10 animate-fade-in"
          >
            <Link href="/" className="hover:text-[var(--accent)]">
              Mean Weasel
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span>{project.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.03fr_0.97fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-up delay-100">
                <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {project.category}
                </span>
                <span aria-hidden="true" className="text-[var(--muted)]/40">
                  •
                </span>
                <span
                  className={`font-display text-xs font-bold px-3 py-1 rounded-full ${statusClasses[project.status]}`}
                >
                  {project.status}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.04] mb-6 animate-fade-up delay-200">
                {project.headline}
              </h1>
              <p className="font-body text-xl md:text-2xl text-[var(--muted)] leading-relaxed mb-8 animate-fade-up delay-300">
                {project.introduction}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-up delay-400">
                <ProductSiteLink
                  href={project.url}
                  projectName={project.name}
                  projectSlug={project.slug}
                  placement="project_hero"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-7 py-3.5 rounded-lg font-display font-bold transition-colors shadow-lg shadow-[var(--accent)]/20"
                >
                  {project.cta ?? `Open ${project.name}`}
                  <span aria-hidden="true">↗</span>
                </ProductSiteLink>
                <span className="font-body text-sm text-[var(--muted)]">
                  For {audienceText}
                </span>
              </div>
            </div>

            <div className="project-snapshot ornate-border rounded-2xl p-4 md:p-6 animate-scale-in delay-300">
              <div className="bg-[var(--foreground)] text-[var(--background)] rounded-xl p-6 md:p-8 min-h-[390px] flex flex-col">
                <div className="flex items-center justify-between gap-4 mb-12">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className={`w-11 h-11 ${project.color} rounded-lg flex items-center justify-center text-xl rotate-3`}
                    >
                      {project.icon}
                    </div>
                    <span className="font-display font-bold">{project.name}</span>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.14)]" />
                </div>
                <p className="font-display text-xs uppercase tracking-[0.2em] text-[var(--background)]/60 mb-4">
                  {project.snapshot.eyebrow}
                </p>
                <p className="font-display text-3xl md:text-4xl font-bold leading-tight mb-5">
                  {project.snapshot.headline}
                </p>
                <p className="font-body text-lg leading-relaxed text-[var(--background)]/70 mb-8">
                  {project.snapshot.detail}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.snapshot.signals.map((signal) => (
                    <span
                      key={signal}
                      className="font-display text-xs font-medium rounded-full border border-[var(--background)]/20 px-3 py-1.5"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-[var(--surface)]/75">
          <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
                The job
              </p>
              <h2 className="font-display text-2xl font-bold mb-4">
                Make the hard part explicit.
              </h2>
              <p className="font-body text-lg text-[var(--muted)] leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
                The approach
              </p>
              <h2 className="font-display text-2xl font-bold mb-4">
                Build around the real workflow.
              </h2>
              <p className="font-body text-lg text-[var(--muted)] leading-relaxed">
                {project.approach}
              </p>
            </div>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
                The distinction
              </p>
              <h2 className="font-display text-2xl font-bold mb-4">
                Keep the product focused.
              </h2>
              <p className="font-body text-lg text-[var(--muted)] leading-relaxed">
                {project.distinction}
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-8 md:gap-14">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-4">
                How it helps
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                A small tool with a clear job.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {project.highlights.map((highlight, index) => (
                <article
                  key={highlight.title}
                  className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6"
                >
                  <span className="font-display text-sm font-bold text-[var(--accent)]">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-xl font-bold mt-5 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="font-body text-[var(--muted)] leading-relaxed">
                    {highlight.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="rounded-2xl bg-[var(--foreground)] text-[var(--background)] px-7 py-10 md:px-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-7">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
                Visit the product
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                See {project.name} in its own habitat.
              </h2>
            </div>
            <ProductSiteLink
              href={project.url}
              projectName={project.name}
              projectSlug={project.slug}
              placement="project_footer"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-7 py-3.5 rounded-lg font-display font-bold transition-colors"
            >
              {project.cta ?? `Open ${project.name}`}
              <span aria-hidden="true">↗</span>
            </ProductSiteLink>
          </div>
        </section>

        <section className="border-t border-[var(--line)]">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="flex items-end justify-between gap-5 mb-8">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
                  More from Mean Weasel
                </p>
                <h2 className="font-display text-3xl font-bold">
                  Other focused tools.
                </h2>
              </div>
              <Link
                href="/#products"
                className="hidden sm:inline font-display text-sm font-bold text-[var(--accent)] hover:underline"
              >
                See all projects
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <ProductCard key={relatedProject.slug} {...relatedProject} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
