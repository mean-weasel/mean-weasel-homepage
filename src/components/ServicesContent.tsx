"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import posthog from "posthog-js";
import { createInquiryId, inquiryServices } from "@/lib/inquiry";

import { websitePackages as packages, includedSeo as seo } from "@/lib/service-offerings";

const faqs = [
  [
    "Can you improve my current website?",
    "Yes. We’ll review what you have and recommend a focused update or rebuild. Existing content and URLs are considered when planning a migration.",
  ],
  [
    "Will I be able to edit the site?",
    "Yes. We’ll agree on what you need to update—services, photos, projects, or articles—and choose an editing setup that fits.",
  ],
  [
    "Do I own the website?",
    "Your domain and service accounts stay in your name. After final payment, you receive the agreed deliverables and access. Platform restrictions and third-party licenses are explained in the proposal.",
  ],
  [
    "What does it cost after launch?",
    "Hosting and software subscriptions are separate. Ongoing support is optional. We’ll confirm recurring costs, payment milestones, and any included post-launch support in your written proposal.",
  ],
  [
    "Can you guarantee Google rankings?",
    "No. We can commit to the work we agree on and show you what changed. Search results depend on competition and other factors beyond the website.",
  ],
  [
    "Do you work outside Phoenix and Scottsdale?",
    "Yes. We also work remotely with businesses elsewhere in the US.",
  ],
];

