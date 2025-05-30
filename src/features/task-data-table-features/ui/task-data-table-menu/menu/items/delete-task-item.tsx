import { buttonVariants, DialogTrigger, DropdownMenuItem } from "@/shared/ui";
import { memo } from "react";

export const DeleteTaskItem = memo(function DeleteTaskActionsMenuItem() {
  return (
    <DropdownMenuItem asChild>
      <DialogTrigger
        className={buttonVariants({
          variant: "destructive",
          className: "w-full",
        })}
      >
        Удалить
      </DialogTrigger>
    </DropdownMenuItem>
  );
});
