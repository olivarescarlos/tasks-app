import React from "react";

export default function Tooltip({
  children,
  text,
  position="top",
}: {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const positionStyle = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 mr-1",
    right: "left-full top-1/2 -translate-y-1/2 ml-1",
  };

  return (
    <div className="relative group contents">
      <span className="relative inline-flex">
        {children}
        <div
          className={`absolute z-50 hidden group-hover:block whitespace-nowrap px-2 py-1 text-sm text-white bg-black rounded shadow-md pointer-events-none transition-all duration-200 ${positionStyle[position]}`}
        >
          {text}
        </div>
      </span>
    </div>
  );
}
