import { TypeTaskWorker } from "../../../model/types/task";
import { UserAvatar } from "../../../../user";
import { Routes } from "@/shared/routes/paths";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/ui";

export const TaskCardWorker = ({
  worker,
  position,
}: {
  worker: TypeTaskWorker;
  position: "last" | "center" | "first";
}) => (
    <Tooltip key={worker.id}>
        <TooltipTrigger asChild>
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
                    key={worker.id}
                    className="border-accent-foreground border-1 shadow-2xs"
                />
                <span className="flex-1 text-nowrap hidden group-hover:block transition-all">
                    {worker.firstname} {worker.lastname}
                </span>
            </Link>
        </TooltipTrigger>
        <TooltipContent>
            {worker.firstname} {worker.lastname}
        </TooltipContent>
    </Tooltip>
);







