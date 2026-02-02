interface ProductCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
}

export function ProductCard({
  name,
  description,
  icon,
  color,
  borderColor,
}: ProductCardProps) {
  return (
    <div
      className={`product-card bg-[var(--surface)] rounded-2xl p-8 border-2 ${borderColor} hover:shadow-2xl hover:shadow-[var(--accent)]/10`}
    >
      {/* Icon with colored background */}
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-2xl mb-6 shadow-lg rotate-3 hover:rotate-0 transition-transform`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold mb-3">{name}</h3>

      {/* Description */}
      <p className="font-body text-[var(--muted)] leading-relaxed text-base">
        {description}
      </p>

      {/* Footer with status */}
      <div className="mt-6 pt-5 border-t border-[var(--accent)]/10">
        <span className="inline-flex items-center gap-2 font-display text-sm font-medium text-[var(--accent)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          Coming Soon
        </span>
      </div>
    </div>
  );
}
