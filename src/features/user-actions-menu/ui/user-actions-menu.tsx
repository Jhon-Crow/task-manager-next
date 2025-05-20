"use client";
import {
  Button,
  Dialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { UserActionsOptions } from "./user-actions-options";
import { Ellipsis } from "lucide-react";
import { deleteUserById } from "@/entities/user";
import { UserDeleteDialogContent } from "./user-delete-dialog-content";

interface UserActionsMenuProps {
  userId: string;
}

export function UserActionsMenu({ userId }: UserActionsMenuProps) {
  const deleteHandler = () => deleteUserById(userId);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-24 space-y-2">
          <UserActionsOptions userId={userId} />
        </DropdownMenuContent>
      </DropdownMenu>
      <UserDeleteDialogContent deleteHandler={deleteHandler} />
    </Dialog>
  );
}
