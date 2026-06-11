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
  title: "Mean Weasel | Useful Software, No Ceremony",
  description:
    "Mean Weasel builds the tools we wish already existed: focused products for people with real work to finish.",
  keywords: [
    "Mean Weasel",
    "BugDrop",
    "Foil Dictation",
    "Bleep That Sh*t",
    "Seatify",
    "DeckChecker",
    "software",
  ],
  openGraph: {
    title: "Mean Weasel | Useful Software, No Ceremony",
    description:
      "We build the tools we wish already existed.",
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
