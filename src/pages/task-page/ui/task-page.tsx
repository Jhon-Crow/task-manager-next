import {getTaskById, TaskPageCard} from "@/entities/task";
import { Routes } from "@/shared/routes/paths";
import { Task } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";
import { checkAuth } from "@/entities/auth";
import {TaskAdminReviewRequest, TaskWorkerReviewRequest} from "@/features/task-review-request";
import {ReviewMessagesList} from "@/entities/review";


export default async function TaskPage({
                                         params,
                                       }: {
  params: { id: Task["id"] };
}) {
  const session = await checkAuth();
    const id = (await params).id;
  const taskData = await getTaskById(id);

  if (!taskData.success) return <div>Не успешно</div>;
  if (!taskData.data) redirect(Routes.TASK(params.id) + "/not-found");
  const task = taskData.data;

  const isAdminUpdatePermission =
      task.completeRequest &&
      (session.user.role === "ADMIN" ||
          (session.user.role === "MANAGER" &&
              session.user.id === task.author.id));

  const isWorkerTask =
      !task.completeRequest &&
      session.user.role === "WORKER" &&
      task.workers?.some(worker => worker.id === session.user.id);

  return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        {isAdminUpdatePermission ? (
            <TaskAdminReviewRequest task={task} userId={session.user.id}/>
        ) : isWorkerTask ? (
            <TaskWorkerReviewRequest task={task} userId={session.user.id} />
        ) : (
            <TaskPageCard task={task} />
        )}


        {task.reviews.length ? <ReviewMessagesList
              sessionUser={session.user}
              reviews={task.reviews}
          /> : null}
      </div>
  );
}