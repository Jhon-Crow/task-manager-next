import { TypeTask } from "@/entities/task/public-types";
import { Routes } from "@/shared/routes/paths";
import { Button, ContextMenuItem } from "@/shared/ui";
import Link from "next/link";
import { memo } from "react";

type UpdateTaskLinkProps = {
  id: TypeTask["id"];
};

export const UpdateTaskLink = memo(function UpdateTaskLink({
  id,
}: UpdateTaskLinkProps) {
  return (
    <ContextMenuItem asChild className="cursor-pointer text-center">
      <Button variant={"link"} asChild>
        <Link className="w-full h-full" href={Routes.TASK_UPDATE(id)}>
          Обновить
        </Link>
      </Button>
    </ContextMenuItem>
  );
});
