import { TypeTaskWorker } from "@/entities/task/public-types";
import { Routes } from "@/shared/routes/paths";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

export const TaskWorkersTooltip = ({
  workers,
}: {
  workers?: TypeTaskWorker[];
}) => {
  return (
    workers &&
    workers.length > 0 && (
      <Tooltip>
        <TooltipTrigger asChild>
          <Ellipsis className="size-8 border border-accent-foreground bg-muted rounded-full hover:p-0.5 hover:scale-115 duration-750 transition-[padding,transform]" />
        </TooltipTrigger>
        <TooltipContent>
          <ol>
            {workers.map((worker, index) => (
              <li key={index}>
                <Link className="hover:underline" href={Routes.USER(worker.id)}>
                  {index + 4}. {worker.firstname} {worker.lastname}
                </Link>
              </li>
            ))}
          </ol>
        </TooltipContent>
      </Tooltip>
    )
  );
};
