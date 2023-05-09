import { useQueries } from "@tanstack/react-query";
import { fetchAlternates, fetchProps } from "@/utils/fetchData";
import { useState } from "react";

export default function TestFetch() {
  const [{ isLoading: AltLoading, data: AltQuery }, { isLoading: PropLoading, data: PropQuery }] =
    useQueries({
      queries: [
        {
          queryKey: ["alternateData"],
          queryFn: () => fetchAlternates(),
        },
        {
          queryKey: ["propData"],
          queryFn: () => fetchProps(),
        },
      ],
    });

  type PropData = {
    playerName: string;
    playerId: number;
    teamId: number;
    teamNickname: string;
    teamAbbr: string;
    statType: "points" | "rebounds" | "assists" | "steals";
    statTypeId: number;
    position: "PG" | "SG" | "SF" | "PF" | "C";
    marketSuspended: 0 | 1;
    line: number;
  };

  type CombinedData = PropData & {
    lowLine: number;
    highLine: number;
  };

  type AlternateData = {
    line: number;
    overOdds: number;
    playerId: number;
    playerName: string;
    pushOdds: number;
    statType: "points" | "rebounds" | "assists" | "steals";
    statTypeId: number;
    underOdds: number;
  };

  const [selectedStatType, setSelectedStatType] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedMarketSuspended, setSelectedMarketSuspended] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  if (AltLoading || PropLoading) return <div>Loading...</div>;

  // const filteredData: PropData[] = PropQuery.filter(
  //   (item: PropData) =>
  //     (item.playerName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       item.teamNickname.toLowerCase().includes(searchValue.toLowerCase())) &&
  //     (selectedStatType === "all" || item.statType === selectedStatType) &&
  //     (selectedPosition === "all" || item.position === selectedPosition) &&
  //     (selectedMarketSuspended === "all" ||
  //       item.marketSuspended.toString() === selectedMarketSuspended)
  // );

  const combineData = (propData: PropData[], altData: AlternateData[]): CombinedData[] => {
    const combined = [];

    for (let i = 0; i < propData.length; i++) {
      let lowLine = propData[i].line,
        highLine = propData[i].line,
        matched = false,
        suspended = false;

      for (let j = 0; j < altData.length; j++) {
        if (propData[i].playerId === altData[j].playerId) {
          if (propData[i].statTypeId === altData[j].statTypeId) {
            if (propData[i].line === altData[j].line) {
              matched = true;
            }
            if (altData[j].line > highLine) highLine = altData[j].line;
            if (altData[j].line < lowLine) lowLine = altData[j].line;
            if (
              altData[j].overOdds < 0.4 &&
              altData[j].pushOdds < 0.4 &&
              altData[j].underOdds < 0.4
            ) {
              suspended = true;
            }
          }
        }
      }
      if (suspended || !matched) propData[i].marketSuspended = 1;
      combined.push({ ...propData[i], lowLine: lowLine, highLine: highLine });
    }

    return combined;
  };

  const combinedData: CombinedData[] = combineData(PropQuery, AltQuery).filter(
    (item: PropData) =>
      (item.playerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.teamNickname.toLowerCase().includes(searchValue.toLowerCase())) &&
      (selectedStatType === "all" || item.statType === selectedStatType) &&
      (selectedPosition === "all" || item.position === selectedPosition) &&
      (selectedMarketSuspended === "all" ||
        item.marketSuspended.toString() === selectedMarketSuspended)
  );

  const handleStatTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatType(event.target.value);
  };
  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
  };
  const handleMarketSuspendedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMarketSuspended(event.target.value);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleReset = (): void => {
    setSelectedStatType("all");
    setSelectedPosition("all");
    setSelectedMarketSuspended("all");
    setSearchValue("");
  };

  const handleOverride = (playerID: number, statID: number): void => {
    console.log("clicked id", playerID, statID);
    combinedData.forEach((market: CombinedData) => {
      if (market.playerId === playerID && market.statTypeId === statID) {
        market.marketSuspended === 1 ? (market.marketSuspended = 0) : (market.marketSuspended = 1);
      }
    });
    console.log("PropQuery", PropQuery);
  };

  return (
    <div>
      <label htmlFor="stat-type">Filter by stat type:</label>
      <select id="stat-type" value={selectedStatType} onChange={handleStatTypeChange}>
        <option value="all">All</option>
        <option value="points">Points</option>
        <option value="rebounds">Rebounds</option>
        <option value="assists">Assists</option>
        <option value="steals">Steals</option>
      </select>
      <label htmlFor="position">Filter by Position: </label>
      <select id="position" value={selectedPosition} onChange={handlePositionChange}>
        <option value="all">All</option>
        <option value="PG">PG</option>
        <option value="SG">SG</option>
        <option value="SF">SF</option>
        <option value="PF">PF</option>
        <option value="C">C</option>
      </select>
      <label htmlFor="market-status">Filter by Market Status:</label>
      <select
        id="market-status"
        value={selectedMarketSuspended}
        onChange={handleMarketSuspendedChange}
      >
        <option value="all">All</option>
        <option value="1">Suspended</option>
        <option value="0">Open</option>
      </select>
      <label htmlFor="search">
        Search by Team or Player:
        <input
          id="search"
          type="search"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="player or team name..."
        />
      </label>
      <button type="button" onClick={handleReset}>
        Reset Filters
      </button>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Player</th>
            <th>Pos</th>
            <th>Stat</th>
            <th>Line</th>
            <th>Low</th>
            <th>High</th>
            <th>Market</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((item) => (
            <tr key={`${item.playerId}-${item.statTypeId}`}>
              <td>{item.teamAbbr}</td>
              <td>{item.playerName}</td>
              <td>{item.position}</td>
              <td>{item.statType.charAt(0).toUpperCase() + item.statType.slice(1)}</td>
              <td>{item.line}</td>
              <td>{item.lowLine}</td>
              <td>{item.highLine}</td>
              <td onClick={() => handleOverride(item.playerId, item.statTypeId)}>
                {item.marketSuspended === 1 ? "Suspended" : "Open"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// find all markets in alternates data where the playerID and statTypeID is the same
// find the highest and lowest line out of those and print to table
// if statTypeID or playerID doesn't exist within alternates => market is SUSPENDED
// if marketSuspended = 1 => market is SUSPENDED
// if over, under, and push are all under 0.4 => market is SUSPENDED
