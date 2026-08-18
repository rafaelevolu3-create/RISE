import { parseCsv, toNumber } from "./csv";
import { CpRankingRow, PlayerRankingRow, EpicsRow, EPIC_NAMES, SheetsData } from "./types";

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || "";

const TAB_NAMES = {
  cpRanking: "CP points",
  playerRanking: "Player Ranking",
  epics: "Epics Control",
} as const;

function gvizUrl(sheetName: string) {
  const encoded = encodeURIComponent(sheetName);
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encoded}`;
}

async function fetchTabRows(sheetName: string): Promise<string[][]> {
  if (!SHEET_ID) return [];
  const res = await fetch(gvizUrl(sheetName), {
    // Revalidate every 5 minutes so the site stays close to live without
    // hammering Google Sheets on every request.
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    console.error(`Failed to fetch sheet tab "${sheetName}": ${res.status}`);
    return [];
  }
  const text = await res.text();
  return parseCsv(text).filter((row) => row.some((cell) => cell.trim() !== ""));
}

function cell(row: string[] | undefined, i: number): string {
  return (row?.[i] ?? "").trim();
}

function parseCpRanking(rows: string[][]): CpRankingRow[] {
  const out: CpRankingRow[] = [];
  for (const row of rows.slice(1)) {
    const name = cell(row, 1);
    if (!name) continue;
    out.push({
      rank: toNumber(cell(row, 0)),
      name,
      type: cell(row, 2) || "CP",
      points: toNumber(cell(row, 3)),
      lastUpdate: cell(row, 4),
    });
  }
  return out.sort((a, b) => b.points - a.points);
}

function parsePlayerRanking(rows: string[][]): PlayerRankingRow[] {
  const out: PlayerRankingRow[] = [];
  for (const row of rows.slice(1)) {
    const player = cell(row, 1);
    if (!player) continue;
    out.push({
      rank: toNumber(cell(row, 0)),
      player,
      cp: cell(row, 2),
      points: toNumber(cell(row, 3)),
      lastUpdate: cell(row, 4),
      lastItem: cell(row, 5),
    });
  }
  return out.sort((a, b) => b.points - a.points);
}

function parseEpics(rows: string[][]): EpicsRow[] {
  if (rows.length === 0) return [];
  const header = rows[0];
  const epicColumns = EPIC_NAMES.map((name) => ({
    name,
    idx: header.findIndex((h) => h.trim().toLowerCase() === name.toLowerCase()),
  }));

  const out: EpicsRow[] = [];
  for (const row of rows.slice(1)) {
    const cp = cell(row, 0);
    if (!cp) continue;
    const counts: Record<string, number> = {};
    let total = 0;
    for (const { name, idx } of epicColumns) {
      const value = idx >= 0 ? toNumber(cell(row, idx)) : 0;
      counts[name] = value;
      total += value;
    }
    out.push({ cp, counts, total });
  }
  return out.sort((a, b) => b.total - a.total);
}

export async function getSheetsData(): Promise<SheetsData> {
  const [cpRankingRows, playerRankingRows, epicsRows] = await Promise.all([
    fetchTabRows(TAB_NAMES.cpRanking),
    fetchTabRows(TAB_NAMES.playerRanking),
    fetchTabRows(TAB_NAMES.epics),
  ]);

  return {
    cpRanking: parseCpRanking(cpRankingRows),
    playerRanking: parsePlayerRanking(playerRankingRows),
    epics: parseEpics(epicsRows),
    fetchedAt: new Date().toISOString(),
  };
}
