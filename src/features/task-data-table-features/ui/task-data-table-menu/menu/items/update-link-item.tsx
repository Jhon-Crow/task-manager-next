import { TypeTask } from "@/entities/task/public-types";
import { Routes } from "@/shared/routes/paths";
import { DropdownMenuItem } from "@/shared/ui";
import Link from "next/link";
import { memo } from "react";

type UpdateLinkItem = {
  id: TypeTask["id"];
};

export const UpdateLinkItem = memo(function UpdateLinkItemInTaskMenuActions({
  id,
}: UpdateLinkItem) {
  return (
    <DropdownMenuItem asChild>
      <Link href={Routes.TASK_UPDATE(id)}>Обновить</Link>
    </DropdownMenuItem>
  );
});
