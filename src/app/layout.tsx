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
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${crimsonPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
