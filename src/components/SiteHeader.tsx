import Link from "next/link";
import { WeaselLogo } from "@/components/WeaselLogo";

export function SiteHeader({ projectPage = false }: { projectPage?: boolean }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--accent)]/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-5">
        <Link
          href={projectPage ? "/" : "#top"}
          className="flex items-center gap-3 animate-fade-in"
          aria-label="Mean Weasel home"
        >
          <WeaselLogo className="w-10 h-10 animate-wiggle" />
          <span className="font-display font-bold text-xl tracking-tight">
            Mean Weasel
          </span>
        </Link>
        <nav
          className="animate-fade-in delay-200 flex items-center justify-center gap-4 sm:gap-5"
          aria-label="Primary navigation"
        >
          <Link
            href="/#products"
            className="font-display text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            Products
          </Link>
          <Link
            href="/#building"
            className="font-display text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            Building
          </Link>
        </nav>
      </div>
    </header>
  );
}
