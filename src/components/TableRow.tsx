import { CombinedData } from "@/types";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface TableRowProps {
  market: CombinedData;
  handleOverride: (playerID: number, statID: number) => void;
}

export default function TableRow({ market, handleOverride }: TableRowProps) {
  return (
    <tr
      className={`${
        market.marketSuspended === 1 ? "text-slate-400" : ""
      } text-center text-xs md:text-base hover:cursor-default w-fit`}
      key={`${market.playerId}-${market.statTypeId}`}
    >
      <td
        className="hover:cursor-pointer"
        onClick={() => handleOverride(market.playerId, market.statTypeId)}
      >
        {market.marketSuspended === 1 ? (
          <LockClosedIcon className=" h-5 w-5 text-slate-400 m-auto" />
        ) : (
          <></>
        )}
      </td>
      <td>{market.teamAbbr}</td>
      <td>{market.playerName}</td>
      <td>{market.position}</td>
      <td>{market.statType.charAt(0).toUpperCase() + market.statType.slice(1)}</td>
      <td>{market.line}</td>
      <td>{market.lowLine}</td>
      <td>{market.highLine}</td>
    </tr>
  );
}
