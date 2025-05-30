import { useSelectTaskPendingInTaskListById } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import { Button, DropdownMenuTrigger } from "@/shared/ui";
import { MoreHorizontal } from "lucide-react";
import { memo } from "react";

export const Trigger = memo(function TaskDataTableMenuTrigger({
  id,
}: {
  id: TypeTask["id"];
}) {
  const pending = useSelectTaskPendingInTaskListById(id);
  return (
    <DropdownMenuTrigger asChild>
      <Button variant={"ghost"} className="size-8 p-0" disabled={pending}>
        <MoreHorizontal />
      </Button>
    </DropdownMenuTrigger>
  );
});
