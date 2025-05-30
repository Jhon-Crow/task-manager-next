import {
  useTasksListActions,
  deleteTaskById,
  useSelectTaskTitleInTaskListById,
} from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { title } from "process";
import { memo, useCallback } from "react";
import { toast } from "sonner";

type DeleteTaskDialogContentProps = {
  id: TypeTask["id"];
};

export const DeleteTaskDialogContent = memo(function DeleteTaskDialogContent({
  id,
}: DeleteTaskDialogContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Вы действительно хотите удалить задачу <br />
          <span className="font-extrabold text-foreground/70">{title}</span>?
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>Действие нельзя будет отменить</DialogDescription>
      <DialogFooter className="justify-between">
        <DialogClose asChild>
          <Button variant={"outline"}>Отменить</Button>
        </DialogClose>
        <DeleteBtn id={id} />
      </DialogFooter>
    </DialogContent>
  );
});

const DeleteBtn = memo(function DeleteBtnInTaskActionsMenu({
  id,
}: {
  id: TypeTask["id"];
}) {
  const { removeTaskById, setPendingTaskById } = useTasksListActions();
  const title = useSelectTaskTitleInTaskListById(id);

  const deleteTaskHandler = useCallback(async () => {
    setPendingTaskById({ id, pending: true });
    const response = await deleteTaskById(id);
    if (!response.success) {
      setPendingTaskById({ id, pending: false });
      toast.error(
        <ErrorMessage
          title={title || "Неопознанная задача"}
          errorMessage={response.error.message}
        />
      );
      return;
    }
    removeTaskById(id);
    toast(`Задача ${title} удалена!`);
  }, [id, removeTaskById, setPendingTaskById, title]);
  return (
    <Button variant={"destructive"} onClick={deleteTaskHandler} asChild>
      <DialogClose>Удалить</DialogClose>
    </Button>
  );
});

const ErrorMessage = memo(function ErrorMessageInDeleteTaskItem({
  title,
  errorMessage,
}: {
  title: TypeTask["title"];
  errorMessage: string;
}) {
  return (
    <>
      Не удалось удалить задачу: <br />
      <span className="font-bold block text-right">{title}</span>
      Причина: <span className="italic">{errorMessage}</span>
    </>
  );
});
