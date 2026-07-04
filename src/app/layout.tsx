import type { Metadata } from "next";
import { Space_Grotesk, Crimson_Pro } from "next/font/google";
import { allProjects } from "@/lib/projects";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

// Bold, geometric sans for headings - has personality
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

// Elegant serif for body - creates contrast
const crimsonPro = Crimson_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Mean Weasel | Independent Software Studio",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Mean Weasel",
    "independent software studio",
    "BugDrop",
    "Foil",
    "Bleep That Sh*t",
    "Seatify",
    "DeckChecker",
    "Lineage",
    "software",
    ...allProjects.map((project) => project.name),
  ],
  authors: [{ name: "Mean Weasel LLC", url: siteUrl }],
  creator: "Mean Weasel LLC",
  publisher: "Mean Weasel LLC",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${crimsonPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
