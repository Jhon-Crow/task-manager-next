"use client";

import { DropdownMenuItem } from "@/shared/ui";
import { UserDeleteDialogTrigger } from "./user-delete-dialog-trigger";
import Link from "next/link";
import { Routes } from "@/shared/routes/paths";

export function UserActionsOptions({ userId }: { userId: string }) {
  return (
    <>
      <DropdownMenuItem>
        <Link href={Routes.USER_UPDATE(userId)}>Редактировать</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <UserDeleteDialogTrigger />
      </DropdownMenuItem>
    </>
  );
}
