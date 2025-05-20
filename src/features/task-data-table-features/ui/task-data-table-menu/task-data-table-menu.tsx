"use client";

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
