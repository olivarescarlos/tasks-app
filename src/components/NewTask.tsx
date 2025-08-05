import { useState } from "react";
export default function NewTask({
  onAddTask,
}: {
  onAddTask: (label: string, description: string,type:number) => void;
}) {
  const [taskLabel, setTaskLabel] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [type,setType] = useState(1)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  
  function handleCancel() {
    setIsAddTaskOpen((p) => !p);
    setTaskLabel("");
    setTaskDescription("");
  }
  function handleSave() {
    setIsAddTaskOpen((p) => !p);
    onAddTask(taskLabel, taskDescription,type);
    setTaskLabel("");
    setTaskDescription("");
  }
  function handleOpen() {
    setIsAddTaskOpen((p) => !p);
  }
  function handleChange(event: 	React.ChangeEvent<HTMLInputElement>) {
    setTaskLabel(event.target.value);
  }
  function handleChangeDescription(event: 	React.ChangeEvent<HTMLInputElement>) {
    setTaskDescription(event.target.value);
  }
  function handleChangeCategory(event:React.ChangeEvent<HTMLSelectElement>){    
    setType(Number(event.target.value))
  }
  return (
    <>
      {isAddTaskOpen ? (
        <div className="rounded-md bg-vibe-green m-2 p-2">
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
            <select className="m-2 p-2 rounded-md bg-white" onChange={(e)=>handleChangeCategory(e)}>
              <option value={1}>Unico</option>
              <option value={2}>Diario</option>
              <option value={3}>Semanal</option>
              <option value={4}>Mensual</option>
              <option value={5}>Anual</option>
            </select>
          </div>
          <div className="mt-2 flex justify-between">
            <button
              className="bg-button rounded-md mx-2 px-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-button rounded-md mx-2 px-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <button
          className="text-left m-2 p-4 bg-vibe-green rounded-md"
          onClick={handleOpen}
        >
          Add task
        </button>
      )}
    </>
  );
}
