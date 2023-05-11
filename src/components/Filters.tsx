import type { Position, StatType } from "@/types";

interface FiltersProps {
  selectedStatType: StatType;
  setSelectedStatType: (v: StatType) => void;
  selectedPosition: string;
  setSelectedPosition: (v: Position) => void;
  selectedMarketSuspended: string;
  setSelectedMarketSuspended: (v: string) => void;
  searchValue: string;
  setSearchValue: (v: string) => void;
  handleResetFilters: () => void;
}

export default function Filters({
  selectedStatType,
  setSelectedStatType,
  selectedPosition,
  setSelectedPosition,
  selectedMarketSuspended,
  setSelectedMarketSuspended,
  searchValue,
  setSearchValue,
  handleResetFilters,
}: FiltersProps) {
  return (
    <section className="w-full p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 w-full md:grid md:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center" htmlFor="stat-type">
          Filter by Market:&nbsp;&nbsp;
          <select
            className="grow p-2 rounded-sm dark:bg-slate-700"
            id="stat-type"
            value={selectedStatType}
            onChange={(e) => setSelectedStatType(e.target.value as StatType)}
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
            onChange={(e) => setSelectedPosition(e.target.value as Position)}
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
            onChange={(e) => setSelectedMarketSuspended(e.target.value)}
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
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Player or Team"
          />
        </label>
      </div>
      <button
        className="flex justify-center px-8 py-2 my-2 w-full md:w-fit rounded-sm bg-slate-300 hover:bg-slate-400 shadow-md dark:bg-slate-700 dark:hover:bg-slate-800"
        type="button"
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </section>
  );
}
