import { useQuery, useMutation } from "@tanstack/react-query";

const fetchTasks = async () => {
  const res = await fetch("api/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export type Task = {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
  type:number;
};

export function useTasks() {
  return useQuery<Task[]>({ queryKey: ["tasks"], queryFn: fetchTasks });
}

const addTask = async (task: Task) => {
  console.log("::::: addTask")
  const res = await fetch("api/tasks", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ task }),
  });
  if (!res.ok) throw new Error("failed to add task");
  return res.json;
};
export function useAddTask() {
  console.log("::::: useAddTask")
  return useMutation({ mutationFn: addTask });
}
