import {
  getTaskById,
  setCompletedToTask,
  setCompleteRequestToTask,
  TaskPageCard,
} from "@/entities/task";
import { Routes } from "@/shared/routes/paths";
import { Task } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";
import { Button, Textarea } from "@/shared/ui";
import { Ban, Check } from "lucide-react";
import { checkAuth } from "@/entities/auth";
import { TypeTask } from "@/entities/task/public-types";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: Task["id"] }>;
}) {
  const session = await checkAuth();
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

  const isHavePermissionToUpdateCompleted =
    task.completeRequest &&
    (session.user.role === "ADMIN" ||
      (session.user.role === "MANAGER" && session.user.id === task.author.id));

  if (isHavePermissionToUpdateCompleted) {
    return <TaskPageForAdministration task={task} />;
  }

  const isWorkerTask =
    !task.completeRequest &&
    session.user.role === "WORKER" &&
    task.workers?.some((worker) => worker.id === session.user.id);

  if (isWorkerTask) {
    return (
      <div className="space-y-8 flex flex-col">
        <TaskPageCard task={task} />
        <form
          className="space-y-8 min-w-42 flex flex-col"
          action={async (formData) => {
            "use server";

            await setCompleteRequestToTask(
              task.id,
              formData.get("review"),
              session.user.id
            );
          }}
        >
          <Textarea name={"review"} placeholder="Добавить ревью" />
          <Button className="ml-auto" type="submit">
            Отправить на проверку
          </Button>
        </form>
      </div>
    );
  }

  return <TaskPageCard task={task} />;
}

const TaskPageForAdministration = ({ task }: { task: TypeTask }) => {
  return (
    <div className="space-y-8">
      <div className="flex -space-x-2 h-full max-w-[750px] justify-start">
        <div className="group peer/left w-auto h-auto hover:z-20 order-1">
          <form
            action={async () => {
              "use server";

              await setCompletedToTask(task.id, undefined);
            }}
          >
            <Button
              type="submit"
              className="min-h-full self-stretch rounded-r-none opacity-50 hover:z-20 group-hover:opacity-100 group-hover:px-8 group-hover:translate-x-[35px]"
              variant={"destructive"}
            >
              <Ban className="group-hover:scale-200 transition-transform" />
            </Button>
          </form>
        </div>

        <TaskPageCard
          task={task}
          className="flex-1 peer-hover/left:translate-x-[35px] peer-hover/right:-translate-x-[45px] flex-grow z-10 transition-transform duration-300 order-2"
        />
        <div className="group peer/right min-w-full h-auto hover:z-20 order-3">
          <form
            action={async () => {
              "use server";

              await setCompletedToTask(task.id, true);
            }}
          >
            <Button
              type="submit"
              className="min-h-full group-hover:opacity-100 block self-stretch rounded-l-none opacity-50 group-hover:px-8 group-hover:-translate-x-[45px]"
            >
              <Check className="group-hover:scale-200 transition-transform" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
