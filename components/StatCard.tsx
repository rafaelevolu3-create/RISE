import { LucideIcon } from "lucide-react";

const ACCENTS = {
  blue: { text: "text-series-blue", bg: "bg-series-blue/10", ring: "ring-series-blue/25" },
  aqua: { text: "text-series-aqua", bg: "bg-series-aqua/10", ring: "ring-series-aqua/25" },
  violet: { text: "text-series-violet", bg: "bg-series-violet/10", ring: "ring-series-violet/25" },
  yellow: { text: "text-series-yellow", bg: "bg-series-yellow/10", ring: "ring-series-yellow/25" },
} as const;

export type AccentKey = keyof typeof ACCENTS;

export function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle?: string;
  accent: AccentKey;
}) {
  const c = ACCENTS[accent];
  return (
    <div className="card-surface animate-fade-up rounded-2xl p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg} ring-1 ${c.ring} ${c.text}`}>
          <Icon size={16} strokeWidth={2.2} />
        </span>
      </div>
      <div className={`mt-3 font-display text-3xl font-bold ${c.text}`}>{value}</div>
      {subtitle && <p className="mt-1 text-xs text-ink-muted">{subtitle}</p>}
    </div>
  );
}
