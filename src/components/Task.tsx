import { useState } from "react";
import TaskButtons from "./TaskButtons";
import type { Task } from "@/lib/api/useTasks";

export default function Task({
  key,
  task,
  onDelete,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}: {
  key: number;
  task: Task;
  onDelete: (t: string) => void;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
}) {
  const [isCompleted, setIsCompleted] = useState(task.is_complete);
  const hasRepetitions = true;
  function handleEditTask() {}
  function handleDeleteTask() {
    onDelete(task.title);
  }
  function handleCompleteTask() {
    setIsCompleted(true);
  }

  return (
    <div
      className="m-2 py-2 rounded-md bg-vibe-green grid h-40 relative shadow-md shadow-gray-500 content-start"
      draggable
      onDragStart={() => handleDragStart(key)}
      onDragEnter={() => handleDragEnter(key)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row justify-between w-full">
        <span className="text-left text-2xl ml-2 font-semibold">
          {task.title}
        </span>
        <span className="text-left m-2 text-sm bg-button rounded-md p-1 h-fit">
          {taskTypes[task.type]}
        </span>
      </div>
      <p className="text-left m-2 truncate ">{task.description}</p>
      <div className="flex flex-row">
        {/* {hasRepetitions && (
          <div className="m-2 absolute top-8/12 bg-white rounded-md w-50">
            <div className="h-8 w-30 bg-gray-600 rounded-md"></div>
          </div>
        )} */}
        <TaskButtons
          className="absolute top-8/12 left-15/20 md:left-12/20 xl:left-11/20 2xl:left-12/20"
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
          isDisabled={task.is_complete}
        />
      </div>
    </div>
  );
}
const taskTypes: Record<number, string> = {
  1: "Unico",
  2: "Diario",
  3: "Semanal",
  4: "Mensual",
  5: "Anual",
};
