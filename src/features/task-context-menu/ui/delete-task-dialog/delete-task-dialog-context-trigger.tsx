import { buttonVariants, ContextMenuItem, DialogTrigger } from "@/shared/ui";
import { memo } from "react";

export const DeleteTaskContextDialogTrigger = memo(
  function DeleteTaskDialogTrigger() {
    return (
      <DialogTrigger asChild>
        <ContextMenuItem
          className={buttonVariants({
            variant: "destructive",
            className: "w-full",
          })}
        >
          Удалить
        </ContextMenuItem>
      </DialogTrigger>
    );
  }
);