export function ServicesContent({ initialService = "New business website" }: { initialService?: string }) {
  const [interest, setInterest] = useState(initialService);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const submissionId = useRef("");
  const sending = useRef(false);
  function inquire(service: string) {
    if (sending.current) return;
    setInterest(service);
    setStatus("idle");
    submissionId.current = "";
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    sending.current = true;
    setStatus("sending");
    setError("");
    try {
      submissionId.current ||= createInquiryId();
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: submissionId.current }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Send failed");
      setStatus("success");
      form.reset();
      submissionId.current = "";
      if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
        // Analytics failure must not turn an accepted inquiry into a send error.
        try {
          posthog.capture("inquiry_submitted", { service: fields.service });
        } catch {
          /* Delivery already succeeded. */
        }
      }
    } catch {
      setStatus("error");
      setError(
        "Your inquiry could not be sent. Your details are still here—please try again, or email jeremy@mean-weasel.com directly.",
      );
    } finally {
      sending.current = false;
    }
  }
  return (
    <main id="main-content" className="services-main">
      <section className="services-hero studio-container">
        <div>
          <p className="studio-eyebrow">
            <span className="studio-dot" /> PHOENIX · SCOTTSDALE · THE VALLEY
          </p>
          <h1>
            Small business web design in <em>Phoenix</em>
          </h1>
          <p className="services-lead">
            A website that explains your business—and makes it easy to contact
            you.
          </p>
          <p>
            We build clear service pages, layouts that work on phones, and a
            straightforward path to calling, booking, or requesting a quote. You
            work directly with our founder, Jeremy, the developer behind Mean Weasel.
          </p>
          <p className="services-offer">
            SEO setup included. Clear scope before work starts.
          </p>
          <div className="services-actions">
            <a
              className="service-button"
              href="#inquiry"
              onClick={() => inquire("New business website")}
            >
              Tell us about your website <span aria-hidden="true">↗</span>
            </a>
            <a href="#work" className="studio-text-link">
              Explore our work
            </a>
            <Link href="/services" className="studio-text-link">Compare services</Link>
            <Link href="/use-cases" className="studio-text-link">Explore use cases</Link>
          </div>
        </div>
        <figure className="services-hero-proof">
          <div className="service-browser">
            <span />
            <span />
            <span />
            <span className="service-browser-label">BUILT BY MEAN WEASEL</span>
          </div>
          <Image
            src="/projects/bugdrop.webp"
            alt="BugDrop, Mean Weasel’s website feedback product"
            width={1080}
            height={750}
            priority
            sizes="(max-width: 800px) 90vw, 45vw"
          />
          <figcaption>
            <strong>From idea to working product.</strong>
            <br />
            BugDrop · Our own software, built and maintained in-house.
            <Link href="/projects/bugdrop">Take a closer look ↗</Link>
          </figcaption>
        </figure>
      </section>
      <nav className="services-jump studio-container" aria-label="On this page">
        <a href="#packages">Website packages</a>
        <a href="#seo">SEO setup</a>
        <a href="#work">Our work</a>
        <a href="#inquiry">Request an estimate ↗</a>
      </nav>
      <section
        className="services-outcomes studio-container"
        aria-label="What your website should do"
      >
        {[
          [
            "01",
            "Explain your services",
            "Help people understand what you do and where you work.",
          ],
          [
            "02",
            "Show your work",
            "Make room for the photos and projects that earn trust.",
          ],
          [
            "03",
            "Make contact easy",
            "Give customers a clear next step: call, book, or request a quote.",
          ],
        ].map(([number, title, text]) => (
          <div key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <section id="packages" className="services-section studio-container">
        <p className="studio-eyebrow">A CLEAR PLACE TO START</p>
        <h2>
          Two ways to build
          <br />
          <em>a better website.</em>
        </h2>
        <p className="services-section-intro">
          Start with what you have ready. Both packages include mobile layouts,
          SEO essentials, an inquiry form, and a walkthrough at handoff.
        </p>
        <div className="service-packages">
          {packages.map((pkg, index) => (
            <article className="service-package" key={pkg.name}>
              <p className="studio-eyebrow">0{index + 1} / WEBSITE PACKAGE</p>
              <h3>{pkg.name}</h3>
              <p>{pkg.intro}</p>
              <div className="service-package-fit"><span>A GOOD FIT IF</span><p>{pkg.fit}</p></div>
              <div className="service-price">
                <span>Pricing</span>
                <strong>To be confirmed</strong>
              </div>
              <h4 className="service-included-label">What’s included</h4>
              <ul>
                {pkg.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="service-timeline">
                {pkg.timeline} Final timing confirmed in your proposal.
              </p>
              <a
                href="#inquiry"
                className="service-button"
                onClick={() => inquire(pkg.name)}
              >
                Ask about {pkg.name} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <div className="service-custom">
          <div>
            <h3>Something beyond a website?</h3>
            <p>
              Need a customer portal, quote calculator, or a workflow your
              website can’t handle? We also build custom apps and integrations,
              with a separate scope based on what you need.
            </p>
          </div>
          <a
            href="#inquiry"
            className="studio-text-link"
            onClick={() => inquire("Custom app or integration")}
          >
            Discuss a custom project ↗
          </a>
        </div>
        <p className="service-fineprint">
          Hosting, domains, paid software, photography, and additional work are
          separate. You’ll receive a written breakdown before committing.
        </p>
      </section>
      <section id="seo" className="services-seo-band">
        <div className="studio-container services-seo-grid">
          <div>
            <p className="studio-eyebrow">BUILT IN, FROM THE START</p>
            <h2>
              SEO setup is
              <br />
              <em>part of the build.</em>
            </h2>
            <p>
              A sound search foundation helps customers find and understand your
              business. Every website package includes the essentials.
            </p>
            <p className="service-fineprint">
              Website + Content also includes keyword research. Ongoing content,
              outreach, and monthly SEO are separate. Rankings and lead volumes
              aren’t guaranteed.
            </p>
          </div>
          <ul className="service-seo-list">
            {seo.map((item) => (
              <li key={item}>
                <span aria-hidden="true">↗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="services-section studio-container services-existing">
        <div>
          <p className="studio-eyebrow">ALREADY HAVE A WEBSITE?</p>
          <h2>
            A focused round
            <br />
            of SEO improvements.
          </h2>
          <p>
            Keep the site you have and improve the foundations. The SEO
            Foundation Project starts with a review, then turns the agreed
            priorities into practical changes you can see and measure.
          </p>
          <p className="service-price">
            <span>SEO Foundation Project</span>
            <strong>Pricing to be confirmed</strong>
          </p>
          <a
            className="service-button"
            href="#inquiry"
            onClick={() => inquire("SEO Foundation Project")}
          >
            Request an SEO project estimate ↗
          </a>
        </div>
        <div>
          <ul className="service-checklist">
            <li>Review available Search Console data and technical issues</li>
            <li>
              Improve titles, headings, and internal links on up to five agreed
              pages
            </li>
            <li>Implement the fixes listed in your proposal</li>
            <li>Review your Google Business Profile, where relevant</li>
            <li>Check inquiry measurement and document what changed</li>
          </ul>
          <p className="service-fineprint">
            Final scope depends on your platform, access, and the issues
            uncovered.
          </p>
        </div>
      </section>
      <section
        id="work"
        className="services-section service-work studio-container"
      >
        <p className="studio-eyebrow">THE PEOPLE BEHIND THE PIXELS</p>
        <h2>
          Software we build
          <br />
          <em>and maintain.</em>
        </h2>
        <p className="services-section-intro">
          These are our products—examples of the interfaces and workflows we
          build.
        </p>
        <div className="service-proof-grid">
          {[
            {
              slug: "bugdrop",
              name: "BugDrop",
              type: "FORMS & INTEGRATIONS",
              text: "Capture a screenshot, annotate a problem, and deliver a useful report to GitHub. The right information, where it needs to go.",
            },
            {
              slug: "bleep-that-shit",
              name: "Bleep That Sh*t",
              type: "CLEAR, USEFUL WORKFLOWS",
              text: "Find likely profanity, review the relevant moments, and export a cleaned recording. A complicated task, broken into understandable steps.",
            },
          ].map((project) => (
            <article key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <Image
                  src={`/projects/${project.slug}.webp`}
                  alt={`${project.name} product interface`}
                  width={1080}
                  height={750}
                  sizes="(max-width: 700px) 90vw, 45vw"
                />
              </Link>
              <p className="studio-eyebrow">{project.type}</p>
              <h3>{project.name}</h3>
              <p>{project.text}</p>
              <Link
                className="studio-text-link"
                href={`/projects/${project.slug}`}
              >
                Explore {project.name} ↗
              </Link>
            </article>
          ))}
        </div>
        <Link className="studio-text-link" href="/#products">
          Explore more examples ↗
        </Link>
      </section>
      <section className="services-section studio-container">
        <p className="studio-eyebrow">FROM FIRST CONVERSATION TO LAUNCH</p>
        <h2>Here’s how we work.</h2>
        <div className="service-process">
          {[
            [
              "Tell us about the business",
              "Share your services, customers, current website, and what you want the site to accomplish.",
            ],
            [
              "Get a written scope",
              "We agree on pages, content, features, price, responsibilities, and delivery milestones.",
            ],
            [
              "Review as it takes shape",
              "See the design and content, then share feedback in the included revision rounds.",
            ],
            [
              "Launch with a clear handoff",
              "We check forms, mobile layouts, links, and tracking, then walk you through managing the site.",
            ],
          ].map(([title, text], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="services-section service-faq studio-container">
        <div>
          <p className="studio-eyebrow">GOOD TO KNOW</p>
          <h2>
            A few practical
            <br />
            <em>questions.</em>
          </h2>
        </div>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section id="inquiry" className="service-inquiry-band">
        <div className="studio-container service-inquiry-grid">
          <div>
            <p className="studio-eyebrow">LET’S MAKE IT USEFUL</p>
            <h2>
              What would you
              <br />
              <em>like to build?</em>
            </h2>
            <p>
              A business website, a custom app, or improvements to your search
              visibility. Tell us what you need and what a successful project
              would help people do.
            </p>
            <p>
              No finished brief needed. A few sentences are enough to start.
              You’ll work directly with Jeremy, from the first reply onward.
            </p>

          </div>
          <form
            onSubmit={submit}
            onChange={() => {
              if (!sending.current) {
                setStatus("idle");
                submissionId.current = "";
              }
            }}
            className="service-form ph-no-capture ph-mask"
            data-ph-no-capture
          >
            <p className="service-form-intro">
              Tell us a little about your project.
            </p>
            <p className="service-form-helper">Name, email, and a short project description are all you need. The rest is optional.</p>
            <fieldset disabled={status === "sending"}>
              <legend className="sr-only">Project inquiry</legend>
              <div className="service-honeypot" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input name="companyFax" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="service-form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                Business name <span>(optional)</span>
                <input
                  name="business"
                  autoComplete="organization"
                  maxLength={200}
                />
              </label>
              <label>
                Current website <span>(optional)</span>
                <input
                  name="website"
                  type="url"
                  placeholder="https://"
                  maxLength={2000}
                />
              </label>
              <label>
                What would you like help with?
                <select
                  name="service"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  {inquiryServices.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                What would you like this project to help people do?
                <textarea
                  name="description"
                  required
                  rows={5}
                  aria-describedby="project-description-help"
                  placeholder="For example: We’re a Phoenix landscaping business. We’d like customers to see our work and request a quote from their phone."
                  maxLength={5000}
                />
              </label>
              <p id="project-description-help" className="service-form-helper">Share what you do, what needs to improve, and any timing you have in mind. For an app, describe the task it should help people complete.</p>
              <button
                className="service-button"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Sending…"
                  : "Request a project estimate"}{" "}
                <span aria-hidden="true">↗</span>
              </button>
            </fieldset>
            <p className="service-fineprint">
              We’ll use your details to respond to this inquiry. Sending a request doesn’t commit you to a project.
            </p>
            <p role="status" aria-live="polite">
              {status === "success"
                ? "Thanks—your inquiry has been sent. Jeremy will reply to the email you provided."
                : status === "sending"
                  ? "Sending your inquiry…"
                  : ""}
            </p>
            {status === "error" && <p role="alert">{error}</p>}
          </form>
            <div className="service-next-steps">
              <h3>What happens next</h3>
              <ol>
                <li><strong>We review your project.</strong><span>Your goals, existing site, and the kind of help you need.</span></li>
                <li><strong>We fill in the gaps.</strong><span>We’ll reply by email with questions or suggest a conversation.</span></li>
                <li><strong>You get a clear proposal.</strong><span>Scope, pricing, and timing to review before committing.</span></li>
              </ol>
            </div>
        </div>
      </section>
    </main>
  );
}
