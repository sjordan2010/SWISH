import { CombinedData } from "@/types";
import TableRow from "./TableRow";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";

interface TableProps {
  filteredData: CombinedData[];
  handleOverride: (playerID: number, statID: number) => void;
  toggleMassOverride: () => void;
  allSuspended: boolean;
}

export default function Table({
  handleOverride,
  toggleMassOverride,
  filteredData,
  allSuspended,
}: TableProps) {
  const columns = ["TEAM", "PLAYER", "MARKET", "LOW", "HIGH", "LINE"];

  return (
    <section className="table-container w-11/12 overflow-x-scroll">
      <table className="w-fit shadow-xl m-auto">
        <thead>
          <tr className="h-12 text-slate-400">
            <th className="min-w-10 text-sm md:text-base hover:cursor-default" key="lockTableHead">
              {allSuspended ? (
                <LockOpenIcon
                  className="h-6 w-6 text-slate-400 m-auto hover:cursor-pointer"
                  onClick={toggleMassOverride}
                  key="col0"
                  data-tooltip-id="massRelease"
                  data-tooltip-content="Release All Markets"
                />
              ) : (
                <LockClosedIcon
                  className="h-6 w-6 text-slate-400 m-auto hover:cursor-pointer"
                  onClick={toggleMassOverride}
                  key="col0"
                  data-tooltip-id="massSuspend"
                  data-tooltip-content="Suspend All Markets"
                />
              )}
              <Tooltip id="massRelease" />
              <Tooltip id="massSuspend" />
            </th>
            {columns.map((col, index) => (
              <th
                className="text-sm text-left px-4 md:text-base hover:cursor-default min-w-10"
                key={`col ${index}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredData.map((market: CombinedData, index) => (
            <TableRow
              index={index}
              key={`${market.playerId}-${market.statTypeId}`}
              market={market}
              handleOverride={handleOverride}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
