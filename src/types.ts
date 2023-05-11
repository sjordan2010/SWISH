export type All = "all";
export type StatType = "points" | "rebounds" | "assists" | "steals" | "blocks" | All;
export type Position = "PG" | "SG" | "SF" | "PF" | "C" | All;

export type PropData = {
  playerName: string;
  playerId: number;
  teamId: number;
  teamNickname: string;
  teamAbbr: string;
  statType: Omit<StatType, All>;
  statTypeId: number;
  position: Omit<Position, All>;
  marketSuspended: number;
  line: number;
};

export type CombinedData = PropData & {
  lowLine: number;
  highLine: number;
};

export type AlternateData = {
  line: number;
  overOdds: number;
  playerId: number;
  playerName: string;
  pushOdds: number;
  statType: Omit<StatType, All>;
  statTypeId: number;
  underOdds: number;
};
