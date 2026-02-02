import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
