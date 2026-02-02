interface ProductCardProps {
  name: string;
  description: string;
  icon: string;
  gradient: string;
}

export function ProductCard({
  name,
  description,
  icon,
  gradient,
}: ProductCardProps) {
  return (
    <div className="product-card bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:shadow-zinc-300/50 dark:hover:shadow-zinc-800/50">
      <div
        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl mb-6 shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{name}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
      <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400">
          Coming Soon
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
