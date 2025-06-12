import {buttonVariants, DialogTrigger, DropdownMenuItem} from "@/shared/ui";
import {memo, ReactNode} from "react";

export const DeleteTaskItem = memo(function DeleteTaskActionsMenuItem(
    {children}: {children?: ReactNode}
) {
  return (
    <DropdownMenuItem asChild>
      <DialogTrigger
        className={buttonVariants({
          variant: "destructive",
          className: "w-full",
        })}
      >
          {children}
      </DialogTrigger>
    </DropdownMenuItem>
  );
});
