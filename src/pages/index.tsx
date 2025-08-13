import { useState, useRef, useEffect } from "react";
import NewTask from "@/components/NewTask";
import { useTasks, useAddTask } from "@/lib/api/useTasks";
import TaskSection from "@/components/TaskSection";
import TaskSkeleton from "@/components/TaskSkeleton";
import TaskSectionSkeleton from "@/components/TaskSectionSkeleton";

export default function Home() {
  const message = "Hello world! :)";
  const { data, error, isLoading } = useTasks();
  const { mutate: addTask } = useAddTask();
  const [tasks, setTasks] = useState(data);
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
  console.log("::::: completedTasks: ", completedTasks);
  return (
    <>
      <div id="modal" />
      <h1
        className="font-sans font-semibold border-solid border rounded-md 
      border-black p-2 text-left z-50 bg-gradient-to-r from-vibe-green to-vibe-green-shade translate-x-1"
      >
        {message}
      </h1>
      {/* <div className="fixed bottom-20 right-20 border-2 border-black bg-red-500 m-2 p-2 rounded-md">
        floating
      </div> */}
      {isLoading ? (
        ""
      ) : (
        <div className="fixed bottom-20 right-20">
          <NewTask onAddTask={handleSaveTask}></NewTask>
        </div>
      )}

      <div>
        {isLoading ? (
          <>
            <TaskSectionSkeleton />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 flex-wrap elements-left">
              {Array.from({ length: 10 }, (_, i) => (
                <TaskSkeleton key={i} />
              ))}
            </div>
          </>
        ) : error ? (
          <div>error</div>
        ) : (
          <>
            <TaskSection
              title="Incomplete tasks"
              tasks={incompleteTasks}
              className="bg-vibe-green hover:bg-vibe-green-shade"
            />
            <TaskSection
              title="Completed tasks"
              tasks={completedTasks}
              className="bg-vibe-green hover:bg-vibe-green-shade"
            />
          </>
        )}
      </div>
    </>
  );
}
