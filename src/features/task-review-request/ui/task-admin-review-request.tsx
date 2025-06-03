import {Button, Dialog, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Textarea} from "@/shared/ui";
import {getTaskById, setCompletedToTask, TaskPageCard} from "@/entities/task";
import {Ban, Check} from "lucide-react";
import {TypeTask} from "@/entities/task/public-types";
import {prisma} from "@/shared/lib/db/prisma";

export const TaskAdminReviewRequest = ({ task }: { task: TypeTask }) => (
    <div className="space-y-8">
        <div className="flex -space-x-2 h-full max-w-[750px] justify-start">
            <RejectButton taskId={task.id} userId={task.author.id} />
            <TaskPageCard
                task={task}
                className="flex-1 peer-hover/left:translate-x-[35px] peer-hover/right:-translate-x-[45px] flex-grow z-10 transition-transform duration-300 order-2"
            />
            <ApproveButton taskId={task.id} />
        </div>
    </div>
);

const RejectDialogue = ({ taskId, userId }: { taskId: string, userId: string }) => {

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        type="submit"
                        className="min-h-full self-stretch rounded-r-none opacity-50 hover:z-20 group-hover:opacity-100 group-hover:px-8 group-hover:translate-x-[35px]"
                        variant="destructive"
                    >
                        <Ban className="group-hover:scale-200 transition-transform" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-2xl space-y-2 ml-6.5">
                    <form
                        className="space-y-2 min-w-42 flex flex-col"
                        action={async (formData) => {
                            "use server";
                            await prisma.review.create({
                                data: {
                                    text: formData.get("review"),
                                    userId,
                                    taskId,
                                },
                            });
                            await setCompletedToTask(taskId, undefined);
                            console.log(await getTaskById(taskId));
                        }}
                    >
                        <Textarea className='min-h-30' name="review" placeholder="Добавить ревью" />
                        <Button type="submit">
                            Отправить на проверку
                        </Button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
}

const RejectButton = ({ taskId, userId }: { taskId: string, userId: string }) => (
    <div className="group peer/left w-auto h-auto hover:z-20 order-1">
        <RejectDialogue taskId={taskId} userId={userId}/>
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