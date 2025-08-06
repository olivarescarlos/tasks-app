import { useState, useRef, useEffect } from "react";
import NewTask from "@/components/NewTask";
import Task from "@/components/Task";
import Banner from "@/components/Banner";
import { useTasks, useAddTask, useDeleteTask } from "@/lib/api/useTasks";
import TaskSection from "@/components/TaskSection";

export default function Home() {
  const message = "Hello world! :)";
  const { data, error, isLoading } = useTasks();
  const { mutate: addTask } = useAddTask();
  const [tasks, setTasks] = useState(data);
  useEffect(() => {
    setTasks(data);
  }, [data]);
  /* console.log("::::: tasks: ", data); */
  function handleSaveTask(label: string, description: string, type: number) {
    const newTask = {
      id: 0,
      description,
      is_complete: false,
      title: label,
      type,
    };
    setTasks((p) => [...(p ?? []), newTask]);

    addTask(newTask);
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
      <div>
        {isLoading ? (
          <div>loading...</div>
        ) : error ? (
          <div>error</div>
        ) : (
          <>
            <TaskSection title="Incomplete tasks" tasks={incompleteTasks} />
            <TaskSection title="Completed tasks" tasks={completedTasks} />
          </>
        )}
      </div>
    </>
  );
}
