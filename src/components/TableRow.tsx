import { CombinedData } from "@/types";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

interface TableRowProps {
  market: CombinedData;
  handleOverride: (playerID: number, statID: number) => void;
  index: number;
}

export default function TableRow({ market, handleOverride, index }: TableRowProps) {
  return (
    <tr
      className={`${market.marketSuspended === 1 ? "text-slate-400" : ""} 
    text-left text-xs align-middle md:text-base hover:cursor-default w-fit`}
      key={`${market.playerId}-${market.statTypeId}`}
    >
      <td
        className="hover:cursor-pointer"
        onClick={() => handleOverride(market.playerId, market.statTypeId)}
      >
        {market.marketSuspended === 1 ? <LockClosed /> : <ActiveButton />}
      </td>
      <td className="flex justify-center items-center h-full">
        {market.teamAbbr === "LAL" ? (
          <Image alt="LAL logo" src="/LAL-logo.svg" height={45} width={45} />
        ) : (
          <Image alt="GSW logo" src="/GSW-logo.svg" height={30} width={30} />
        )}
      </td>
      <td className="">
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
    <>
      <button
        className="m-auto text-xs text-white w-fit  bg-green-500 px-3 py-1 rounded-full hover:bg-green-400"
        data-tooltip-id="activeBtn"
        data-tooltip-content="Suspend this market"
      >
        ACTIVE
      </button>
      <Tooltip id="activeBtn" variant="error" />
    </>
  );
}
function LockClosed() {
  return (
    <>
      <LockClosedIcon
        className=" h-5 w-5 text-slate-400 m-auto"
        data-tooltip-id="suspendIcon"
        data-tooltip-content="Release this market"
      />

      <Tooltip id="suspendIcon" variant="success" />
    </>
  );
}
