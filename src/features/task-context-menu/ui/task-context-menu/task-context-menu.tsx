import { checkAuth } from "@/entities/auth";
import { TypeTask } from "@/entities/task/public-types";
import { DeleteTaskBtnClick } from "@/features/delete-task";
import DeleteTaskForm from "@/features/delete-task/ui/delete-task-form";
import { Routes } from "@/shared/consts/paths";
import { Role } from "@/shared/lib/db/generated";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/ui";
import Link from "next/link";
import { ReactNode } from "react";

export const TaskContextMenu = async ({
  children,
  id,
  type,
}: {
  children: ReactNode;
  id: TypeTask["id"];
  type: "form" | "onclick";
}) => {
  const { user } = await checkAuth();

  return (
    <ContextMenu>
      <ContextMenuTrigger className="block">{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <Link className="w-full h-full" href={Routes.TASK(id)}>
          <ContextMenuItem className="cursor-pointer">Открыть</ContextMenuItem>
        </Link>
        {user.role === Role["ADMIN"] && (
          <ContextMenuItem>
            {type === "form" ? (
              <DeleteTaskForm id={id} />
            ) : (
              <DeleteTaskBtnClick id={id} />
            )}
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
