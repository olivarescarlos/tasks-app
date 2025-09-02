import { useEffect, useState } from "react";

export default function LoadingBar({
  totalValue,
  currentValue,
  loaderColor = "black",
}: {
  totalValue: number;
  currentValue: number;
  loaderColor?: string;
}) {
  const [width, setWidth] = useState(`w-${currentValue}/${totalValue}`);
  const [color, setColor] = useState(`bg-${loaderColor}`);
  useEffect(() => {
    setWidth(`w-${currentValue}/${totalValue}`);
  }, [totalValue, currentValue]);
  useEffect(() => {
    setColor(`bg-${loaderColor}`);
  }, [loaderColor]);
  return (
    <div className="bg-white w-full h-6 rounded-md">
      <div
        className={`h-full rounded-l-md ${width} ${color}`}
      ></div>
    </div>
  );
}

//w-${currentValue}/${totalValue}
