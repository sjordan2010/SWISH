import { useQuery } from "@tanstack/react-query";
import { fetchAlternates, fetchProps } from "@/utils/fetchData";
import { useState } from "react";

export default function TestFetch() {
  const {
    isLoading,
    isError,
    data: AlternateData,
    error,
  } = useQuery(["alternateData"], fetchAlternates);
  const { data: PropData } = useQuery(["propData"], fetchProps);

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

  const filteredData: PropData[] = PropData.filter(
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

  return (
    <div>
      <label htmlFor="stat-type">Filter by stat type:</label>
      <select id="stat-type" value={selectedStatType} onChange={handleStatTypeChange}>
        <option value="all">All</option>
        <option value="assists">Assists</option>
        <option value="rebounds">Rebounds</option>
        <option value="points">Points</option>
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
            <th>Position</th>
            <th>Stat Type</th>
            <th>Line</th>
            <th>Market Status</th>
            <th>HighALT</th>
            <th>LowALT</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={`${item.playerId}-${item.statTypeId}`}>
              <td>{item.teamAbbr}</td>
              <td>{item.playerName}</td>
              <td>{item.position}</td>
              <td>{item.statType}</td>
              <td>{item.line}</td>
              <td>{item.marketSuspended}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
