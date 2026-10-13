import type { Metadata } from "next";
import localFont from "next/font/local";
import { allProjects } from "@/lib/projects";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";
import { PageMotion } from "@/components/PageMotion";

// Bundled fonts keep builds independent of the Google Fonts API.
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});
const crimsonPro = localFont({
  src: [
    { path: "./fonts/CrimsonPro.woff2", weight: "200 900", style: "normal" },
    { path: "./fonts/CrimsonPro-Italic.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
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
  verification: {
    google: "beKrqVZv_j7vPzY4dcy0y42HOUPmUOuG-yrqkQJUdvQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${spaceGrotesk.variable} ${crimsonPro.variable} antialiased`}
      >
        <PageMotion />
        {children}
      </body>
    </html>
  );
}
