type RecipeBadgeProps = {
  label: string;
  value: string;
  icon?: string;
  variant?: "default" | "premium";
};

export default function RecipeBadge({
  label,
  value,
  icon,
  variant = "default",
}: RecipeBadgeProps) {
  const isPremium = variant === "premium";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
        isPremium
          ? "border-[#b98a33]/35 bg-[#b98a33]/10"
          : "border-[#3f2412]/15 bg-[#fff7df]/35"
      }`}
    >
      {icon ? (
        <span className="text-sm leading-none">{icon}</span>
      ) : null}

      <span
        className={`text-[10px] uppercase tracking-[0.22em] ${
          isPremium
            ? "text-[#8a5d14]"
            : "text-[#6a4522]"
        }`}
      >
        {label}
      </span>

      <span
        className={`font-serif text-sm font-semibold ${
          isPremium
            ? "text-[#5a350e]"
            : "text-[#241005]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}