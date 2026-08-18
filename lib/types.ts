export type CpRankingRow = {
  rank: number;
  name: string;
  type: "CP" | "Caller" | "ADM" | string;
  points: number;
  lastUpdate: string;
};

export type PlayerRankingRow = {
  rank: number;
  player: string;
  cp: string;
  points: number;
  lastUpdate: string;
  lastItem: string;
};

export const EPIC_NAMES = [
  "Core",
  "Orfen",
  "Queen Ant",
  "Zaken",
  "Frintezza",
  "Baium",
  "Antharas",
  "Valakas",
] as const;

export type EpicName = (typeof EPIC_NAMES)[number];

export type EpicsRow = {
  cp: string;
  counts: Record<string, number>;
  total: number;
};

export type SheetsData = {
  cpRanking: CpRankingRow[];
  playerRanking: PlayerRankingRow[];
  epics: EpicsRow[];
  fetchedAt: string;
};
