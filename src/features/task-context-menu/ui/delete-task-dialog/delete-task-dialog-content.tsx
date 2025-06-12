import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { DeleteBtn } from "../delete-btn/delete-btn";
import { TypeTask } from "@/entities/task/public-types";
import { memo } from "react";

type DeleteTaskDialogContentProps = {
  deleteHandler: () => void;
  title: TypeTask["title"];
};

export const DeleteTaskDialogContent = memo(async function DeleteTaskDialogContent({
  deleteHandler,
  title,
}: DeleteTaskDialogContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Вы действительно хотите удалить задачу <br />
          <span className="font-extrabold text-foreground/70">{title}</span>?
        {/*    todo НАДО УДАЛИТЬ ВИДИМО Это где? у нас точная копия этого компонента в ui/data-table-menu*/}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>Действие нельзя будет отменить</DialogDescription>
      <DialogFooter className="justify-between">
        <DialogClose>Отменить</DialogClose>
        <DeleteBtn onClick={deleteHandler} />
      </DialogFooter>
    </DialogContent>
  );
});
