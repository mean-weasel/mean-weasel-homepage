import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServicesContent } from "@/components/ServicesContent";
import { inquiryServices } from "@/lib/inquiry";
import { siteUrl } from "@/lib/site";
import "./services.css";

const description =
  "Website design for Phoenix and Scottsdale small businesses. Editable content, lead capture, and SEO setup. Work directly with the builder.";
export const metadata: Metadata = {
  title: "Small Business Web Design Phoenix",
  description,
  alternates: { canonical: "/services/web-design-phoenix" },
  openGraph: {
    title: "Small Business Web Design Phoenix | Mean Weasel",
    description,
    url: "/services/web-design-phoenix",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Business Web Design Phoenix | Mean Weasel",
    description,
    images: ["/twitter-image"],
  },
};

export default async function ServicesPage({ searchParams }: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const selectedService = inquiryServices.find(value => value === service) ?? inquiryServices[0];
  return (
    <div className="studio-home services-page">
      <SiteHeader servicesPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Small business web design in Phoenix",
            url: `${siteUrl}/services/web-design-phoenix`,
            description,
            provider: {
              "@type": "Organization",
              name: "Mean Weasel",
              url: siteUrl,
            },
            areaServed: ["Phoenix", "Scottsdale", "Phoenix metropolitan area"],
            serviceType: "Small business website design and SEO setup",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesContent key={selectedService} initialService={selectedService} />
      <SiteFooter />
    </div>
  );
}
