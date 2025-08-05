import { supabase } from "@/pages/api/supabase";
import { NextApiRequest, NextApiResponse } from "next";

type Task = {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { error: string }>
) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("tasks").select("*");
    await supabase.from("tasks").insert;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    console.log("::::: entro al backend con metodo POST");
    const { task } = req.body;
    console.log("::::: request body: ", task);
    const { error } = await supabase.from("tasks").insert([
      {
        title: task.title,
        description: task.description,
        is_complete: task.is_complete,
        type: task.type,
      },
    ]);
    if (error) {
      console.log("execution returned an error: ", error.message);
      return res.status(500).json({ error: error.message });
    }
    return res.status(201);
  } else if (req.method === "DELETE") {
    console.log("::::: entro al backend con metodo DELETE");
    const { taskId } = req.body;
    console.log("::::: taskId: ",taskId)
    const response = await supabase.from("tasks").delete().eq("id", taskId);
    console.log("::::: delete response: ", response);
    return response;
  }
  return res.status(405).json({ error: "Method not allowed" });
}
