import { Textarea } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { TaskPageCard } from "@/entities/task";
import { setCompleteRequestToTask } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import { Session } from "next-auth";

interface WorkerTaskActionsProps {
  task: TypeTask;
  sessionUser: Session["user"];
}

export const TaskWorkerReviewRequest = ({
  task,
  sessionUser,
}: WorkerTaskActionsProps) => (
  <div className="space-y-8 flex flex-col max-w-fit">
    <TaskPageCard task={task} sessionUser={sessionUser} />
    <form
      className="space-y-2 min-w-42 flex flex-col"
      action={async (formData) => {
        "use server";
        await setCompleteRequestToTask(
          task.id,
          formData.get("review"),
          sessionUser.id
        );
      }}
    >
      <Textarea name="review" placeholder="Добавить ревью" />
      <Button className="ml-auto" type="submit">
        Отправить на проверку
      </Button>
    </form>
  </div>
);
