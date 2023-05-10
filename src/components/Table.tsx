import { CombinedData } from "@/types";
import TableRow from "./TableRow";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";

interface TableProps {
  allData: CombinedData[];
  handleOverride: (playerID: number, statID: number) => void;
  handleMassOverride: () => void;
}

export default function Table({ handleOverride, handleMassOverride, allData }: TableProps) {
  const columns = ["TEAM", "PLAYER", "POS", "MARKET", "LINE", "LOW", "HIGH"];

  return (
    <section className="table-container w-11/12 overflow-x-scroll mb-12">
      <table className="w-full">
        <thead>
          <tr className="h-12 text-center text-slate-400">
            <th
              className="text-sm md:text-base hover:cursor-default text-center"
              key="lockTableHead"
            >
              <LockClosedIcon
                data-tooltip-id="massOverride"
                data-tooltip-content="Suspend or Open All Markets"
                onClick={handleMassOverride}
                key="col0"
                className="h-6 w-6 text-slate-400 m-auto hover:cursor-pointer"
              />
              <Tooltip id="massOverride" />
            </th>
            {columns.map((col, index) => (
              <th
                className="text-sm md:text-base hover:cursor-default text-center min-w-10"
                key={`col ${index}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {allData.map((market: CombinedData) => (
            <TableRow
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
