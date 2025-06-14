import {buttonVariants, Dialog, DialogTrigger} from "@/shared/ui";
import {
    DeleteTasksDialogContent
} from "@/features/task-data-table-features/ui/task-delete-many-selected/dialog-tesks-delete-content";
import {Trash2} from "lucide-react";
import {useSelector} from "react-redux";

export const TaskDeleteManyDialog = () => {
    const selectedIds = useSelector(
        (state: RootState) => state.tasksListSlice.selectedTasksToRemove
    );
    // todo переместить в card actions
    return (
        <Dialog>
            <DeleteTasksDialogContent/>
            {selectedIds.length ? <DialogTrigger
                className={buttonVariants({
                    variant: "destructive",
                    className: "w-fit",
                })}
            >
                <Trash2/>
            </DialogTrigger> : null}
        </Dialog>
    );
};