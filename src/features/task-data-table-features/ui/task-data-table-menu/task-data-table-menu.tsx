"use client";

import { TypeTask, TypeTaskColumns } from "@/entities/task/public-types";
import { DropdownMenu } from "@/shared/ui";
import { Dialog } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { Trigger } from "./menu/trigger";
import { Content } from "./menu/content";
import { DeleteTaskDialogContent } from "./menu/dialog-content/dialog-task-dialog-content";

export const taskDataTableMenuInColumns: ColumnDef<TypeTaskColumns> = {
  id: "actions",
  cell: ({ row }) => {
    const task = row.original;

    return <ActionsDropdownMenu task={task} />;
  },
};

function ActionsDropdownMenu({ task }: { task: TypeTask }) {
  const session = useSession();
  const isCanUpdate =
    session.data?.user.role === "ADMIN" ||
    session.data?.user.id === task.author.id;

  return (
    <Dialog>
      <DropdownMenu>
        <Trigger id={task.id} />
        <Content isCanUpdate={isCanUpdate} id={task.id} />
      </DropdownMenu>
      <DeleteTaskDialogContent id={task.id} />
    </Dialog>
  );
}
