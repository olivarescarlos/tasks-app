import { useQuery, useMutation } from "@tanstack/react-query";

const fetchTasks = async () => {
  const res = await fetch("api/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export type task = {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
  type: number;
};

export function useTasks() {
  return useQuery<task[]>({ queryKey: ["tasks"], queryFn: fetchTasks });
}

const addTask = async (task: task) => {
  /* console.log("::::: addTask"); */
  const res = await fetch("api/tasks", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ task }),
  });
  if (!res.ok) throw new Error("failed to add task");
  return res.json;
};

const deleteTask = async (taskId: number) => {
  const res = await fetch("api/tasks", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ taskId }),
  });
};

const editTask = async (task: task) => {
  const res = await fetch("api/tasks", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ task }),
  });
};

export function useDeleteTask() {
  return useMutation({ mutationFn: deleteTask });
}

export function useAddTask() {
  return useMutation({ mutationFn: addTask });
}

export function useEditTask() {
  return useMutation({ mutationFn: editTask });
}
