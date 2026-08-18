import { Users, Crown, Star, Gem, Trophy, Medal } from "lucide-react";
import { getSheetsData } from "@/lib/sheets";
import { StatCard } from "@/components/StatCard";
import { SectionCard } from "@/components/SectionCard";
import { RankBadge, TypeBadge } from "@/components/RankBadge";
import { ProgressBar } from "@/components/ProgressBar";

export const revalidate = 300;

const sideName = process.env.NEXT_PUBLIC_SIDE_NAME || "RISE";

function formatUpdate(value: string) {
  return value && value.trim() !== "" ? value : "--";
}

export default async function HomePage() {
  const data = await getSheetsData();
  const { cpRanking, playerRanking, epics } = data;

  const cpCount = cpRanking.filter((r) => r.type === "CP").length;
  const topCp = cpRanking[0];
  const topPlayer = playerRanking[0];
  const totalEpics = epics.reduce((sum, e) => sum + e.total, 0);
  const maxCpPoints = cpRanking[0]?.points || 1;
  const maxPlayerPoints = playerRanking[0]?.points || 1;
  const maxEpics = epics[0]?.total || 1;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-series-blue">
          Lineage 2 Reborn &middot; Alliance Analytics
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-primary text-glow sm:text-4xl">
          {sideName} STATS
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-secondary">
          Ranking de CPs, players e distribuicao de epics da alianca, direto da planilha de
          controle.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="CPs Ativas" value={String(cpCount)} subtitle="Command posts na aliança" accent="blue" />
        <StatCard
          icon={Crown}
          label="Lider do Ranking"
          value={topCp ? topCp.name : "--"}
          subtitle={topCp ? `${topCp.points} pts acumulados` : undefined}
          accent="aqua"
        />
        <StatCard
          icon={Star}
          label="Top Player"
          value={topPlayer ? topPlayer.player : "--"}
          subtitle={topPlayer ? `${topPlayer.points} pts · ${topPlayer.cp}` : undefined}
          accent="violet"
        />
        <StatCard icon={Gem} label="Epics Resgatados" value={String(totalEpics)} subtitle="Total distribuido para a alianca" accent="yellow" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard icon={Trophy} title="Ranking de CPs" subtitle="Pontuacao acumulada por CP / caller / adm">
          <ul className="flex max-h-[480px] flex-col gap-2.5 overflow-y-auto pr-1">
            {cpRanking.map((row) => (
              <li key={`${row.rank}-${row.name}`} className="rounded-xl border border-surface-border/60 bg-surface-1/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <RankBadge rank={row.rank} />
                    <span className="truncate text-sm font-medium text-ink-primary">{row.name}</span>
                    <TypeBadge type={row.type} />
                  </div>
                  <span className="shrink-0 font-display text-sm font-semibold text-series-blue">
                    {row.points} pts
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={row.points} max={maxCpPoints} colorClass="bg-series-blue" />
                </div>
              </li>
            ))}
            {cpRanking.length === 0 && <EmptyState />}
          </ul>
        </SectionCard>

        <SectionCard icon={Medal} title="Ranking de Players" subtitle="Top pontuadores individuais">
          {topPlayer && (
            <div className="mb-3 flex items-center justify-between rounded-xl border border-series-yellow/30 bg-series-yellow/10 px-4 py-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-series-yellow">
                  Top Player
                </p>
                <p className="font-display text-lg font-bold text-ink-primary">{topPlayer.player}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-series-yellow">{topPlayer.points}</p>
                <p className="text-[10px] text-ink-muted">pontos</p>
              </div>
            </div>
          )}
          <ul className="flex max-h-[420px] flex-col gap-2.5 overflow-y-auto pr-1">
            {playerRanking.slice(0, 40).map((row) => (
              <li key={`${row.rank}-${row.player}`} className="rounded-xl border border-surface-border/60 bg-surface-1/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <RankBadge rank={row.rank} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink-primary">{row.player}</p>
                      <p className="truncate text-[11px] text-ink-muted">{row.cp}</p>
                    </div>
                  </div>
                  <span className="shrink-0 font-display text-sm font-semibold text-series-violet">
                    {row.points} pts
                  </span>
                </div>
                {row.lastItem && (
                  <p className="mt-1.5 truncate text-[11px] text-ink-muted">
                    Ultimo item: <span className="text-ink-secondary">{row.lastItem}</span>
                  </p>
                )}
              </li>
            ))}
            {playerRanking.length === 0 && <EmptyState />}
          </ul>
        </SectionCard>

        <SectionCard icon={Gem} title="Epics por CP" subtitle="Total de epics resgatados, por CP">
          <ul className="flex max-h-[480px] flex-col gap-3 overflow-y-auto pr-1">
            {epics
              .filter((e) => e.total > 0)
              .map((row, idx) => (
                <li key={row.cp} className="rounded-xl border border-surface-border/60 bg-surface-1/60 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <RankBadge rank={idx + 1} />
                      <span className="text-sm font-medium text-ink-primary">{row.cp}</span>
                    </div>
                    <span className="font-display text-sm font-semibold text-series-aqua">{row.total}</span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={row.total} max={maxEpics} colorClass="bg-series-aqua" />
                  </div>
                </li>
              ))}
            {epics.filter((e) => e.total > 0).length === 0 && <EmptyState />}
          </ul>
        </SectionCard>
      </div>

      <p className="text-center text-[11px] text-ink-muted">
        Ultima atualizacao da planilha (CP): {formatUpdate(cpRanking[0]?.lastUpdate || "")} &middot;
        (Player): {formatUpdate(playerRanking[0]?.lastUpdate || "")}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <li className="rounded-xl border border-dashed border-surface-border p-6 text-center text-xs text-ink-muted">
      Sem dados ainda. Confira se a planilha esta publicada e o NEXT_PUBLIC_SHEET_ID esta
      configurado.
    </li>
  );
}
