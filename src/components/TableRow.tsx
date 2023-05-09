import { CombinedData } from "@/types";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface TableRowProps {
  item: CombinedData;
  handleOverride: any;
}

export default function TableRow({ item, handleOverride }: TableRowProps) {
  return (
    <tr
      className={`${
        item.marketSuspended === 1 ? "text-slate-400" : ""
      } text-center text-xs md:text-base hover:cursor-default w-fit`}
      key={`${item.playerId}-${item.statTypeId}`}
    >
      <td
        className="hover:cursor-pointer"
        onClick={() => handleOverride(item.playerId, item.statTypeId)}
      >
        {item.marketSuspended === 1 ? (
          <LockClosedIcon className=" h-5 w-5 text-slate-400 m-auto" />
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
  );
}
