import { task } from "@/lib/api/useTasks";
import Task from "./Task";
import Banner from "./Banner";
import { useState, useRef, useEffect } from "react";
import { useDeleteTask } from "@/lib/api/useTasks";

export default function TaskSection({
  tasks,
  title,
  className
}: {
  tasks?: task[];
  title?: string;
  className?:string;
}) {
  const [isShowTasks, setIsShowTasks] = useState(true);
  const [taskList, setTaskList] = useState(tasks);
  const { mutate: deleteTaskMutation } = useDeleteTask();
  const dragItem = useRef(0);
  const dragOverItem = useRef(0);
  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  function deleteTask(taskId: number) {
    deleteTaskMutation(taskId);
    setTaskList((p) => p?.filter((task) => task.id !== taskId));
  }

  function dragStart(position: number) {
    dragItem.current = position;
  }

  function dragEnter(position: number) {
    dragOverItem.current = position;
  }

  function drop() {
    const tasksList = [...(tasks ?? [])];
    const dragItemContent = tasksList[dragItem.current];
    tasksList.splice(dragItem.current, 1);
    tasksList.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = 0;
    dragOverItem.current = 0;
    setTaskList(tasksList);
  }
  function handleHideSection(){
    setIsShowTasks((p)=> !p)
  }
  return (
    <>
      <Banner title={title || ""} onClickButton={handleHideSection} className={className}/>
      {isShowTasks && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 flex-wrap elements-left">
          {taskList?.map((task, index) => (
            <Task
              key={index}
              task={task}
              className={className}
              onDelete={deleteTask}
              handleDragStart={() => dragStart(index)}
              handleDragEnter={() => dragEnter(index)}
              handleDragEnd={drop}
            />
          ))}
        </div>
      )}
    </>
  );
}
