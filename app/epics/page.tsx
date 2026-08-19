import { Gem } from "lucide-react";
import { getSheetsData } from "@/lib/sheets";
import { EPIC_NAMES } from "@/lib/types";
import { SectionCard } from "@/components/SectionCard";
import { RankBadge } from "@/components/RankBadge";
import { ProgressBar } from "@/components/ProgressBar";

export const revalidate = 300;

const EPIC_POINT_COST: Record<string, number> = {
  Core: 40,
  Orfen: 60,
  "Queen Ant": 150,
  Zaken: 180,
  Frintezza: 250,
  Baium: 900,
  Antharas: 1000,
  Valakas: 2000,
};

export default async function EpicsPage() {
  const { epics } = await getSheetsData();
  const ranked = epics.filter((e) => e.total > 0);
  const maxTotal = ranked[0]?.total || 1;

  const epicTotals = EPIC_NAMES.map((name) => ({
    name,
    total: epics.reduce((sum, e) => sum + (e.counts[name] || 0), 0),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-primary">Distribuicao de Epics</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Quantos epics cada CP ja resgatou, com base na fila de saldo acumulado do regulamento.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {epicTotals.map(({ name, total }) => (
          <div key={name} className="card-surface rounded-xl p-3 text-center shadow-card">
            <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{name}</p>
            <p className="mt-1 font-display text-xl font-bold text-series-aqua">{total}</p>
            <p className="mt-0.5 text-[10px] text-ink-muted">{EPIC_POINT_COST[name]} pts</p>
          </div>
        ))}
      </div>

      <SectionCard icon={Gem} title="Ranking de CPs por Epics" subtitle="Total de epics resgatados, todas as categorias">
        <ul className="flex flex-col gap-2.5">
          {ranked.map((row, idx) => (
            <li key={row.cp} className="rounded-xl border border-surface-border/60 bg-surface-1/60 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <RankBadge rank={idx + 1} />
                  <span className="text-sm font-medium text-ink-primary">{row.cp}</span>
                </div>
                <span className="font-display text-sm font-semibold text-series-aqua">
                  {row.total} {row.total === 1 ? "epic" : "epics"}
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar value={row.total} max={maxTotal} colorClass="bg-series-aqua" />
              </div>
            </li>
          ))}
          {ranked.length === 0 && (
            <li className="rounded-xl border border-dashed border-surface-border p-6 text-center text-xs text-ink-muted">
              Nenhum epic registrado ainda.
            </li>
          )}
        </ul>
      </SectionCard>

      <SectionCard icon={Gem} title="Detalhamento por Item" subtitle="Contagem de cada epic, por CP">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-y-1.5 text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink-muted">
                <th className="px-3 py-1 font-semibold">CP</th>
                {EPIC_NAMES.map((name) => (
                  <th key={name} className="px-3 py-1 text-right font-semibold">
                    {name}
                  </th>
                ))}
                <th className="px-3 py-1 text-right font-semibold text-series-aqua">Total</th>
              </tr>
            </thead>
            <tbody>
              {epics.map((row) => (
                <tr key={row.cp} className="rounded-xl bg-surface-1/60">
                  <td className="rounded-l-xl px-3 py-2 font-medium text-ink-primary">{row.cp}</td>
                  {EPIC_NAMES.map((name) => (
                    <td key={name} className="px-3 py-2 text-right text-ink-secondary">
                      {row.counts[name] || 0}
                    </td>
                  ))}
                  <td className="rounded-r-xl px-3 py-2 text-right font-display font-semibold text-series-aqua">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
