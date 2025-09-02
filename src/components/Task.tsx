import { useState } from "react";
import TaskButtons from "./TaskButtons";
import { useEditTask, type task } from "@/lib/api/useTasks";
import TaskForm from "./TaskForm";
import Modal from "./Modal";

export default function Task({
  key,
  task,
  className,
  onDelete,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}: {
  key: number;
  task: task;
  className?:string;
  onDelete: (id: number) => void;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
}) {
  const [label, setLabel] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [type, setType] = useState(task.type || 1);
  const [isCompleted, setIsCompleted] = useState(task.is_complete);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { mutate: editTask } = useEditTask();
  const hasRepetitions = true;
  function handleEditTask() {
    setShowModalEdit((p) => !p);
  }
  function handleDeleteButtonClick() {    
    setShowModalDelete(true);
  }

  function handleDeleteTask(){
    onDelete(task.id);
    setShowModalDelete(false);
  }

  function handleCompleteTask() {
    setIsCompleted(true);
    editTask({
      description,
      type,
      is_complete: true,
      id: task.id,
      title: label,
    });
  }

  function onCancelEdit() {
    setShowModalEdit((p) => !p);
  }

  function onEdit(task: task) {
    setShowModalEdit((p) => !p);
    setLabel(task.title);
    setDescription(task.description);
    setType(task.type);
    editTask(task);
  }

  return (
    <div
      className={`m-2 py-2 transition delay-50 duration-80 ease-in-out grid h-40 relative border border-gray-400 shadow-gray-500 content-start hover:-translate-y-1 ${className}`}
      draggable
      onDragStart={() => handleDragStart(key)}
      onDragEnter={() => handleDragEnter(key)}
      onDragEnd={handleDragEnd}
    >
      {showModalEdit ? (
        <Modal onClose={onCancelEdit}>
          <TaskForm
            onCancel={() => setShowModalEdit((p) => !p)}
            onChangeCategory={() => {}}
            onSave={onEdit}
            key={1}
            taskLabel={label}
            taskDescription={description}
            taskType={type}
            taskId={task.id}
            mode="Edit"
          />
        </Modal>
      ) : (
        ""
      )}
      {showModalDelete ? (
        <Modal onClose={()=>setShowModalDelete(false)}>
          <div className="rounded-md bg-vibe-green p-2 font-semibold">
            <p>Confirm delete task: </p>
            <p>{task.title}?</p>            
            <button onClick={()=>setShowModalDelete(false)} className="bg-button hover:bg-button-shade p-2 m-2 rounded-md">cancel</button>
            <button onClick={handleDeleteTask} className="bg-button hover:bg-button-shade p-2 m-2 rounded-md">confirm</button>
          </div>
        </Modal>
      ) : (
        ""
      )}
      <div className="flex flex-row justify-between w-full">
        <span className="text-left text-2xl ml-2 font-semibold">{label}</span>
        <span className="text-left m-2 text-sm bg-button rounded-md p-1 h-fit">
          {taskTypes[type]}
        </span>
      </div>
      <p className="text-left m-2 truncate ">{description}</p>
      <div className="flex flex-row">
        {/* {hasRepetitions && (
          <div className="m-2 absolute top-8/12 bg-white rounded-md w-50">
            <div className="h-8 w-30 bg-gray-600 rounded-md"></div>
          </div>
        )} */}
        <TaskButtons
          className="absolute top-8/12 right-1/30"
          onEdit={handleEditTask}
          onDelete={handleDeleteButtonClick}
          onComplete={handleCompleteTask}
          isDisabled={isCompleted}
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
