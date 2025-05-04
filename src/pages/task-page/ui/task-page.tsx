import { getTaskById, TaskPageCard } from "@/entities/task";
import { Task } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: Task["id"] }>;
}) {
  const id = (await params).id;
  const task = await getTaskById(id);
  if (!task) {
    redirect("./not-found");
  }
  if (!(task instanceof Object)) {
    return <div>{task}</div>;
  }
  return <TaskPageCard task={task} />;
}
