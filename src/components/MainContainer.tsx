import { useQueries } from "@tanstack/react-query";
import { fetchAlternates, fetchProps } from "@/utils/fetchData";
import { useState } from "react";
import { PropData, CombinedData } from "../types";
import { combineData } from "@/utils/combineData";
import Table from "./Table";
import Filters from "./Filters";

export default function MainContainer() {
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

  const [selectedStatType, setSelectedStatType] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedMarketSuspended, setSelectedMarketSuspended] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  // const [allData, setAllData] = useState([]);

  if (AltLoading || PropLoading) return <div>Loading...</div>;

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
    console.log("override");
    combinedData.forEach((market: CombinedData) => {
      if (market.playerId === playerID && market.statTypeId === statID) {
        if (market.marketSuspended === 1) return (market.marketSuspended = 0);
        else market.marketSuspended = 1;
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-11/12 my-12 p-1 rounded-sm md:p-4 container table-shadow">
      <picture>
        <source srcSet="swish-white.png" media="(prefers-color-scheme: dark)" />
        <img
          className="my-4"
          src="swish-black.png"
          width={250}
          alt="Browser with large and small images of a coffee cup and plants"
        />
      </picture>
      <Filters
        selectedStatType={selectedStatType}
        handleStatTypeChange={handleStatTypeChange}
        selectedPosition={selectedPosition}
        handlePositionChange={handlePositionChange}
        selectedMarketSuspended={selectedMarketSuspended}
        handleMarketSuspendedChange={handleMarketSuspendedChange}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleReset={handleReset}
      />
      <Table handleOverride={handleOverride} combinedData={combinedData} />
    </div>
  );
}

// XXX find all markets in alternates data where the playerID and statTypeID is the same
// XXX find the highest and lowest line out of those and print to table
// XXX if statTypeID or playerID doesn't exist within alternates => market is SUSPENDED
// XXX if marketSuspended = 1 => market is SUSPENDED
// XXX if over, under, and push are all under 0.4 => market is SUSPENDED

// need to figure out how to re render when combinedData is updated.
