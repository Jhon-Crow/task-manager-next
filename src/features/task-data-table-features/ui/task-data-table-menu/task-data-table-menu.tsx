"use client";

import { deleteTaskById, useTasksListActions } from "@/entities/task";
import { TypeTask, TypeTaskColumns } from "@/entities/task/public-types";
import { Routes } from "@/shared/consts/paths";
import {
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback } from "react";
import { toast } from "sonner";

export const taskDataTableMenuInColumns: ColumnDef<TypeTaskColumns> = {
  id: "actions",
  cell: ({ row }) => {
    const task = row.original;

    return <ActionsContent task={task} />;
  },
};

function ActionsContent({ task }: { task: TypeTask }) {
  const session = useSession();
  const isCanUpdate =
    session.data?.user.role === "ADMIN" ||
    session.data?.user.id === task.author.id;

  const { removeTaskById, setPendingTaskById } = useTasksListActions();

  const deleteTaskHandler = useCallback(async () => {
    setPendingTaskById({ id: task.id, pending: true });
    const response = await deleteTaskById(task.id);
    if (!response.success) {
      setPendingTaskById({ id: task.id, pending: false });
      toast.error(
        <>
          Не удалось удалить задачу: <br />
          <span className="font-bold block text-right">{task.title}</span>
          Причина: <span className="italic">{response.error.message}</span>
        </>
      );
      return;
    }
    removeTaskById(task.id);
    toast(`Задача ${task.title} удалена!`);
  }, [removeTaskById, setPendingTaskById, task.id, task.title]);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={Routes.TASK(task.id)}>Открыть</Link>
          </DropdownMenuItem>
          {isCanUpdate && (
            <>
              <DropdownMenuItem asChild>
                <Link href={Routes.TASK_UPDATE(task.id)}>Обновить</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={deleteTaskHandler}
                    className={buttonVariants({
                      variant: "destructive",
                      className: "w-full",
                    })}
                  >
                    Удалить
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
