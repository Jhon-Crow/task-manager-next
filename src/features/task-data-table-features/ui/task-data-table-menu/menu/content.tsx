import { TypeTask } from "@/entities/task/public-types";
import { DropdownMenuContent } from "@/shared/ui";
import { memo } from "react";
import { CanUpdateTaskItems } from "./items/can-update-task-items";
import { OpenTaskLinkItem } from "./items/open-task-link-item";

type TaskDataTableMenuContent = {
  isCanUpdate: boolean;
  id: TypeTask["id"];
};

export const Content = memo(function TaskDataTableMenuContent({
  isCanUpdate,
  id,
}: TaskDataTableMenuContent) {
  return (
    <DropdownMenuContent align="end">
      <OpenTaskLinkItem id={id} />
      {isCanUpdate && <CanUpdateTaskItems id={id} />}
    </DropdownMenuContent>
  );
});
