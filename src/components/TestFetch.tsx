import { useQueries } from "@tanstack/react-query";
import { fetchAlternates, fetchProps } from "@/utils/fetchData";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { PropData, CombinedData } from "../types";
import { combineData } from "@/utils/combineData";

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
    console.log('override')
    combinedData.forEach((market: CombinedData) => {
      if (market.playerId === playerID && market.statTypeId === statID) {
        if (market.marketSuspended === 1) return (market.marketSuspended = 0);
        else market.marketSuspended = 1;
      }
    });
  };

  const columns = [
    <LockClosedIcon key="col0" className="h-6 w-6 text-slate-400 m-auto" />,
    "TEAM",
    "PLAYER",
    "POS",
    "MARKET",
    "LINE",
    "LOW",
    "HIGH",
  ];

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
      <section className="w-11/12 p-4 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 w-full md:grid md:grid-cols-2 lg:grid-cols-4">
          <label className="flex items-center" htmlFor="stat-type">
            Filter by Market:&nbsp;&nbsp;
            <select
              className="grow p-2 rounded-sm dark:bg-slate-700"
              id="stat-type"
              value={selectedStatType}
              onChange={handleStatTypeChange}
            >
              <option value="all">All</option>
              <option value="points">Points</option>
              <option value="assists">Assists</option>
              <option value="rebounds">Rebounds</option>
              <option value="steals">Steals</option>
              <option value="blocks">Blocks</option>
            </select>
          </label>
          <label className="flex items-center" htmlFor="position">
            Filter by Position:&nbsp;&nbsp;
            <select
              className="grow p-2 rounded-sm dark:bg-slate-700"
              id="position"
              value={selectedPosition}
              onChange={handlePositionChange}
            >
              <option value="all">All</option>
              <option value="PG">PG</option>
              <option value="SG">SG</option>
              <option value="SF">SF</option>
              <option value="PF">PF</option>
              <option value="C">C</option>
            </select>
          </label>
          <label className="flex items-center" htmlFor="market-status">
            Filter by Status:&nbsp;&nbsp;
            <select
              className="grow p-2 rounded-sm dark:bg-slate-700"
              id="market-status"
              value={selectedMarketSuspended}
              onChange={handleMarketSuspendedChange}
            >
              <option value="all">All</option>
              <option value="1">Suspended</option>
              <option value="0">Open</option>
            </select>
          </label>
          <label className="flex items-center" htmlFor="search">
            Search:&nbsp;&nbsp;
            <input
              className="grow p-2 rounded-sm dark:bg-slate-700"
              id="search"
              type="search"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Player or Team"
            />
          </label>
        </div>
        <button
          className="flex justify-end px-8 py-2 w-fit rounded-sm my-2 bg-slate-300 hover:bg-slate-400 shadow-md dark:bg-slate-700 dark:hover:bg-slate-800"
          type="button"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </section>
      <section className="table-container w-11/12 overflow-x-scroll mb-12">
        <table className="w-full">
          <thead>
            <tr className="h-12 text-center text-slate-400">
              {columns.map((col, index) => (
                <th
                  className="text-sm md:text-base hover:cursor-default text-center"
                  key={`col ${index}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {combinedData.map((item) => (
              <tr
                className={`${
                  item.marketSuspended === 1 ? "text-slate-400" : ""
                } text-center text-xs md:text-base hover:cursor-default w-fit`}
                key={`${item.playerId}-${item.statTypeId}`}
              >
                <td className="hover:cursor-pointer" onClick={() => handleOverride(item.playerId, item.statTypeId)}>
                  {item.marketSuspended === 1 ? (
                    <LockClosedIcon
                      className=" h-5 w-5 text-slate-400 m-auto"
                    />
                  ) : (
                    <></>
                  )}
                </td>
                <td>{item.teamAbbr}</td>
                <td>{item.playerName}</td>
                <td>{item.position}</td>
                <td>{item.statType.charAt(0).toUpperCase() + item.statType.slice(1)}</td>
                <td>{item.line}</td>
                <td>{item.lowLine}</td>
                <td>{item.highLine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// XXX find all markets in alternates data where the playerID and statTypeID is the same
// XXX find the highest and lowest line out of those and print to table
// XXX if statTypeID or playerID doesn't exist within alternates => market is SUSPENDED
// XXX if marketSuspended = 1 => market is SUSPENDED
// XXX if over, under, and push are all under 0.4 => market is SUSPENDED

// need to figure out how to re render when combinedData is updated.
