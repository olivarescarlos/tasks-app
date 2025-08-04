import { useState, useRef, useEffect } from "react";
import NewTask from "@/components/NewTask";
import Task from "@/components/Task";
import { useTasks, useAddTask } from "@/lib/api/useTasks";

export default function Home() {
  const message = "Hello world! :)";
  const { data, error, isLoading } = useTasks();
  const { mutate: addTask } = useAddTask();
  const [tasks, setTasks] = useState(data);
  const dragItem = useRef(0);
  const dragOverItem = useRef(0);
  useEffect(() => setTasks(data), [data]);

  function handleSaveTask(label: string, description: string) {
    const newTask = {
      id: 0,
      description,
      is_complete: false,
      title: label,
      type: 1,
    };
    setTasks((p) => [...(p ?? []), newTask]);

    addTask(newTask);
  }
  function deleteTask(deletedLabel: string) {
    setTasks((p) => p?.filter((task) => task.title !== deletedLabel));
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
    setTasks(tasksList);
  }

  const completedTasks = tasks?.filter((task) => task.is_complete === true);
  const incompleteTasks = tasks?.filter((task) => task.is_complete === false);
  return (
    <>
      <h1 className="font-sans font-semibold border-solid border rounded-md border-black p-2 text-left">
        {message}
      </h1>
      <div className="flex flex-row">
        <NewTask onAddTask={handleSaveTask}></NewTask>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 flex-wrap">
        {isLoading ? (
          <div>loading...</div>
        ) : error ? (
          <div>error</div>
        ) : (
          incompleteTasks?.map((task, index) => (
            <Task
              key={index}
              task={task}
              onDelete={deleteTask}
              handleDragStart={() => dragStart(index)}
              handleDragEnter={() => dragEnter(index)}
              handleDragEnd={drop}
            />
          ))
        )}
        
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 flex-wrap elements-left">
          <h3>Completed tasks</h3>
          {completedTasks?.map((task, index) => (
            <Task
              key={index}
              task={task}
              onDelete={deleteTask}
              handleDragStart={() => dragStart(index)}
              handleDragEnter={() => dragEnter(index)}
              handleDragEnd={drop}
            />
          ))}
        </div>
    </>
  );
}
