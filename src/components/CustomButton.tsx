import type { IconType } from "react-icons";
import Tooltip from "./Tooltip";

export default function Button({
  onClick,
  label,
  icon: Icon,
  disabled,
  tooltip,
  tooltipPosition
}: {
  onClick: () => void;
  label?: string;
  icon?: IconType;
  disabled?: boolean;
  tooltip: string;
  tooltipPosition?:"top" | "bottom" | "left" | "right"
}) {
  return (
    <Tooltip text={tooltip} position={tooltipPosition}>
      <button
        className={`rounded-md px-2 content-wrap ${
          disabled ? "bg-gray-700" : "bg-button hover:bg-button-shade"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className={"flex flex-row gap-2 items-center"}>
          {label || ""}
          {Icon ? <Icon className={"text-vibe-green align-bottom"} /> : <></>}
        </div>
      </button>
    </Tooltip>
  );
}
