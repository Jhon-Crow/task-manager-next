import { Textarea } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { TaskPageCard } from "@/entities/task";
import { setCompleteRequestToTask } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import {TypeUser} from "@/entities/user/model/types/user";

interface WorkerTaskActionsProps {
    task: TypeTask;
    userId: TypeUser['id'];
}

export const TaskWorkerReviewRequest = ({ task, userId }: WorkerTaskActionsProps) => (
    <div className="space-y-8 flex flex-col max-w-fit">
        <TaskPageCard task={task} />
        <form
            className="space-y-2 min-w-42 flex flex-col"
            action={async (formData) => {
                "use server";
                await setCompleteRequestToTask(task.id, formData.get("review"), userId);
            }}
        >
            <Textarea
                name="review" placeholder="Добавить ревью" />
            <Button className="ml-auto" type="submit">
                Отправить на проверку
            </Button>
        </form>
    </div>
);