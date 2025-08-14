import { useState } from "react";
import CustomButton from "./CustomButton";
import Modal from "./Modal";
import Login from "./Login";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  function handleClick() {
    setShowModal(true);
  }
  return (
    <div className="fixed p-4 w-full shadow-gray-500 shadow-lg bg-vibe-green mt-0 top-0 justify-between flex flex-row gap-2 z-20">
      <span className="text-4xl font-semibold">{"Hello world :)"}</span>
      <CustomButton
        onClick={handleClick}
        tooltip="Log In"
        label="Log In"
        className="p-2 rounded-md"
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Login onCancel={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}
