const MEDALS: Record<number, { emoji: string; color: string }> = {
  1: { emoji: "🥇", color: "text-series-yellow" },
  2: { emoji: "🥈", color: "text-ink-secondary" },
  3: { emoji: "🥉", color: "text-series-orange" },
};

export function RankBadge({ rank }: { rank: number }) {
  const medal = MEDALS[rank];
  if (medal) {
    return (
      <span className={`inline-flex w-7 items-center justify-center text-base ${medal.color}`}>
        {medal.emoji}
      </span>
    );
  }
  return (
    <span className="inline-flex w-7 items-center justify-center font-display text-xs font-semibold text-ink-muted">
      #{rank}
    </span>
  );
}

const TYPE_STYLES: Record<string, string> = {
  CP: "border-series-blue/40 bg-series-blue/10 text-series-blue",
  Caller: "border-series-aqua/40 bg-series-aqua/10 text-series-aqua",
  ADM: "border-series-violet/40 bg-series-violet/10 text-series-violet",
};

export function TypeBadge({ type }: { type: string }) {
  const style = TYPE_STYLES[type] || "border-surface-border bg-surface-3 text-ink-secondary";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style}`}>
      {type}
    </span>
  );
}
