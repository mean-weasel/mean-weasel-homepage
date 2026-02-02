import { WeaselLogo } from "@/components/WeaselLogo";
import { ProductCard } from "@/components/ProductCard";

const products = [
  {
    name: "Bleep That Sh*t!",
    description:
      "Audio and video censorship tool with premium features. Automatically detect and bleep profanity in your content with AI-powered precision.",
    icon: "🔇",
    gradient: "from-red-500 to-orange-500",
  },
  {
    name: "Bullhorn",
    description:
      "Schedule and manage social media posts across Twitter, LinkedIn, and Reddit from one simple dashboard. Amplify your message everywhere.",
    icon: "📢",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Seatify",
    description:
      "AI-powered seating arrangement optimization for weddings and corporate events. Let algorithms handle the awkward family dynamics.",
    icon: "💺",
    gradient: "from-violet-500 to-purple-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WeaselLogo className="w-10 h-10" />
            <span className="font-bold text-xl tracking-tight">
              Mean Weasel
            </span>
          </div>
          <nav>
            <a
              href="#products"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Products
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <WeaselLogo className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Unique Apps for Real Problems
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              We build fun, practical SaaS products that solve everyday
              challenges with a touch of personality. No boring software here.
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
            >
              See What We&apos;re Building
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Products
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Each app is crafted with care, designed to be delightfully useful.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <WeaselLogo className="w-8 h-8" />
              <span className="font-semibold">Mean Weasel LLC</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              &copy; {new Date().getFullYear()} Mean Weasel LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
