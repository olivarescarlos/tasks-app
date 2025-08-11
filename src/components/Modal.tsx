import { useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  onClose,
}: {
  children?: React.ReactNode;
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
      <div className="fixed left-1/2 top-1/2 -translate-1/2 z-30 ">
        {children}
      </div>

      {/* <div className="fixed left-1/2 top-1/2 -translate-1/2 z-30 bg-background rounded-md m-2 p-2">
        <div className="flex justify-between">
          <label className="m-2 p-2 font-semibold">Titulo:</label>
          <input
            id="taskLabel"
            className="m-2 p-2 rounded-md bg-white"
            type="text"
            value={taskLabel}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex justify-between">
          <label className="m-2 -p2 font-semibold">Descripción:</label>
          <input
            id="taskDescription"
            className="m-2 p-2 rounded-md bg-white"
            type="text"
            value={taskDescription}
            onChange={(e) => handleChangeDescription(e)}
          />
        </div>
        <div className="flex justify-between">
          <label className="m-2 -p2 font-semibold">Tipo:</label>
          <select
            className="m-2 p-2 rounded-md bg-white"
            onChange={(e) => handleChangeCategory(e)}
          >
            <option value={1}>Unico</option>
            <option value={2}>Diario</option>
            <option value={3}>Semanal</option>
            <option value={4}>Mensual</option>
            <option value={5}>Anual</option>
          </select>
        </div>
        <div className="mt-2 flex justify-between">
          <button
            className="bg-button hover:bg-button-shade rounded-md mx-2 px-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-button hover:bg-button-shade rounded-md mx-2 px-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div> */}
    </>,
    document.getElementById("modal")!
  );
}
