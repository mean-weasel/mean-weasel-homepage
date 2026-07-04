import type { Project } from "@/lib/projects";

type ProductCardProps = Project;

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
  const statusClass = {
    Live: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    "Public beta": "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    "In the works": "bg-[var(--accent)]/10 text-[var(--accent)]",
  }[status];

  const className = `group product-card block h-full bg-[var(--surface)] rounded-lg p-6 md:p-7 border ${borderColor} hover:shadow-2xl hover:shadow-[var(--accent)]/10 transition-all`;

  const content = (
    <>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div
          aria-hidden="true"
          className={`w-14 h-14 ${color} rounded-lg flex items-center justify-center text-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}
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

      {url ? (
        <div className="mt-6 pt-5 border-t border-[var(--accent)]/10">
          <span className="inline-flex items-center gap-2 font-display text-sm font-medium text-[var(--accent)] group-hover:underline">
            {cta}
            <svg
              aria-hidden="true"
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
      ) : null}
    </>
  );

  if (!url) {
    return <article className={className}>{content}</article>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
}
