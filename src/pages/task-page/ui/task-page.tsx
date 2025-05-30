import { getTaskById, TaskPageCard } from "@/entities/task";
import { Routes } from "@/shared/routes/paths";
import { Task } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: Task["id"] }>;
}) {
  const id = (await params).id;
  const taskData = await getTaskById(id);
  if (!taskData.success) {
    //TODO
    return <div>Не успешно</div>;
  }

  if (!taskData.data) {
    redirect(Routes.TASK(id) + "/not-found");
  }
  const task = taskData.data;
  {
    return <TaskPageCard task={task} />;
  }
}
