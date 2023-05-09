export type PropData = {
    playerName: string;
    playerId: number;
    teamId: number;
    teamNickname: string;
    teamAbbr: string;
    statType: "points" | "rebounds" | "assists" | "steals" | "blocks";
    statTypeId: number;
    position: "PG" | "SG" | "SF" | "PF" | "C";
    marketSuspended: 0 | 1;
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
    statType: "points" | "rebounds" | "assists" | "steals" | "blocks";
    statTypeId: number;
    underOdds: number;
  };