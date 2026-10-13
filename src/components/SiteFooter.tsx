import Link from "next/link";
import { WeaselLogo } from "@/components/WeaselLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--accent)]/10 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <WeaselLogo className="w-8 h-8" />
            <span className="font-display font-bold">Mean Weasel LLC</span>
          </Link>
          <nav aria-label="Footer navigation" className="footer-page-links">
            <Link href="/services">Services</Link>
            <Link href="/use-cases">Use cases</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <p className="font-body text-sm text-[var(--muted)] text-center md:text-right">
            &copy; {new Date().getFullYear()} Mean Weasel LLC. Useful
            software, no ceremony.
          </p>
        </div>
      </div>
    </footer>
  );
}
