interface FiltersProps {
  selectedStatType: string;
  handleStatTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPosition: string;
  handlePositionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedMarketSuspended: string;
  handleMarketSuspendedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
}

export default function Filters({
  selectedStatType,
  handleStatTypeChange,
  selectedPosition,
  handlePositionChange,
  selectedMarketSuspended,
  handleMarketSuspendedChange,
  searchValue,
  handleSearchChange,
  handleReset,
}: FiltersProps) {
  return (
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
  );
}
