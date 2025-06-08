import { getTaskById, TaskPageCard } from "@/entities/task";
import { Routes } from "@/shared/routes/paths";
import { Task } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";
import { checkAuth } from "@/entities/auth";
import {
  TaskReviewPermission,
  TaskWorkerReviewRequest,
} from "@/features/task-review-request";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: Task["id"] }>;
}) {
  const session = await checkAuth();
  const id = (await params).id;
  const taskData = await getTaskById(id);

  if (!taskData.success) return <div>Не успешно</div>;
  if (!taskData.data) redirect(Routes.TASK(id) + "/not-found");
  const task = taskData.data;

  const isUpdatePermission =
    task.completeRequest &&
    (session.user.role === "ADMIN" ||
      (session.user.role === "MANAGER" && session.user.id === task.author.id));
  if (isUpdatePermission) {
    return <TaskReviewPermission task={task} sessionUser={session.user} />;
  }

  const isWorkerTask =
    !task.completeRequest &&
    session.user.role === "WORKER" &&
    task.workers?.some((worker) => worker.id === session.user.id);
  if (isWorkerTask) {
    return <TaskWorkerReviewRequest task={task} sessionUser={session.user} />;
  }
  return <TaskPageCard task={task} sessionUser={session.user} />;
}
