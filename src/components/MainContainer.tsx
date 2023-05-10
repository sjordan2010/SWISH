import { useState, useEffect, useCallback, useMemo } from "react";
import { PropData, CombinedData, AlternateData } from "../types";
import { combineData } from "@/utils/combineData";
import Table from "./Table";
import Filters from "./Filters";

interface MainProps {
  altQuery: AlternateData[];
  propQuery: PropData[];
}

export default function MainContainer({ altQuery, propQuery }: MainProps) {
  const [selectedStatType, setSelectedStatType] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedMarketSuspended, setSelectedMarketSuspended] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const combinedData: CombinedData[] = combineData(propQuery, altQuery).filter(
    (market: PropData) =>
      (market.playerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        market.teamNickname.toLowerCase().includes(searchValue.toLowerCase())) &&
      (selectedStatType === "all" || market.statType === selectedStatType) &&
      (selectedPosition === "all" || market.position === selectedPosition) &&
      (selectedMarketSuspended === "all" ||
        market.marketSuspended.toString() === selectedMarketSuspended)
  );



  const [allData, setAllData] = useState<CombinedData[]>(combinedData);

    // useEffect(() => {
    //   setAllData(prev => combinedData)
    // }, [combinedData])


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

  const handleMassOverride = (): void => {
    setAllData((prev: CombinedData[]) => {
      if (prev[0].marketSuspended === 0) {
        const newData: CombinedData[] = prev.map((market) => {
          return {
            ...market,
            marketSuspended: 1,
          };
        });
        return newData;
      } else {
        const newData: CombinedData[] = prev.map((market) => {
          return {
            ...market,
            marketSuspended: 0,
          };
        });
        return newData;
      }
    });
  };

  const handleOverride = (playerID: number, statID: number): void => {
    
    setAllData((prev: CombinedData[]) => {
      const newData: CombinedData[] = prev.map((market) => {
        if (market.playerId === playerID && market.statTypeId === statID) {
          return {
            ...market,
            marketSuspended: market.marketSuspended === 1 ? 0 : 1,
          };
        }
        return market;
      });
      return newData;
    });
  };
  
  return (
    <div className="flex flex-col justify-center items-center w-11/12 my-12 p-1 rounded-sm md:p-4 container table-shadow">
      <picture>
        <source srcSet="swish-white.png" media="(prefers-color-scheme: dark)" />
        <img className="my-4" src="swish-black.png" width={250} alt="Swish analytics logo" />
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
      <Table
        handleOverride={handleOverride}
        handleMassOverride={handleMassOverride}
        // allData={allData} // filters don't work with this
        allData={combinedData} // override doesn't work with this... but when I switch back to allData, override worked, but wouldn't show here
      />
    </div>
  );
}