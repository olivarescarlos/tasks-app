import { useState } from "react";
import TaskForm from "./TaskForm";
import { task } from "@/lib/api/useTasks";
export default function NewTask({
  onAddTask,
}: {
  onAddTask: (label: string, description: string, type: number) => void;
}) {
  const [taskLabel, setTaskLabel] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [type, setType] = useState(1);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  function handleCancel() {
    setIsAddTaskOpen((p) => !p);
    setTaskLabel("");
    setTaskDescription("");
  }
  function handleSave(task:task) {
    setIsAddTaskOpen((p) => !p);
    onAddTask(task.title, task.description, task.type);
    setTaskLabel("");
    setTaskDescription("");
  }

  function handleOpen() {
    setIsAddTaskOpen((p) => !p);
  }

  function handleChange(label: string) {
    setTaskLabel(label);
  }

  function handleChangeDescription(description: string) {
    setTaskDescription(description);
  }

  function handleChangeCategory(category: number) {
    setType(category);
  }

  return (
    <>
      {isAddTaskOpen ? (
        <div>
          <TaskForm
            onCancel={handleCancel}
            onSave={handleSave}
            onChangeDescription={handleChangeDescription}
            onChangeLabel={handleChange}
            onChangeCategory={handleChangeCategory}
          />
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
