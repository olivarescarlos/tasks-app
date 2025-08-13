import { useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  onClose,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  onClose: () => void;
}) {
  function onClickBackdrop() {
    onClose();
  }

  return createPortal(
    <>
      <div
        className="bg-black opacity-50 w-full h-full fixed top-0 left-0 z-20"
        onClick={onClickBackdrop}
      ></div>
      <div className="fixed left-1/2 top-1/2 -translate-1/2 z-30">
        <div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  );
}
