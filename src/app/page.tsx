import { WeaselLogo } from "@/components/WeaselLogo";
import { ProductCard } from "@/components/ProductCard";

const liveProducts = [
  {
    name: "BugDrop",
    description:
      "Feedback widget that turns screenshots and notes into GitHub issues.",
    icon: "🐞",
    color: "bg-sky-500",
    borderColor: "border-sky-200 dark:border-sky-900",
    url: "https://bugdrop.dev",
    status: "Live" as const,
    cta: "Open BugDrop",
  },
  {
    name: "Foil Dictation",
    description: "Dictation for real Mac workflows.",
    icon: "🎙️",
    color: "bg-indigo-500",
    borderColor: "border-indigo-200 dark:border-indigo-900",
    url: "https://sayfoil.com",
    status: "Live" as const,
    cta: "Try Foil",
  },
  {
    name: "Debt Is Fun",
    description: "A live clock for university debt and endowments.",
    icon: "⏱️",
    color: "bg-amber-500",
    borderColor: "border-amber-200 dark:border-amber-900",
    url: "https://debtisfun.com",
    status: "Live" as const,
    cta: "Watch the clock",
  },
  {
    name: "Bleep That Sh*t",
    description: "Clean up audio and video.",
    icon: "🔇",
    color: "bg-red-500",
    borderColor: "border-red-200 dark:border-red-900",
    url: "https://bleepthat.sh",
    status: "Live" as const,
    cta: "Bleep something",
  },
  {
    name: "Seatify",
    description: "Seating charts without the chaos.",
    icon: "💺",
    color: "bg-emerald-500",
    borderColor: "border-emerald-200 dark:border-emerald-900",
    url: "https://seatify.app",
    status: "Live" as const,
    cta: "Plan seating",
  },
  {
    name: "DeckChecker",
    description: "Check decks before they go out.",
    icon: "📊",
    color: "bg-violet-500",
    borderColor: "border-violet-200 dark:border-violet-900",
    url: "https://deckchecker.app",
    status: "Live" as const,
    cta: "Check a deck",
  },
];

const buildingProducts = [
  {
    name: "BugDrop Board",
    description: "A board for tracking and triaging BugDrop feedback.",
    icon: "🧭",
    color: "bg-orange-500",
    borderColor: "border-orange-200 dark:border-orange-900",
    url: "https://bugdrop.dev/board/",
    status: "In the works" as const,
    cta: "Preview the board",
  },
  {
    name: "Foil iOS",
    description: "Foil dictation for iPhone and iPad.",
    icon: "📱",
    color: "bg-indigo-500",
    borderColor: "border-indigo-200 dark:border-indigo-900",
    url: "https://sayfoil.com",
    status: "In the works" as const,
    cta: "Follow Foil",
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
              Products
            </a>
            <a
              href="#building"
              className="ml-6 font-display text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              Building
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
              <span className="block">We build the stuff</span>
              <span className="block text-[var(--accent)]">
                we wish already existed.
              </span>
            </h1>

            {/* Subhead - serif for contrast */}
            <p className="font-body text-xl md:text-2xl text-[var(--muted)] mb-12 leading-relaxed animate-fade-up delay-300 max-w-xl mx-auto">
              Focused products for people with real work to finish.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-up delay-400">
              <a
                href="#products"
                className="group inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-4 rounded-full font-display font-bold text-lg transition-all shadow-lg shadow-[var(--accent)]/25 hover:shadow-xl hover:shadow-[var(--accent)]/30"
              >
                See products
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
                Live Products
              </span>
              <div className="h-px w-12 bg-[var(--accent)]/30" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Useful software, no ceremony.
            </h2>
            <p className="font-body text-lg text-[var(--muted)] max-w-lg mx-auto">
              A small collection of focused tools from Mean Weasel.
            </p>
          </div>

          {/* Product cards with staggered entrance */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveProducts.map((product, index) => (
              <div
                key={product.name}
                className="animate-fade-up"
                style={{ animationDelay: `${(index + 5) * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* Building section */}
        <section id="building" className="max-w-5xl mx-auto px-6 py-16">
          <div className="ornate-border rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="font-display text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                  In The Works
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Building now
                </h2>
              </div>
              <p className="font-body text-[var(--muted)] max-w-md">
                The next thing getting sharpened.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {buildingProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="animate-fade-up"
                  style={{ animationDelay: `${(index + 11) * 100}ms` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
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
              &copy; {new Date().getFullYear()} Mean Weasel LLC. Useful software, no ceremony.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
