import { useState, useRef, useEffect } from "react";
import NewTask from "@/components/NewTask";
import { useTasks, useAddTask } from "@/lib/api/useTasks";
import TaskSection from "@/components/TaskSection";
import TaskSkeleton from "@/components/TaskSkeleton";
import TaskSectionSkeleton from "@/components/TaskSectionSkeleton";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
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
  return (
    <>
      <div id="modal" />
      <Header/>
      {isLoading ? (
        ""
      ) : (
        <div className="fixed bottom-5 right-5 lg:bottom-20 lg:right-20 z-10">
          <NewTask onAddTask={handleSaveTask}></NewTask>
        </div>
      )}
      <div>
        {isLoading ? (
          <div className="max-w-490 m-auto">
            <TaskSectionSkeleton />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 flex-wrap elements-left">
              {Array.from({ length: 10 }, (_, i) => (
                <TaskSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : error ? (
          <div>error</div>
        ) : (
          <div className="max-w-490 m-auto">
            <TaskSection
              title="Incomplete tasks"
              tasks={incompleteTasks}
              className=""
            />
            <LoadingBar totalValue={10} currentValue={2} />
            <TaskSection
              title="Completed tasks"
              tasks={completedTasks}
              className="bg-vibe-green hover:bg-vibe-green-shade"
            />
          </div>
        )}
      </div>
    </>
  );
}
