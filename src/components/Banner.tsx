import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Banner({
  title,
  className,
  onClickButton,
}: {
  title: string;
  className?: string;
  onClickButton: () => void;
}) {
  const [isShow, setIsShow] = useState(true);
  function handkeClick() {
    setIsShow((p) => !p);
    onClickButton();
  }

  return (
    <div
      className={`flex m-2 rounded-md h-f p-2 text-2xl font-semibold justify-between ${className}`}
    >
      {title}
      <button
        className="rounded-md bg-button hover:bg-button-shade p-2"
        onClick={handkeClick}
      >
        {isShow ? (
          <span className="flex flex-row gap-2 items-center">
            Hide <FaAngleUp className="align-bottom" />
          </span>
        ) : (
          <span className="flex flex-row gap-2 items-center">
            Show <FaAngleDown className="align-bottom" />
          </span>
        )}
      </button>
    </div>
  );
}
