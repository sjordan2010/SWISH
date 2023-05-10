import { CombinedData } from "@/types";
import TableRow from "./TableRow";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface TableProps {
  allData: CombinedData[];
  handleOverride: any;
}

export default function Table({ handleOverride, allData }: TableProps) {
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
