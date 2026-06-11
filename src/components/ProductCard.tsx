interface ProductCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  url: string;
  status: "Live" | "In the works";
  cta?: string;
}

export function ProductCard({
  name,
  description,
  icon,
  color,
  borderColor,
  url,
  status,
  cta = "Open",
}: ProductCardProps) {
  const statusClass =
    status === "Live"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : "bg-[var(--accent)]/10 text-[var(--accent)]";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group product-card block h-full bg-[var(--surface)] rounded-2xl p-8 border-2 ${borderColor} hover:shadow-2xl hover:shadow-[var(--accent)]/10 transition-all`}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div
          className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}
        >
          {icon}
        </div>
        <span
          className={`font-display text-xs font-bold px-3 py-1 rounded-full ${statusClass}`}
        >
          {status}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold mb-3">{name}</h3>

      <p className="font-body text-[var(--muted)] leading-relaxed text-base">
        {description}
      </p>

      <div className="mt-6 pt-5 border-t border-[var(--accent)]/10">
        <span className="inline-flex items-center gap-2 font-display text-sm font-medium text-[var(--accent)] group-hover:underline">
          {cta}
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}
