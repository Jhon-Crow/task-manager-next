import { TypeTask } from "@/entities/task/public-types";
import { Routes } from "@/shared/consts/paths";
import { Button, ContextMenuItem } from "@/shared/ui";
import Link from "next/link";
import React, { memo } from "react";

type OpenTaskLinkProps = {
  id: TypeTask["id"];
};

export const OpenTaskLink = memo(function OpenTaskLink({
  id,
}: OpenTaskLinkProps) {
  return (
    <ContextMenuItem asChild className="cursor-pointer text-center">
      <Button variant={"link"} asChild>
        <Link className="w-full h-full" href={Routes.TASK(id)}>
          Открыть
        </Link>
      </Button>
    </ContextMenuItem>
  );
});
