import { Button } from "@/shared/ui";
import { TaskPageCard } from "@/entities/task";
import { setCompletedToTask } from "@/entities/task";
import { Ban, Check } from "lucide-react";
import { TypeTask } from "@/entities/task/public-types";

export const TaskAdminReviewRequest = ({ task }: { task: TypeTask }) => (
    <div className="space-y-8">
        <div className="flex -space-x-2 h-full max-w-[750px] justify-start">
            <RejectButton taskId={task.id} />
            <TaskPageCard
                task={task}
                className="flex-1 peer-hover/left:translate-x-[35px] peer-hover/right:-translate-x-[45px] flex-grow z-10 transition-transform duration-300 order-2"
            />
            <ApproveButton taskId={task.id} />
        </div>
    </div>
);

const RejectButton = ({ taskId }: { taskId: string }) => (
    <div className="group peer/left w-auto h-auto hover:z-20 order-1">
        <form
            action={async () => {
                "use server";
                await setCompletedToTask(taskId, undefined);
            }}
        >
            <Button
                type="submit"
                className="min-h-full self-stretch rounded-r-none opacity-50 hover:z-20 group-hover:opacity-100 group-hover:px-8 group-hover:translate-x-[35px]"
                variant="destructive"
            >
                <Ban className="group-hover:scale-200 transition-transform" />
            </Button>
        </form>
    </div>
);

const ApproveButton = ({ taskId }: { taskId: string }) => (
    <div className="group peer/right min-w-full h-auto hover:z-20 order-3">
        <form
            action={async () => {
                "use server";
                await setCompletedToTask(taskId, true);
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
);