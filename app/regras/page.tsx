import { ScrollText, Gem } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";

export const revalidate = 300;

const POINT_RULES = [
  { label: "Membro (participacao base)", value: "1 pt (seg-sex) / 2 pts (fim de semana)" },
  { label: "Caller", value: "3 pts (seg-sex) / 6 pts (fim de semana) — credito individual, fora do pool da CP" },
  { label: "Lider da side", value: "15 pts semanais fixos (conta separada)" },
  { label: "CP Warfront full (9/9)", value: "+6 pts (seg-sex) / +12 pts (fim de semana)" },
  { label: "CP AOE full (9/9)", value: "+3 pts (seg-sex) / +6 pts (fim de semana)" },
  { label: "Funcao administrativa", value: "12 pts por semana" },
  { label: "Participacao em Olympiad", value: "1 pt no Player Ranking, por participacao" },
];

const EPIC_COSTS = [
  { name: "Valakas", cost: 2000 },
  { name: "Antharas", cost: 1000 },
  { name: "Baium", cost: 900 },
  { name: "Frintezza", cost: 250 },
  { name: "Zaken", cost: 180 },
  { name: "Queen Ant", cost: 150 },
  { name: "Orfen", cost: 60 },
  { name: "Core", cost: 40 },
];

const RULES = [
  "Cada CP tem saldo individual acumulado; maior saldo entre elegiveis tem prioridade de resgate.",
  "Ao resgatar um epic, desconta-se apenas o custo do item — o saldo restante nao zera.",
  "Sem restricao de build: qualquer CP entra na fila de qualquer epic.",
  "Empate na fila e resolvido por roll de dados.",
  "Sem teto de acumulo — os pontos nao expiram.",
  "A mesma CP nao pode pegar a mesma joia/epic duas semanas seguidas.",
  "Todo item resgatado vai para o bau do cla.",
  "Distribuicao toda segunda-feira, as 22h (horario de Brasilia), com reuniao no TeamSpeak da alianca.",
  "A CP que resgatar uma high epic (Valakas, Antharas ou Baium) nao pode resgatar nenhuma outra joia na mesma semana.",
  "Nenhuma CP pode pegar a mesma High Epic duas vezes seguidas — so pode comprar de novo depois que outra CP tiver comprado uma unidade.",
  "Ao comprar o Valakas, os pontos acumulados da CP sao zerados, independente da quantidade acumulada.",
  "O trash de boss da semana e distribuido para os players mais participativos, com base no ranking de participacao semanal.",
  "Se nenhuma lideranca/representante da CP estiver presente na reuniao de distribuicao, a prioridade passa para a proxima CP na fila.",
];

export default function RegrasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-primary">
          Regulamento de Distribuicao de Epics
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Lineage 2 Reborn — Alianca RISE. Resumo do regulamento oficial de pontos e fila de epics.
        </p>
      </div>

      <SectionCard icon={ScrollText} title="Pontos por Movimentacao" subtitle="Como cada tipo de participacao gera pontos">
        <ul className="flex flex-col gap-2">
          {POINT_RULES.map((rule) => (
            <li
              key={rule.label}
              className="flex flex-col justify-between gap-1 rounded-xl border border-surface-border/60 bg-surface-1/60 px-4 py-2.5 sm:flex-row sm:items-center"
            >
              <span className="text-sm font-medium text-ink-primary">{rule.label}</span>
              <span className="text-sm text-series-blue">{rule.value}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard icon={Gem} title="Tabela de Custo em Pontos" subtitle="Custo de resgate de cada epic, da fila por saldo acumulado">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {EPIC_COSTS.map((e) => (
            <div key={e.name} className="rounded-xl border border-surface-border/60 bg-surface-1/60 p-3 text-center">
              <p className="text-xs font-semibold text-ink-primary">{e.name}</p>
              <p className="mt-1 font-display text-lg font-bold text-series-yellow">{e.cost}</p>
              <p className="text-[10px] text-ink-muted">pontos</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={ScrollText} title="Regras da Fila e Cooldowns" subtitle="Como funciona o resgate, cooldowns e exclusividade">
        <ol className="flex flex-col gap-2.5">
          {RULES.map((rule, idx) => (
            <li key={idx} className="flex gap-3 rounded-xl border border-surface-border/60 bg-surface-1/60 px-4 py-2.5">
              <span className="font-display text-xs font-semibold text-series-blue">{String(idx + 1).padStart(2, "0")}</span>
              <span className="text-sm text-ink-secondary">{rule}</span>
            </li>
          ))}
        </ol>
      </SectionCard>
    </div>
  );
}
