import { CombinedData } from "@/types";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface TableRowProps {
  market: CombinedData;
  handleOverride: (playerID: number, statID: number) => void;
  index: number;
}

export default function TableRow({ market, handleOverride, index }: TableRowProps) {
  return (
    <tr
      className={`${market.marketSuspended === 1 ? "text-slate-400" : ""} 
    text-left text-xs md:text-base hover:cursor-default w-fit`}
      key={`${market.playerId}-${market.statTypeId}`}
    >
      <td
        className="hover:cursor-pointer"
        onClick={() => handleOverride(market.playerId, market.statTypeId)}
      >
        {market.marketSuspended === 1 ? (
          <LockClosedIcon className=" h-5 w-5 text-slate-400 m-auto" />
        ) : (
          <ActiveButton />
        )}
      </td>
      <td>{market.teamAbbr}</td>
      <td>
        {market.playerName}&nbsp;&nbsp;<span className="text-slate-400"> {market.position} </span>
      </td>
      <td>{market.statType.charAt(0).toUpperCase() + market.statType.slice(1)}</td>
      <td>{market.lowLine}</td>
      <td>{market.highLine}</td>
      <td className="text-blue-600 dark:text-blue-500">{market.line}</td>
    </tr>
  );
}

function ActiveButton() {
  return (
    <button className="m-auto text-xs text-white w-fit  bg-green-500 px-3 py-1 rounded-full">
      ACTIVE
    </button>
  );
}
