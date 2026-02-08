import { WeaselLogo } from "@/components/WeaselLogo";
import { ProductCard } from "@/components/ProductCard";

const products = [
  {
    name: "Bleep That Sh*t!",
    description:
      "Audio and video censorship tool with premium features. Automatically detect and bleep profanity in your content with AI-powered precision.",
    icon: "🔇",
    color: "bg-red-500",
    borderColor: "border-red-200 dark:border-red-900",
    url: "https://bleep-that-sht.com",
  },
  {
    name: "Bullhorn",
    description:
      "Schedule and manage social media posts across Twitter, LinkedIn, and Reddit from one simple dashboard. Amplify your message everywhere.",
    icon: "📢",
    color: "bg-amber-500",
    borderColor: "border-amber-200 dark:border-amber-900",
    url: "https://bullhorn.to",
  },
  {
    name: "Seatify",
    description:
      "AI-powered seating arrangement optimization for weddings and corporate events. Let algorithms handle the awkward family dynamics.",
    icon: "💺",
    color: "bg-emerald-500",
    borderColor: "border-emerald-200 dark:border-emerald-900",
    url: "https://seatify.app",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen hero-bg grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--accent)]/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <WeaselLogo className="w-10 h-10 animate-wiggle" />
            <span className="font-display font-bold text-xl tracking-tight">
              Mean Weasel
            </span>
          </div>
          <nav className="animate-fade-in delay-200">
            <a
              href="#products"
              className="font-display text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              Our Creations
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo with scale animation */}
            <div className="flex justify-center mb-10 animate-scale-in">
              <div className="relative">
                <WeaselLogo className="w-28 h-28 md:w-36 md:h-36 animate-wiggle" />
                {/* Decorative dots */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--accent)] rounded-full opacity-60" />
                <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-amber-400 rounded-full opacity-50" />
              </div>
            </div>

            {/* Headline with staggered animation */}
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-up delay-200">
              <span className="block">Apps with</span>
              <span className="block text-[var(--accent)]">Attitude</span>
            </h1>

            {/* Subhead - serif for contrast */}
            <p className="font-body text-xl md:text-2xl text-[var(--muted)] mb-12 leading-relaxed animate-fade-up delay-300 max-w-xl mx-auto">
              We craft delightfully useful software that solves real problems—
              <em>without</em> the boring corporate aesthetic.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-up delay-400">
              <a
                href="#products"
                className="group inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-4 rounded-full font-display font-bold text-lg transition-all shadow-lg shadow-[var(--accent)]/25 hover:shadow-xl hover:shadow-[var(--accent)]/30"
              >
                See What We&apos;ve Built
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          {/* Section header with decorative line */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[var(--accent)]/30" />
              <span className="font-display text-sm font-medium text-[var(--accent)] uppercase tracking-widest">
                Our Creations
              </span>
              <div className="h-px w-12 bg-[var(--accent)]/30" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Built Different
            </h2>
            <p className="font-body text-lg text-[var(--muted)] max-w-lg mx-auto">
              Each product crafted with care, designed to be genuinely useful—and maybe make you smile.
            </p>
          </div>

          {/* Product cards with staggered entrance */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={`animate-fade-up delay-${(index + 5) * 100}`}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* Personality section */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="ornate-border rounded-2xl p-10 md:p-14 text-center">
            <p className="font-body text-2xl md:text-3xl text-[var(--muted)] leading-relaxed italic">
              &ldquo;Why settle for forgettable software when you can have something with a little
              <span className="text-[var(--accent)] font-semibold not-italic"> mischief</span>?&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <WeaselLogo className="w-6 h-6" />
              <span className="font-display text-sm font-medium">— The Mean Weasel Team</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--accent)]/10 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <WeaselLogo className="w-8 h-8" />
              <span className="font-display font-bold">Mean Weasel LLC</span>
            </div>
            <p className="font-body text-sm text-[var(--muted)]">
              &copy; {new Date().getFullYear()} Mean Weasel LLC. Crafted with attitude.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
