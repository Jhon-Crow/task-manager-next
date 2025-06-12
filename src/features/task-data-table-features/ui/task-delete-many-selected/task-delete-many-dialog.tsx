import {buttonVariants, Dialog, DialogTrigger} from "@/shared/ui";
import {
    DeleteTasksDialogContent
} from "@/features/task-data-table-features/ui/task-delete-many-selected/dialog-tesks-delete-content";
import {Trash2} from "lucide-react";

export const TaskDeleteManyDialog = () => {
    return (
        <Dialog>
            <DeleteTasksDialogContent/>
            <DialogTrigger
                className={buttonVariants({
                    variant: "destructive",
                    className: "w-fit",
                })}
            >
                <Trash2/>
            </DialogTrigger>
        </Dialog>
    );
};