"use client";

import { deleteTaskById } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import { useServerAction } from "@/shared/hooks/useServerAction";
import { cn } from "@/shared/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Dialog,
} from "@/shared/ui";
import { ReactNode, useTransition } from "react";
import { DeleteTaskDialogTrigger } from "../delete-task-dialog/delete-task-dialog-trigger";
import { DeleteTaskDialogContent } from "../delete-task-dialog/delete-task-dialog-content";
import { OpenTaskLink } from "../links/open-task-link";
import { UpdateTaskLink } from "../links/update-task-link";
import { Session } from "next-auth";

export const TaskContextMenu = ({
  children,
  id,
  title,
  session,
  authorId,
}: {
  children: ReactNode;
  id: TypeTask["id"];
  authorId: TypeTask["authorId"];
  title: TypeTask["title"];
  session: Session;
}) => {
  const [pending, startTransition] = useTransition();
  const handledDelete = useServerAction(deleteTaskById);
  const isAdmin = session.user.role === "ADMIN";
  const isAuthor = session.user.id === authorId;
  const handleDelete = () => {
    startTransition(async () => {
      await handledDelete(id);
    });
  };

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger
          disabled={pending}
          asChild
          className={cn("block", { "opacity-30": pending })}
        >
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <OpenTaskLink id={id} />
          {(isAdmin || isAuthor) && (
            <>
              <UpdateTaskLink id={id} />
              <ContextMenuSeparator />
              <DeleteTaskDialogTrigger />
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>
      <DeleteTaskDialogContent deleteHandler={handleDelete} title={title} />
    </Dialog>
  );
};
