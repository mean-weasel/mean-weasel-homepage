import type { Metadata } from "next";
import { Space_Grotesk, Crimson_Pro } from "next/font/google";
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
  title: "Mean Weasel | Unique Apps & SaaS Products",
  description:
    "Mean Weasel LLC develops unique and fun apps and SaaS products that solve real problems with a touch of personality.",
  keywords: ["apps", "SaaS", "software", "Mean Weasel", "startups"],
  openGraph: {
    title: "Mean Weasel | Unique Apps & SaaS Products",
    description:
      "We develop unique and fun apps and SaaS products that solve real problems.",
    type: "website",
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
