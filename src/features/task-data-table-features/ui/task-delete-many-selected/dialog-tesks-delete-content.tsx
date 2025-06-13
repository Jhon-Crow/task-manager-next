import {useTasksListActions} from "@/entities/task";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import {memo, useCallback} from "react";
import {toast} from "sonner";
import {useSelector} from "react-redux";
import {deleteManyTasksByIds} from "@/entities/task/model/service/deleteManyTasksByIds/deleteManyTasksByIds";
import {TypeTask} from "@/entities/task/model/types/task";

export const DeleteTasksDialogContent = memo(function DeleteTaskDialogContent() {
  const selectedIds = useSelector(
      (state: RootState) => state.tasksListSlice.selectedTasksToRemove
  );

  const tasksEntities = useSelector(
      (state: RootState) => state.tasksListSlice.entities
  );

  const titles = selectedIds.map((id: TypeTask['id']) => tasksEntities[id]?.title).filter(Boolean);

  return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {titles.length > 1
                ? `Вы действительно хотите удалить ${titles.length} задач?`
                : "Вы действительно хотите удалить задачу?"}
            <br />
            {titles.length > 0 && titles.map((title: string, index: number) => (
                <span className="font-extrabold text-foreground/70 block max-w-md text-sm">
                    {1 + index + '. ' + title}
            </span>
            )
            )
            }
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>Действие нельзя будет отменить</DialogDescription>
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button variant={"outline"}>Отменить</Button>
          </DialogClose>
          <DeleteBtn />
        </DialogFooter>
      </DialogContent>
  );
});

const DeleteBtn = memo(function DeleteBtnInTaskActionsMenu() {
  const { removeSelectedTasks } = useTasksListActions();

  const selectedIds = useSelector(
      (state: RootState) => state.tasksListSlice.selectedTasksToRemove
  );

  const deleteTaskHandler = useCallback(async () => {
    try {
      const response = await deleteManyTasksByIds(selectedIds);

      if (!response.success) {
        toast.error(
            <ErrorMessage
                count={selectedIds.length}
                errorMessage={response.error?.message || "Неизвестная ошибка при удалении"}
            />
        );
        return;
      }

      removeSelectedTasks();
      toast.success(`Успешно удалено задач: ${selectedIds.length}`);
    } catch (error) {
      toast.error(
          <ErrorMessage
              count={selectedIds.length}
              errorMessage={(error as Error)?.message || "Неизвестная ошибка"}
          />
      );
    }
  }, [selectedIds, removeSelectedTasks]);

  return (
      <Button variant={"destructive"} onClick={deleteTaskHandler} asChild>
        <DialogClose>Удалить</DialogClose>
      </Button>
  );
});

const ErrorMessage = memo(function ErrorMessageInDeleteTaskItem({
                                                                  count,
                                                                  errorMessage,
                                                                }: {
  count: number;
  errorMessage: string;
}) {
  return (
      <div>
        Не удалось удалить {count > 1 ? `${count} задач` : "задачу"}<br />
        Причина: <span className="italic">{errorMessage}</span>
      </div>
  );
});