import { TypeTaskWorker } from "@/entities/task/model/types/task";
import { UserAvatar } from "@/entities/user";
import { Routes } from "@/shared/consts/paths";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

export const TaskCardWorker = ({
  worker,
  position,
}: {
  worker: TypeTaskWorker;
  position: "last" | "center" | "first";
}) => (
  <Link
    href={Routes.USER(worker.id)}
    className={cn(
      "group flex items-center gap-x-2 hover:z-10 -mr-4 transition-all",
      {
        "hover:mr-0.5": position === "last",
        "hover:px-2 hover:mr-2": position === "center",
        "hover:pl-2.5 hover:pr-0.5": position === "first",
      }
    )}
  >
    <UserAvatar
      user={worker}
      className="size-10 border-accent-foreground border-2 group-hover:scale-110 transition-transform"
    />
    <span className="flex-1 text-nowrap hidden group-hover:block transition-all">
      {worker.firstname} {worker.lastname}
    </span>
  </Link>
);
