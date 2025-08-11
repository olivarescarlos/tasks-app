import { useState } from "react";
import { task } from "@/lib/api/useTasks";

export default function TaskForm({
  taskLabel,
  taskDescription,
  taskType,
  taskId,
  onChangeLabel,
  onChangeDescription,
  onChangeCategory,
  onSave,
  onCancel,
}: {
  taskLabel?: string;
  taskDescription?: string;
  taskType?: number;
  taskId?:number;
  onChangeLabel?: (label: string) => void;
  onChangeDescription?: (description: string) => void;
  onChangeCategory?: (category: number) => void;
  onSave: (task: task) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(taskLabel || "");
  const [description, setDescription] = useState(taskDescription || "");
  const [type, setType] = useState(taskType || 1);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChangeLabel?.(event.target.value);
    setLabel(event.target.value);
  }
  function handleChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
    onChangeDescription?.(event.target.value);
    setDescription(event.target.value);
  }
  function handleChangeCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    onChangeCategory?.(Number(event.target.value));
    setType(Number(event.target.value));
  }

  function onCancelForm() {
    setLabel("");
    setDescription("");
    setType(1);
    onCancel();
  }

  function handleSave() {
    onSave({
      description: description,
      id: taskId || 0,
      is_complete: false,
      title: label,
      type: type,
    });
  }
  return (
    <div className="rounded-md bg-vibe-green hover:bg-vibe-green-shade m-2 p-2">
      <div className="flex justify-between rounded-md">
        <label className="m-2 p-2 font-semibold">Titulo:</label>
        <input
          id="taskLabel"
          className="m-2 p-2 rounded-md bg-white"
          type="text"
          value={label}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex justify-between">
        <label className="m-2 -p2 font-semibold">Descripción:</label>
        <input
          id="taskDescription"
          className="m-2 p-2 rounded-md bg-white"
          type="text"
          value={description}
          onChange={(e) => handleChangeDescription(e)}
        />
      </div>
      <div className="flex justify-between">
        <label className="m-2 -p2 font-semibold">Tipo:</label>
        <select
          className="m-2 p-2 rounded-md bg-white"
          value={taskType}
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
          onClick={onCancelForm}
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
    </div>
  );
}
