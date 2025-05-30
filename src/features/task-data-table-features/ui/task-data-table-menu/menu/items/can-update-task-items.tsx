import { TypeTask } from "@/entities/task/public-types";
import { DropdownMenuSeparator } from "@/shared/ui";
import { DeleteTaskItem } from "./delete-task-item";
import { UpdateLinkItem } from "./update-link-item";
import { memo } from "react";

type CanUpdateTaskItemsProps = {
  id: TypeTask["id"];
};

export const CanUpdateTaskItems = memo(function CanUpdateTaskMenuItems({
  id,
}: CanUpdateTaskItemsProps) {
  return (
    <>
      <UpdateLinkItem id={id} />
      <DropdownMenuSeparator />
      <DeleteTaskItem />
    </>
  );
});
