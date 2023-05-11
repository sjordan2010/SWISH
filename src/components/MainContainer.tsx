import { useState, useMemo } from "react";
import type { CombinedData, Position, StatType } from "../types";
import Table from "./Table";
import Filters from "./Filters";

type MainProps = { combinedData: CombinedData[] };

export default function MainContainer({ combinedData }: MainProps) {
  const [selectedStatType, setSelectedStatType] = useState<StatType>("all");
  const [selectedPosition, setSelectedPosition] = useState<Position>("all");
  const [selectedMarketSuspended, setSelectedMarketSuspended] = useState("all");
  const [allSuspended, toggleAllSuspended] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const [allData, setAllData] = useState<CombinedData[]>(combinedData);

  const filteredData = useMemo(
    () =>
      allData.filter(
        (market) =>
          (market.playerName.toLowerCase().includes(searchValue.toLowerCase()) ||
            market.teamNickname.toLowerCase().includes(searchValue.toLowerCase()) || 
            market.teamAbbr.toLowerCase().includes(searchValue.toLowerCase())) &&
          (selectedStatType === "all" || market.statType === selectedStatType) &&
          (selectedPosition === "all" || market.position === selectedPosition) &&
          (selectedMarketSuspended === "all" ||
            market.marketSuspended.toString() === selectedMarketSuspended)
      ),
    [allData, selectedStatType, selectedPosition, selectedMarketSuspended, searchValue]
  );

  const handleResetFilters = () => {
    setSelectedStatType("all");
    setSelectedPosition("all");
    setSelectedMarketSuspended("all");
    setSearchValue("");
  };

  const toggleMassOverride = () => {
    const marketSuspended = allSuspended ? 0 : 1;
    const dataWithOverrides = allData.map((market) => ({
      ...market,
      marketSuspended,
    }));
    setAllData(dataWithOverrides);
    toggleAllSuspended((prev) => !prev);
  };

  const handleOverride = (playerID: number, statID: number) => {
    const newData = allData.map((market) => {
      if (market.playerId === playerID && market.statTypeId === statID) {
        return {
          ...market,
          marketSuspended: market.marketSuspended ? 0 : 1,
        };
      }
      return market;
    });
    setAllData(newData);
  };

  return (
    <div className="flex flex-col justify-center items-center w-11/12 my-32 p-1 rounded-sm md:p-4 md:pb-12 primary-bg table-shadow">
      <Filters
        selectedStatType={selectedStatType}
        setSelectedStatType={setSelectedStatType}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        selectedMarketSuspended={selectedMarketSuspended}
        setSelectedMarketSuspended={setSelectedMarketSuspended}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleResetFilters={handleResetFilters}
      />
      <Table
        handleOverride={handleOverride}
        toggleMassOverride={toggleMassOverride}
        filteredData={filteredData}
        allSuspended={allSuspended}
      />
    </div>
  );
}
