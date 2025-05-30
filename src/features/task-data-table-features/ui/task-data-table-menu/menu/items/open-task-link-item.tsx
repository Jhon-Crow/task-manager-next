import { TypeTask } from "@/entities/task/public-types";
import { Routes } from "@/shared/routes/paths";
import { DropdownMenuItem } from "@/shared/ui";
import Link from "next/link";
import { memo } from "react";

type Props = {
  id: TypeTask["id"];
};

export const OpenTaskLinkItem = memo(
  function OpenTaskLinkItemInTaskMenuActions({ id }: Props) {
    return (
      <DropdownMenuItem asChild>
        <Link href={Routes.TASK(id)}>Открыть</Link>
      </DropdownMenuItem>
    );
  }
);
