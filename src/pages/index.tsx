import { useState, useRef, useEffect } from "react";
import NewTask from "@/components/NewTask";
import { useTasks, useAddTask } from "@/lib/api/useTasks";
import TaskSection from "@/components/TaskSection";
import Modal from "@/components/Modal";
import Task from "@/components/Task";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  const message = "Hello world! :)";
  const { data, error, isLoading } = useTasks();
  const { mutate: addTask } = useAddTask();
  const [tasks, setTasks] = useState(data);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setTasks(data);
  }, [data]);
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
  console.log("::::: completedTasks: ",completedTasks)
  return (
    <>
      <div id="modal" />
      <h1 className="font-sans font-semibold border-solid border rounded-md border-black p-2 text-left">
        {message}
      </h1>
      <div className="flex flex-row">
        <NewTask onAddTask={handleSaveTask}></NewTask>
        <button onClick={() => setShowModal((p) => !p)}>open modal</button>
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
